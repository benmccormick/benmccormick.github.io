---
title: "Avoiding Derived State In React"
date: "2019/06/24"
layout: "post"
path: "/2019/06/24/derived-state"
description: "What derived state is, what problems it can cause, and how to avoid it"
keywords: ""
category: "architecture"
topics: ['React']
key: "derived-state"
readNext: "consistency,reusable-react,book-review-five-dysfunctions"
---

A lot of advice in the React community is focused around avoiding explicitly storing "derived state" of some type or another.  Some examples of this type of "derived state" that the community warns against:

#### Storing data that is directly derived from another piece of data in redux

```javascript
const reducer = createReducer(initialState, {
  ADD_USER: (state, action) => {
    state.users = [...state.users, action.user];
    // numUsers is derived state: it will always be tied to users
    state.numUsers = state.users.length;
  }
})
```

#### Storing state that is directly derived from a prop in a component

```javascript

const Widget = props => {
    // the hasError state is derived from the error prop
    let [hasError] = useState(!!props.error);
    //... continued ...
}
```

#### Storing state that is directly derived from another piece of state

```javascript
class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            fullName: '',
        }
    }
    // because fullName is directly associated with firstName and lastName, we have to update it
    // any time they are updated
    updateFirstName(newFirstName) {
        this.setState(state => ({
            ...state,
            firstName: newFirstName,
            fullName: newFirstName + ' ' + state.lastName,
        }))
    }
    updateLastName(newLastName) {
        this.setState(state => ({
            ...state,
            lastName: newLastName,
            fullName: state.firstName + ' ' + newLastName,
        }))
    }
    // ... continued ....
}
```

These examples are all based on real-world code I've seen.  And they all were in code that *worked*, the program executed as expected.  But they're still problematic.  This type of derived state is error-prone; when new code is written to update the state, each new programmer touching the code has to understand the relationship, or the whole thing can get out of sync.  When state is coming from props, like the error example above, you have to make sure that the state gets updated properly when the props change. And when the state gets out of sync, it is possible to end up in strange states where a programmer's expectations are violated.  A program shows a blank state saying no users have been added, even though one has already been created. A form is expecting to have an error, but the error text is empty or set to a default value.  Or a site has 2 different names for an individual that show up differently in separate parts of the interface.

This type of problem isn't a new thing in Computer Science.  When programmers do it by accident they usually call it a [DRY violation](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).  When they do it intentionally they call it caching.  And when they do it intentionally but screw things up, they [make jokes about off by one errors](https://twitter.com/secretGeek/status/7269997868).  Fortunately, that means that the tradeoffs are pretty well understood here.  So how do we handle situations where it looks like derived state may be necessary?

#### Just Derive State At Render Time

For many many things, including the 3 examples above, if you need information at render time that can be derived from other pieces of state, it's totally fine to just calculate it at render time.  For the first name example above, you can just include a `let fullName = this.state.firstName + ' ' + this.state.lastName;` line at the top of your render function and move on[^1]. Storing derived information is unnecessary and harmful when calculating it at runtime adds minimal performance overhead or repetition.


#### Memoization

But Ben, my component is slow now!

...are you sure it's actually slow?  Have you tested it?  Have you proven that the derived state calculation is actually a meaningful part of this?

Deriving state can be slow when you have to do complicated calculations or reformatting of data.  This is still not usually a problem, but if you're in a performance sensitive area of code and have proven it to be a problem, you can start considering caching solutions. You still don't want to store your cached values in state or your redux stores though.  Instead, you want to use a computed value that is recalculated when its inputs change.  The exact code will depend on your state management strategy, but some examples out there include

- [Reselect for Redux](https://github.com/reduxjs/reselect)
- [Computeds in MobX](https://mobx.js.org/refguide/computed-decorator.html)
- [useMemo in React Components](https://reactjs.org/docs/hooks-reference.html#usememo)

All of these methods use *memoization*, a type of caching where arguments are passed to a function, and if the function has been called with those arguments before, it returns the previous result rather than recomputing.  If for instance we had a component and wanted to get the names of all `users` with the current `type` based on props, and we knew that `users` was sometimes quite large, making the calculations slow, and we expected the component to re-render often for some reason or another we might write code like this:

```javascript
const UsersList = ({users, type,}) => {

    let userNames = useMemo(() => users.map(user => user.type === type), [users, type]);
    // ... continued ...
}
```

Now userNames will automatically be recalculated only when users or type changes[^2].  The MobX and Redux solutions work similarly.  Memoization isn't a performance silver bullet: at some point, you might have to look at how you can make your calculations less expensive or take them off of the rendering path completely.  But for most simple data transformation tasks, deriving state at render time and using memoization to keep it performant where needed should help you tame any derived state problems you encounter.


[^1]: But you should probably read about all the ways that [names can be more complicated than you think](https://www.kalzumeus.com/2010/06/17/falsehoods-programmers-believe-about-names/)
[^2]: Note that useMemo (and most memoization solutions generally) doesn't guarantee the function will never run more than once.  Most solutions have a limited number of results they will store, so if the inputs change often, the result might get recalculated.
