---
title: "Revertible Observables in Knockout"
date: "2013-05-07T20:05:00+00:00"
layout: "post"
path: "/2013/05/07/revertible-observables-in-knockout"
description: "Building an observable with simple undo functionality"
category: "frameworks"
key: "revertible-observables"
topics: ['Knockout']
pageViews: "3131"
last30pageViews: "44"
---

Last week I was looking for a way to use KnockoutJS on a configuration menu that required the user to be able to cancel or accept their input after filling out the menu.

Initially I was just copying the initial data and refilling my data model manually on cancel.  I wasn't satisfied with that solution though.  It didn't seem like it would scale well if the menu got more complicated, and it lacked the elegance and frictionless nature of most knockout data management.

After some searching I found [Ryan Niemeyer's Protected Observable example][guardyourmodel], and it initially seemed like exactly what I wanted, a way to only persist changes to the view model if they were explicitly confirmed.

```javascript
//knockout-protected.js
//https://gist.github.com/ben336/5537138#file-knockout-protected-js

//wrapper to an observable that requires accept/cancel
ko.protectedObservable = function(initialValue) {
    //private variables
    var _actualValue = ko.observable(initialValue),
        _tempValue = initialValue;

    //computed observable that we will return
    var result = ko.computed({
        //always return the actual value
        read: function() {
           return _actualValue();
        },
        //stored in a temporary spot until commit
        write: function(newValue) {
             _tempValue = newValue;
        }
    });

    //if different, commit temp value
    result.commit = function() {
        if (_tempValue !== _actualValue()) {
             _actualValue(_tempValue);
        }
    };

    //force subscribers to take original
    result.reset = function() {
        _actualValue.valueHasMutated();
        _tempValue = _actualValue();   //reset temp value
    };

    return result;
};

```

There was a problem with this approach though.  Ryan's model saves the update to a temporary value and then moves it into an observable if the result is committed.  That works great for simple models and mostly behaves well if the user cancels out of the edit screen without committing or resetting. But it breaks down if you have another computed observable that depends on the value of the protected observable.  In my case I had an output that I wanted to show dynamically changing based on the input allowing experimentation.  Here's a simplified example using a protected observable:

<iframe width="100%" height="300" src="http://jsfiddle.net/tc299/4/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

As you can see, the tables field doesn't update until you confirm the entry. Ideally though we'd like it to update as the user changes their guest number, so they can see the effect on cost and space used before they confirm a change in guests.  We want to do this while still preserving the users abilities to cancel changes if they don't like the results though.  So how to we do this?  We make a small change to the default value returned by the protected observable.  Here's what I'm calling a Revertible Observable:



```javascript
/*
knockout-revertible.js
https://gist.github.com/ben336/5537115#file-knockout-revertible-js
*/

 //wrapper to an observable that requires accept/cancel
ko.revertibleObservable = function(initialValue) {
    //private variables
    var _actualValue = initialValue,
        _tempValue = ko.observable(initialValue);

    //computed observable that we will return
    var result = ko.computed({
        //always return the current value
        read: function() {
           return _tempValue();
        },
        //stored in a temporary spot until commit
        write: function(newValue) {
             _tempValue(newValue);
        }
    });

    //if different, commit temp value
    result.commit = function() {
        if (_tempValue() !== _actualValue) {
            _tempValue.valueHasMutated();
             _actualValue = _tempValue();
        }
    };

    //force subscribers to take original
    result.reset = function() {
        _tempValue(_actualValue);   //reset temp value
    };

    return result;
};

```

This preserves the ability to see the results of your changes in realtime, while also allowing you to easily revert with a simple cancel button and no explicit data tracking.  Now our example can work as we'd like, with the customer getting immediate feedback on how their guest changes effect the total cost.

<iframe width="100%" height="300" src="http://jsfiddle.net/QQYrL/4/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Note that this isn't a silver bullet.  An explicit confirmation is no longer required for the changes to be passed through, so its important to make sure that the user either confirms or resets the values after entering them.  But it allows for instant feedback on changes while still supporting the ability to dump the changes if the user decides they don't like the result.  I think its a useful pattern for any situation where the user is entering data and you want to show them a preview of the outcome.  I hope others will find it as useful as I have.

### Update

I showed this to Ryan and he replied with a nice simplification of the concept.

<blockquote class="twitter-tweet"><p>@<a href="https://twitter.com/ben336">ben336</a> nice Ben. I have had to do something similar in the past. Here is a simplified version that I have used: <a href="http://t.co/IiqFe90kwi" title="http://jsfiddle.net/rniemeyer/SFCgr/">jsfiddle.net/rniemeyer/SFCg…</a></p>&mdash; Ryan Niemeyer (@RPNiemeyer) <a href="https://twitter.com/RPNiemeyer/status/331954950009663488">May 8, 2013</a></blockquote>

```javascript
//Ryan Niemeyer's simplified knockout-revertible.js
//http://jsfiddle.net/rniemeyer/SFCgr/ Fiddle
 ko.revertibleObservable = function(initialValue) {
    //private variables
    var result = ko.observable(initialValue);

    result.forEditing = ko.observable(initialValue);

    //if different, commit edit value
    result.commit = function() {
        var editValue = result.forEditing();

        if (editValue !== result()) {
            result(editValue);
        }
    };

    //force subscribers to take original
    result.reset = function() {
        result.forEditing(result());
    };

    return result;
};

```

[guardyourmodel]: http://www.knockmeout.net/2011/03/guard-your-model-accept-or-cancel-edits.html
