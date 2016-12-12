---
title: "It took a month to get sick of php"
date: "2012-10-06 11:00:00+00:00"
layout: "post"
path: "/2012/10/06/it-took-a-month-to-get-sick-of-php"
category: "meta"
pageViews: "152"
last30pageViews: "3"
---

I'm not going to claim that its impossible to write nice, well structured code with php. I'm not even going to claim that its impossible to write nice, well structured php code with Wordpress. What I did find during my month of running my blog on Wordpress, is that it is much easier to write bad code with Wordpress than it is to write good code. Which is why I ported my blog to a custom self-written blog based on Django.

I wouldn't recommend that most people (even technically inclined people) do this, because generally the primary purpose of a blog is to produce content. And Wordpress is fantastic for that. Many many people have spent a large amount of time making sure it is very easy to create pretty much any type of content you want to produce on Wordpress without writing a single line of code. However, for somebody like me who wants to tinker and customize (having a place to experiment is part of the fun of this site for me), being forced to deal with the php/Wordpress crapshoot every time I wanted to try writing something was tough to get around.

Django was an attractive option because it was really easy to get a basic prototype running, and it provides significant flexibility to expand. I got the full functionality of my original Wordpress site back up in 3 days after I first downloaded Django (not 3 full days, 3 busy calendar days). In the process I significantly cut down on my code bloat and increased load time. It was crazy easy to define a basic blog design and have it reflected in the code and database.

```python
# Basic Blog Format
from django.db import models
class Category(models.Model):
name = models.CharField(max_length=100)
def __unicode__(self):
return self.name
class Post(models.Model):
title = models.CharField(max_length=200)
content = models.TextField()
pub_date = models.DateTimeField('date published')
slug = models.SlugField(unique=True)
category = models.ForeignKey(Category)
tags = models.ManyToManyField('Tag', blank=True)
def __unicode__(self):
return self.title
class Tag(models.Model):
name = models.CharField(max_length=30)
posts = models.ManyToManyField(Post, through=Post.tags.through, blank=True)
def __unicode__(self):
return self.name
class RelatedLink(models.Model):
post = models.ForeignKey(Post)
name = models.CharField(max_length=100)
url = models.URLField(max_length=200)
internal = models.BooleanField()
def __unicode__(self):
return self.name
```

I love Python's clean syntax, and especially the cleanliness of Django's template systems. It is 100x more legible and "HTML" like than php code (or the jsp code I have to deal with at work). I've thoroughly enjoyed the experience and am looking forward to working more with Django in the future.
[I wrote 20 short programs in Python yesterday. It was wonderful. Perl, I'm leaving you.]

![I wrote 20 short programs in Python yesterday.  It was wonderful.  Perl, I'm leaving you.](http://imgs.xkcd.com/comics/python.png)
