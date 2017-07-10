---
title: "The Mystery of Docker and the Disk-Eating Cow"
date: "2017-03-28 14:40:00+00:00"
layout: "post"
path: "/2017/03/28/the-mystery-of-docker-and-the-disk-eating-cow/"
description: "Tracking down how Docker ate half my hard drive"
keywords: "Docker Daisy Disk MacOS"
category: "tools"
key: "docker-cow"
pageViews: "344"
last30pageViews: "344"
---

Yesterday morning I was innocently minding my own business, downloading some files, when I noticed that nearly all the disk space on my 256GB work laptop had been consumed.  This seemed rather unlikely to me, given that I'd only had the laptop for about a year and I didn't store anything other than code and work documents on it.  Text files just don't take up that much space most of the time.  So I decided to make a purchase I'd considered for a while, bought [Daisy Disk](https://daisydiskapp.com/), and began investigating.

The first thing I noticed was a huge amount of the disk space (about half) was taken up by the `~/Library/Containers` folder. That folder contained my email history and also data on my [Docker](https://www.docker.com/) containers. Docker functions as a lightweight VM, and essentially holds copies of virtualized operating systems and file systems inside each docker container and image, so it made sense to me that it could be taking up a lot of space, though >120GB still seemed wrong for my paltry 4 containers.  So my first step was to delete all of the containers and images on my laptop.  That cleared about 20GB of space but still left my drive looking like this:

<img alt="daisy disk showing 100+GB of docker" src="/posts/images/docker-cow/daisy.png"
class="full-width">

At this point, I was annoyed.  103.5 GB was taken up by some folder called Docker.qcow2 and Daisy Disk wouldn't show me what was inside.  So I drilled in on the file system and immediately found out that Docker.qcow2 was not a directory like I'd assumed due to size, but a single 100+GB file.  At that point I decided to poll my teammates to see if I was the only one dealing with this:

<img alt="daisy disk showing 100+GB of docker" src="/posts/images/docker-cow/slack.png"
class="full-width">

So between the 5 of us, we each had "cow files" taking up between 23 and 103GB of disk space. Some Googling revealed a [github thread](https://github.com/docker/for-mac/issues/371) that showed this is a so far unsolved issue with Docker For Mac.  Summary: qcow2 files are a format for saving disk images.  Docker For Mac's implementation works well for writing and updating images, but doesn't automatically free up disk space when a container or image is deleted. So as you use and delete containers over time this file gradually grows.  I have a habit of deleting and recreating containers when I'm trying to debug something, which explains why I had a much larger file than others.  There isn't currently a true fix for this issue, but you can delete the file.  You'll lose all your containers and images, but when you recreate them the file will be small again.  There also is supposed to be some automatic limiting of the file.  The current cap is 64GB, but there is work on making it configurable.  Unfortunately the current cap is not respected if you had previously used docker-machine to control docker on your machine, which is how my file exceeded the cap.  I'm also unclear on what happens when the file hits the cap.  I get the impression that things stop working and you need to delete everything anyway (you just avoid running out of disk space on the host machine).

Fortunately it was no problem for me to delete everything, and so I was able to clear things out, at which point my disk looked a lot happier:

<img alt="daisy disk showing 100+GB of docker" src="/posts/images/docker-cow/daisy2.png"
class="full-width">

### Lessons Learned

I had 3 takeaways from this interesting adventure.

1. If you're using Docker For Mac, keep an eye on your disk space.  If you're able to occasionally delete and recreate your containers without data loss, consider occasionally doing that and deleting the cow file.  If you can't do that, be careful how many containers you add and delete, and make sure you manage your disk space well.
2. [Daisy Disk](https://daisydiskapp.com/) is awesome and highly recommended.  It's an example of a rare breed: the beautiful system utility. The visualizations it shows are both pretty and useful; it made diagnosing this issue a breeze.  
3. One more thing I learned from my coworkers slack yesterday: `ls` takes an `-h` argument that shows file sizes in KBs/MBs/GBs instead of all in bytes.  This is super helpful when examining large files.  Compare the 2 lists of files from my Downloads folder in the image below. The normal form is very nice for comparing 2 files side by side and seeing which one is bigger, but the second form is much more helpful when you want to get an idea of exactly how big something is, or communicate it to others.  Most of us don't think about file sizes in terms of bytes anymore.


<img alt="daisy disk showing 100+GB of docker" src="/posts/images/docker-cow/downloads.png"
class="full-width">
