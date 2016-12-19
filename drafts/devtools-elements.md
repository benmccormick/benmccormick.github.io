---
title: "Chrome Devtools 101: The Elements Panel"
date: "2016-12-31 05:00:00+00:00"
layout: "post"
path: "/2016/12/31/devtools-101-elements"
category: "tools"
description: "An introduction to the Chrome Devtools Elements Panel"
---

One of the wonderful things about the web is the hackable nature of the platform, where it is easy to learn from others and modify what they did.  This started in early web sites with the ability to "view source" to see the HTML that was used in different sites.  Web sites and applications have evolved since then and are now built with HTML, CSS, JavaScript, Fonts, Images, JSON, TypeScript, Elm, JSX, and more, communicate with servers asynchronously, cache data on the client, and even interact with the native hardware.  For many complex modern sites "view source" will reveal almost nothing about how the site actually functions.  Fortunately the spirit of the early web lives on in browser DevTools, developer addons shipped with Chrome, Firefox, Edge and Safari to help developers debug their sites.  Modern Devtools are sophisticated power tools, with many different features, settings, and screens to explore.  But learning just a little about them can help most people learn a lot about the web and how it works, and can make debugging web sites much much easier for developers. This is the first post in a series of articles on the basics of Chrome DevTools[^1], focusing on the most useful functions for a wide variety of developers.  I'm kicking it off with a look at Chrome's elements panel.

### Accessing Devtools

There are a few ways to access the chrome dev tools.  You can right-click on any web page and choose the "inspect" item in the context menu [^2].  

<img src="/posts/images/devtools/context_menu.png" alt="selecting dev tools from a context menu" class="full-width">

You can go to the settings menu at the top right of the page and drill down through "More Tools" to Developer Tools.

<img src="/posts/images/devtools/settings_menu.png" alt="selecting dev tools from the settings menu" class="full-width">

Or you can use a keyboard shortcut.

|Platform | Shortcut to open Devtools to the Elements Panel|
----------|------------------------------------------------|
|**Windows**  | Ctrl + Shift + I                           |
|**MacOS**    | ⌘ + ⌥ + I (Command + Option + I)          |

If you're on a desktop/laptop machine feel free to use whatever method you prefer to open devtools on this site as you read this article in order to follow along.

### Elements Panel

Once you've opened the devtools to the elements panel, you should see something like this:

<img src="/posts/images/devtools/elements_panel.png" alt="A view of the elements panel" class="full-width">

At the top of the devtools window, you should see a list of tabs.  If it is not already selected, you'll want to select *Elements* from that list.  Once *Elements* is selected, you should see 2 main content areas below.  A big section with a lot of HTML on the left called the DOM Tree pane, and a section with tabbed sidebars on the right with the styles pane open by default.

You may also see a section labeled *Console* at the bottom.  If so, you can use the escape key to dismiss that for now.  I'll cover it in a future post.


### DOM Tree

Let's start by taking a look at the DOM Tree Pane [^3].  It's possible to learn a lot, and have a lot of fun with just this one screen.  I would describe the DOM Tree pane as the closest successor to the "view source" command.  The biggest difference is that it shows the rendered HTML of the page as it currently exists after being modified by JavaScript, rather than just the HTML that was loaded on initial page load.  The other major difference is that the DOM Tree Pane is mutable.  We can edit it and change the results.  You can use this to change, play with, or remove the HTML you see on any site, not just sites you control.  Only for your current tab though of course.

<img src="/posts/images/devtools/nytimes_fun.png" alt="Editing the NYTimes home page" class="full-width">


To begin hacking with the DOM Tree, you by right clicking an element on the screen you're inspecting, and choosing inspect (as you may have done to open this panel originally).  The DOM Tree will focus on that panel.  Now you can run your mouse over the various HTML elements in the DOM Tree and see the corresponding portions of the page highlighted above. To make your first change, you can double click on the item you want to change, and then modify the text, as shown above in the New York Times screenshot.  You can also try drag and dropping elements to different points in the DOM to move things around.


### Modifying Content

Double clicking and drag and drop are the quickest way to change a snippet of text or a class on an element.  But sometimes you want to make more involved changes.  To go deeper, you can right click on an element that you want to modify.  That will bring up a big context menu of options.  I want to focus on a few options.

<img src="/posts/images/devtools/dom_context_menu.png" alt="Dom Tree context menu" class="full-width">

#### Add Attribute

Double clicking lets you edit existing attributes on DOM elements, but you can also add new attributes with the *add attribute* option.  This is useful for adding a class to an element that didn't have one previously, or some special element specific attribute like a placeholder for an input.

#### Hide element

This option hides the element you've selected without removing it completely from the DOM by adding a special class `__web-inspector-hide-shortcut__` that the browser styles by default as `visibility: hidden`.  This is great for temporarily hiding an element that you intend to bring back


#### Delete element

Like *Hide element* this option hides the element.  But in this case, the element is completely removed from the DOM, and isn't recoverable without refreshing the page or adding it back in manually.

#### Edit as HTML

*Edit as HTML* gives you more flexible control over the DOM.  If you select this on an element, you'll open a more freeform text field where you can modify the DOM as text.  This means its easy to add and remove child elements, change multiple attributes, or rearrange whole sections of the page.  It's the most powerful of any of these options, but also slower and easier to screw up than the convenience options above.


### Modifying Styles








### Subscribe

Thanks for taking the time to read this post!  Web development is one of the main topics of this blog, so if you enjoyed the post, please consider subscribing by using the [feed](http://feedpress.me/benmccormick), [Twitter](http://twitter.com/benmccormickorg) or my [mailing list](http://eepurl.com/WFYon). You also might want to check out my recent post on [readable code](http://benmccormick.org/2016/12/11/readable-code-audience/).


[^1]: A part of me really hates focusing on Chrome DevTools, since they're hardly under-hyped, and Firefox DevTools are also fantastic and beautifully designed.  But Chrome DevTools are the most feature complete, they're what I primarily use, and over 80% of desktop traffic to this blog in the last month has been from Chrome.  So I'll be focusing on them for this series.

[^2]: In other browsers this is usually "inspect element"

[^3]: DOM stands for Document Object Model, it is the term for the structured representation of HTML on a website. You can see more [on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction).
