---
title: "Readable code: Know your audience "
date: "2016-12-12T04:00:00+00:00"
layout: "post"
path: "/2016/12/11/readable-code-audience"
description: "A quick observation about what it means to write readable code"
keywords: "readable code python"
category: "software-productivity"
key: "readable-code"
topics: ['architecture']
pageViews: "254"
last30pageViews: "19"
---

A coworker asked me last week if there was a better way to write the following python code:

```python
self.custom_attributes = {
  x.split(':')[0]: x.split(':')[1]
  for x in a.split(',')
}
```

I semi-jokingly replied that there were 3 better ways:

##### For people who like comprehensions

```python
self.custom_attributes = {
  key: value
  for [key, value] in [entry.split(':') for entry in a.split(',')]
}
```

##### For people who like functions

```python
def build_obj(acc, val):
   [key, value] = val.split(':')
   acc[key] = value
   return acc
self.custom_attributes = reduce(build_obj, a.split(','), {})
```

#### For people who like other folks to be able to read their code

``` python
# create a hash of custom attributes
self.custom_attributes = {}
# get the entries from splitting the input string
entries = a.split(',')
# for each entry split the key value pairs and add them to the hash
for entry in entries:
   [key, value] = entry.split(':')
   self.custom_attributes[key] = value
```


The joke of course is that it doesn't really matter what the author of the code considers the best way to write it.  Like writing an essay or persuasive speech, it is much more important to consider the audience, and what style will work best for them.  Most code will eventually be read by other people, even if that is simply a future version of the original author who has been stripped of context by time [^1].

If my coworker is confident that his code will be read in the future by confident Python programmers who understand object comprehensions, then he could go with the first example, with its heavy use of python idioms.  If he thought it was more likely that somebody like me who is used to JavaScript idioms, he might consider the less idiomatic python from the second example that matched his teammates.  If he didn't know who would read the code in the future, he might go with the more explicit and difficult to misinterpret version 3, and possibly tuck it away within a named function so that the main code flow could remain uninterrupted.

```python
self.custom_attributes = parse_entry_string(a)

# ... elsewhere ...

def parse_entry_string (entry_string):
    attributes = {}
    # get the entries from splitting the input string
    entries = a.split(',')
    # for each entry split the key value pairs and add them to the hash
    for entry in entries:
       [key, value] = entry.split(':')[0:2]
       attributes[key] = value
    return attributes
```

Of course once the functionality is separated out into a function, it matters a lot less how it is implemented since the only time somebody will need to read it is when they are interested in that specific functionality and can invest the time to understand the code.  The well named function replaces the need for understanding everything when people browse through the code.  This is extremely important in larger code bases, since data often flows through many lines of code.  The more of it that can be usefully (and accurately) abstracted away for a reader, the easier the code base is to debug.

So quick tip version:

1. Think about the audience of the code you're writing
2. Naming functions well limits the needs to make implementation details readable for everybody. It can also make your program flow easier to follow.


[^1]: In my experience, it usually only takes about a week for me to look back at my old code and wonder what maniac wrote it and what he could have possibly been thinking
