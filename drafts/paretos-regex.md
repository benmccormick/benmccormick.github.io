---
title: "Pareto's Regex"
date: "2017-02-05T13:00:00+00:00"
layout: "post"
path: "/2017/02/05/paretos-regex/"
description: "The most valuable information for occasional regular expression users"
keywords: "Regular Expressions Pareto"
category: "software-productivity"
---

Anybody want to guess what this is?

```
(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|
"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09
\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+
[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?
[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*
[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|
\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
```

It turns out, that mess of characters is the [closest we can get](http://emailregex.com/) to an official regular expression for determining whether a string is a valid email address.  Regular expressions (regexes) are a computer science tool to define a search pattern.  They are used to match patterns in text, extract information from text, and define acceptable formats for text.  There are regex implementations in pretty much all modern programming languages.  There are slight differences between language implementations, but most languages implement a subset of the [POSIX](http://www.boost.org/doc/libs/1_56_0/libs/regex/doc/html/boost_regex/syntax/basic_syntax.html) or [Perl](http://perldoc.perl.org/perlre.html) standards.  

Regexes can be fairly basic and human friendly.  For instance, the following JavaScript regex attempts to match any string that has the substring `blue` in it:

```javascript
/blue/
```

But they can become more complex quickly.  Here is a regex for matching a string that starts with `blue` and ends with `red`.

```javascript
/^blue.*red$/
```

And here is the same regex, with a check to make sure blue and red are distinct words, and we're just not ending the string with a word that ends with red like `scared`.

```javascript
/^blue\b.*\bred$/
```

We're not doing anything particularly complicated here, and already our regex has become a bit hard to read.  When things actually do get complicated, things can get out of hand quickly, as you can see from the example at the top.  In particular, things get worse because there is a large amount of non-obvious syntax associated with regex.  Most concepts, like whitespace characters, numbers, alpha-numeric characters and such, are represented by escape sequences (a `\` followed by another character) that are sufficiently arbitrary to require memorization or lookup.  Regex syntax is quite dense, and in many languages it is difficult to annotate with comments or indentation.  Thus it can be very difficult to follow for those who do not use it routinely.

For some folks, regexes are a key part of their job.  If you're regularly processing text, managing log files, transforming raw data, or something similar, it is likely worth your time to memorize a significant subset of your languages regex spec.  But for the rest of us, who occasionally encounter situations where regexes are useful but stay away from them most days, that is likely not worth the effort.  Instead we're better off getting a high level understanding of regular expressions and what they can do, then looking up the information we need when you need it.  This post is targeted to those developers, and will attempt to lay out the [Pareto's Principle](https://en.wikipedia.org/wiki/Pareto_principle) portion of regex knowledge.  I'll be covering 3 areas: use cases, concepts, and process.

### Use Cases

If you don't use regular expressions very often, one of the more difficult skills to acquire is properly recognizing when they can be useful.  For most of us, tools that go un-used soon go forgotten, and when you're regularly using your hammer, everything starts looking like a nail. So here is a non-exhaustive list of cases where a regular expression can be useful:

##### Useful: Validating an input

Regexes are often useful for validating an input.  Leaving aside the complexity of the email regex at the start, there are usually standardized regexes you can find for validating things like dates, credit card numbers and phone numbers, and it is often the easiest way to check against simple business rules like password complexity requirements.  

##### Useful: Pulling portions of text out of a structured piece of data

The classic example for this category is pulling specific data like a timestamp and error message out of log files that contain a large amount of noisy, unnecessary information.  Other examples would include pulling an area code out of a phone number while accepting multiple formats, or extracting a hostname from a url.

##### Not Useful: Pulling meaningful data out of complex data formats

When faced with large files of data with complex structures like XML files or software source code files, regular expressions are usually not the best tool.  Instead you want to find a tool capable of parsing the format and extracting meaningful information from it.  The canonical warning about this case is [this StackOverflow post](http://stackoverflow.com/a/1732454/1424361).  Note that it is totally reasonable to parse a limited subset of something like HTML to extract specific information when you know that the data will be in a limited consistent format.  But regular expressions are usually not a good fit for arbitrary complicated input.

##### Useful: Replacing non-uniform portions of text with a different piece of text

To expand on the above example, if we were to want to extract the hostname from a url and replace it with a different hostname, regardless of the original url[^1], regular expressions would again be a good tool.  That example could be accomplished in JavaScript like this[^2]:

```javascript
const fixLink = link => link.replace(/(https?:\/\/)(.*\/)(.*)/, '$1test.com/$3');
```

##### Not Useful: Simple search or replaces

If you're just looking to replace one constant string with another constant string, a non-regex solution will usually be more readable.

```javascript
const fixLink = link => link.replace('test.com', 'test2.com');
```

### Concepts

There is a lot of syntax associated with regexes, and most of it is not worth committing to memory if you don't use it regularly. Instead it's important to know the core concepts so you can look them up when necessary.

##### Character Matchers

There are a variety of ways to represent characters to match in regular expressions.  The simplest two are writing out the string you want to match (`/blue/` matches strings that contain `blue` somewhere inside of them) and using `.` which matches any character.  But when you want to match more dynamic values, more complicated character matchers are used.  These fall primarily into 2 types.  Character classes, which are represented with an escaped character like `\s`, and character sets, which are a list or range of characters that can fill a spot and are represented by square brackets like `[abc]` or `[1-9]`. We can use those to match more flexibly.  For instance `/[abc]\s[1-9]/` matches any string that has a letter a, b, or c, followed by a single whitespace character and then a number.  There are a decent number of character classes, so it is helpful to have a good reference sheet when you need to write a new regex or understand an existing one.  I use [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#character-classes) for JavaScript.

##### Quantifiers

Being able to match a specific set of characters is nice, but is a bit limited if we can only match one character at a time.  And it makes it difficult to do things like match a word or number, since you don't know how long it will be.  Quantifiers let us say how many occurrences of a character matcher we expect.  The 3 most common quantifiers are `*` `?` and `+`.  `/[0-9]*/` matches strings of 0 or more digits.  `/[0-9]+/` matches strings of 1 or more digits.  `[0-9]?` matches strings of 0 to 1 digits.  Each of these quantifiers are greedy; they will try to match the largest section of input possible.  Other quantifiers can match a specific number of characters or match more conservatively (lazily).

##### Boundaries

##### Groups

##### Flags

###### Methods

Most languages have methods to search a large string for a regular expression match and extract the matching section, test whether a string matches a particular regex, and to replace content that matches a regex with different content.  


### More Resources

-
-



### Subscribe

Thanks for taking the time to read this post!  Software development is the main topic of this blog, so if you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). You also might want to check out my [post on Orthogonality and CSS in JS](http://benmccormick.org/2017/01/03/orthogonality-and-css-in-js/).



[^1]: This might make sense if for instance, we wanted to support multiple host names for a site, but make sure that links always point to the canonical hostname.
[^2]: Ok yeah, I'm assuming there is a trailing slash.  If somebody sends me a reasonably readable example that works better, I'll update it and credit you.
