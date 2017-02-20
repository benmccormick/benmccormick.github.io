---
title: "Explaining Javascript: Object Oriented Programming"
date: "2013-01-12 03:05:00+00:00"
layout: "post"
path: "/2013/01/12/explaining-javascript-object-oriented-programming"
category: "javascript"
description: 'A look at Object Oriented programming principles in JavaScript'
---

I'm continuing this series on Javascript concepts for people new to the language by looking at  object oriented programming.  One of the more confusing concepts for new Javascript programmers, especially those used to the classical inheritance structures of Java or C++ is Javascript's prototypical inheritance model.  Because it is possible to write syntax for Javascript object creation that can look very similar to classical inheritance in Java, its easy to be misled and have false expectations.  Its important to understand how Javascript's object model works, so that you can adjust your expectations and write code that takes advantage of the language's expressive power.


#### Creating a new object

Javascript provides multiple ways to create new objects.  The simplest way is to just create an empty object with ```{}```.  The one I'll be looking at today was modeled after Java syntax and gives the language a deceptively classical vibe:

```javascript
//Creating Objects with new

    function Animal(){
        this.home = "earth";
        this.noise = "roar";
    }

    Animal.prototype.sound = function(){
        alert(this.noise);
    }

    var animalObject = new Animal();
    animalObject.sound(); // roar
    var home = animalObject.home //earth
```

This all looks very familiar and comfortable to a Java programmer.  Animal() is the constructor of a class Animal, with a function sound() and animalObject is an instance of that class.  And you can write code like that if you want.  The problem is, that model is not enforced at all by javascript.  Javascript doesn't have any special "constructor functions" or classes<sup id="fnref:1"><a href="#fn:1" rel="footnote">1</a></sup>.  Any function can be used as a constructor

```javascript
//Normal Function as constructor

    function normalFunc(){
        alert("This is a normal function")
    }
    var normal = new normalFunc();
    normal instanceof normalFunc  //true
    var x = {};
    x.y = normalFunc;

    var huh = new x.y();
    huh instance of normalFunc //true
```

So whats actually happening when you call new before a function?  The new operator generates a new object, binds ```this``` to that object for the constructor function, calls that function and sets that function as the prototype of the new object.  But what is a prototype?

#### Prototypes

Javascript inheritance is at its heart "prototypical inheritance".  This means that rather than having a concept of "classes" and "implementations" of those classes, javascript objects inherit their properties directly from other objects.  So for the "classical" example above, what is actually happening is that a new object is being created, it is having some of its properties set by the constructor function, and then has the constructor's prototype set as its prototype.  This means that it has access to any properties on the "prototype chain" of the constructor, which in this case includes the sound method.  All objects have acccess to Object.prototype, giving it access to object properties and methods like toString, hasOwnProperty and others.

#### The ES5 Way

The ECMAScript 5 specification defines a new way to create objects from existing objects with the **[Object.create()][createmdn]** syntax.  Object.create takes an existing object and sets it as the prototype object for a newly created object<sup id="fnref:2"><a href="#fn:2" rel="footnote">2</a></sup>.  This was added to make the syntax for setting the prototype of a new object easier and more clear.<sup id="fnref:3"><a href="#fn:3" rel="footnote">3</a></sup>  It also allows us to simulate classical inheritance:

```javascript
//ES5 Classical Inheritance example

    var Cat = function(){
        Animal.call(this); //Call the Animal constructor to set local variables
        this.noise = "meow" //override the Animal sound
    }
    Cat.prototype = Object.create(Animal.prototype)

   var kitty = new Cat();

   kitty.sound() //meow
   alert(kitty.hasOwnProperty("sound")) //false
   alert(kitty instanceof Cat) //true
   alert(kitty instanceof Animal) //true
```

So as you can see, it is very possible to write Object-Oriented Javascript.  The key is to understand that what's happening behind the scenes in Javascript is different than Java or C++, even though the syntax may look similar.

#### Summary

- Inheritance and object oriented programming in javascript are possible, but are more of a programmer defined construct rather than an inherent property of the language

- Javascript supports prototypical inheritance, meaning that it inherits functions and properties from its prototype object.  All objects inherit from Object.prototype.

- ECMAScript 5 introduced support for Object.create, which provides an easier syntax for creating new objects and simulating inheritance.

---

### Further Reading

- [Mozilla's Developer Documentation][mdnoo] has a good summary of implementing Object Oriented Programming concepts in Javascript

- [Managing Javascript Objects][zakasmanaging] is a great article by Nicholas Zakas for MSDN about designing an object oriented application in Javascript.  Zakas also has recently written a [book][zakasbook] on object oriented programming in Javascript

---

### Explaining Javascript

This is the second article in my Explaining Javascript series for introducing Javascript concepts to new JS developers.

1. [Closures][ejsclosures]

2. [Object Oriented Programming][ejsoop]

---


<div class="footnotes"><ol>

<li class="footnote" id="fn:1">
<p>
In the next version of Javascript ES6 there will be a more formal concept of classes.  You can read more <a href="http://wiki.ecmascript.org/doku.php?id=strawman:maximally_minimal_classes">here</a> if interested
<a href="#fnref:1" title="return to article"> ↩</a>
</p>
</li>

<li class="footnote" id="fn:2">
<p>
With an optional second argument to set the local properties of the object from another object.  Note that these properties will need to be Objects, not primitive values, or a TypeError will be thrown        
<a href="#fnref:2" title="return to article"> ↩</a>
</p>
</li>

<li class="footnote" id="fn:2">

Thanks to <a href="https://plus.google.com/u/0/110077141419510454119/posts">Eric Elliot</a> for pointing out that my original description of Object.Create was misleading.  There are multiple ways to create and reuse object code in Javascript.  I only touch on one of them in this article.        
<a href="#fnref:2" title="return to article"> ↩</a>

</li>



</ol></div>







[createmdn]: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/create
[mdnoo]: https://developer.mozilla.org/en-US/docs/JavaScript/Introduction_to_Object-Oriented_JavaScript
[zakasmanaging]: http://msdn.microsoft.com/en-us/magazine/gg314983.aspx
[zakasbook]: https://leanpub.com/oopinjavascript
[ejsclosures]: http://www.benmccormick.org/blog/2013/01/08/javascript-explained-closures/
[ejsoop]: http://www.benmccormick.org/blog/2013/01/12/javascript-explained-object-oriented-javascript/
