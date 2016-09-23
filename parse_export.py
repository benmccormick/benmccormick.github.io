#!/usr/bin/python
import json
import sys
from dateutil.parser import parse
from string import Template

post_template = Template('''---
title: "$title"
date: "$date"
layout: post
path: "$url"
---

$content
''')


file_name= sys.argv[1]

class Post():
    def __init__(self, title, slug, content, status, publish_date, tags=[]):
        self.title = title
        self.slug = slug
        self.content = content
        self.status = status
        self.publish_date = parse(publish_date, fuzzy=True)
        self.tags = tags

    def __repr__(self):
        return '<POST (%s)> ' % self.file_path()

    def url(self):
        date = self.publish_date.strftime("%Y/%m/%d")
        return '/%s/%s' % (date, self.slug)

    def file_path(self):
        return './pages/legacy-posts/%s.md' % self.slug

    def post_text(self):
        return post_template.substitute(
            title = self.title,
            date = self.publish_date,
            url = self.url(),
            content = self.content
        )



with open(file_name) as data_file:
    data = json.load(data_file)
    post_dicts = data['db'][0]['data']['posts']
    posts = [Post(p['title'], p['slug'], p['markdown'], p['status'], p['published_at'], []) for p in post_dicts]
    for post in posts:
        with open(post.file_path(), 'w') as target_file:
            target_file.write(post.post_text().encode('utf-8'))



#print(posts[0].post_text())
