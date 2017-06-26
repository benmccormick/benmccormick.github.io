---
title: "Sublime Text For Javascript: Configuration"
date: "2013-01-01 18:00:00+00:00"
layout: "post"
path: "/2013/01/01/sublime-text-for-javascript-configuration"
category: "tools"
description: "Helpful configuration options for JS developers"
pageViews: "9290"
last30pageViews: "49"
---

I'm starting a new series of posts on Sublime Text, and how to get the most out of the editor.
The series will be focused on Javascript development, as that is how I use Sublime Text, but it should be applicable to any developer who uses Sublime Text as part of their workflow.

 * [Sublime Text For Javascript: Keyboard Shortcuts][keyboard]
 * [Sublime Text For Javascript: Configuration][configuration]
 * [Sublime Text For Javascript: Packages][plugins]

### Configuration

Sublime Text allows for plenty of text editing power out of the box, but the real power comes
when you begin configuring it to meet your own needs.  This is by definition a topic that different people will approach in different ways, but in this post I will attempt to give an overview of what is configurable in Sublime Text (**Spoiler: almost everything**), and how to configure them.


### The Basics

Sublime Text settings are defined using json files.  There are multiple levels of configuration
to give you very fine grained control of how your editor will act for different files.
From the [Sublime Docs](http://www.sublimetext.com/docs/2/settings.html),  settings are prioritized like this:

> Settings files are consulted in this order:
>
> Packages/Default/Preferences.sublime-settings
> Packages/Default/Preferences (platform).sublime-settings
> Packages/User/Preferences.sublime-settings
> &lt;Project Settings &gt;
> Packages/ &lt;syntax &gt; / &lt;syntax &gt;.sublime-settings
> Packages/User/&lt;syntax &gt;.sublime-settings
> &lt;Buffer Specific Settings &gt;

Settings can be set on a default, user, project, or syntax-type basis, and add specific
settings for distraction free mode.

**Never set your options using the Default-Settings files!**

The default settings files for Sublime text will be overwritten when you update
to a new version, and the plugin specific settings will be overwritten when those
plugins are updated.  Always use the "User-Settings" files instead for "global"
settings.  Its not a bad idea to immediately copy the default settings file to
the User-Settings file when you're initially setting up sublime so that you can
see all of the options that are set in that file and edit them accordingly.

Heres my User-Settings file for my Windows-based version of Sublime:

```json
{
    // Modified Solarized Theme with Mardown Support (https://gist.github.com/1904917)
   "color_scheme": "Packages/User/Solarized (Light).tmTheme",

    "font_face": "Consolas",
    "font_size": 8,

    // Valid options are "no_bold", "no_italic", "no_antialias", "gray_antialias",
    // "subpixel_antialias", "no_round" (OS X only) and "directwrite" (Windows only)
    "font_options": ["directwrite"],

    // If enabled, will highlight any line with a caret
    "highlight_line": true,

    // Set to true to automatically save files when switching to a different file
    // or application
    "save_on_focus_lost": true,

    // Columns in which to display vertical rulers
    "rulers":
    [
        80
    ],

    // The theme controls the look of Sublime Text's UI (buttons, tabs, scroll bars, etc)
    "theme": "Soda Light.sublime-theme",

    // Set to true to close windows as soon as the last file is closed, unless
    // there's a folder open within the window. This is always enabled on OS X,
    // changing it here won't modify the behavior.
    "close_windows_when_empty": true,

    // List any packages to ignore here. When removing entries from this list,
    // a restart may be required if the package contains plugins.
    "ignored_packages":
    [
        "Default",
        "Vintage",
        "ZenCoding"
    ]
}
```

### Visuals

One of the most configurable thing about Sublime Text is the GUI.  If you don't
like something about how the program looks, it is probably configurable. Some of the
most important visual settings are below:

#### Color Scheme

The most obvious configurable visual setting is the color scheme.  Sublime ships
with a solid selection of default color schemes, and its easy to find and download
more online with [Package Control][packagecontrol], which I'll cover more in the
plugins article.  I use Sublime's Monokai Bright theme for JS development, and a
[custom Solarized theme][solarized] for writing in Markdown for this blog and my
notes.  You can set color scheme with a command like this in one of your settings files

```javascript
"color_scheme": "Packages/User/Solarized (Light).tmTheme"
```

or you can set it in the preferences menu on the top of the screen (this will set it
in your User-Settings file)

#### Theme

You can also configure the overall look and feel of the application.  While the
default is by no means ugly, many people prefer the [Soda][soda] theme that adds
some prettier gradients and a choice of a light/dark theme.  You can set that
like this after downloading the theme:

```javascript
"theme": "Soda Light.sublime-theme",
```

#### Quickies

Here are a few more quick visual tweaks

- "rulers": set where to show vertical rulers.  Takes an array of integers.  I put one at 80 in order to limit my line lengths in javascript.
- "tab\_size","translate\_tabs\_to\_spaces", and "use\_tab\_stops: Determine space and tabs behaviors.
- "highlight\_line": If true will highlight every line with a cursor

### Key Bindings

This is where all of the information from [Monday's post][keyboard] starts to become a whole lot less useful.  All of the keyboard shortcuts that were discussed in that post are completely configurable.  Again you want to use the "User" preferences file in
Packages/User to set the keybindings.  Keybindings are stored in json form like this:

```json
{ "keys": ["ctrl+z"], "command": "undo" },
{ "keys": ["ctrl+shift+z"], "command": "redo" },
{ "keys": ["ctrl+y"], "command": "redo_or_repeat" },
{ "keys": ["ctrl+u"], "command": "soft_undo" },
{ "keys": ["ctrl+shift+u"], "command": "soft_redo" },
```

You can override existing shortcuts to make common commands more convenient or
create your own by combining [sublime commands][commands].  One cool trick is the ability to define keyboard shortcuts to toggle settings.

>The toggle\_setting command can be used to toggle a setting. For example, to make a key binding that toggles the word\_wrap setting on the current file, you can use (in Preferences/Key Bindings - User):
>
```json
{
    "keys": ["alt+w"],
    "command": "toggle_setting",
    "args":
    {
        "setting": "word_wrap"
    }
}
```

>The set\_setting command can be used to set a setting to a specific value. For example, this key binding makes the current file use the Cobalt color scheme:
>
```json
{
    "keys": ["ctrl+k", "ctrl+c"],
    "command": "set_setting",
    "args":
    {
        "setting": "color_scheme",
        "value": "Packages/Color Scheme - Default/Cobalt.tmTheme"
    }
}
```

The settings modified here are buffer specific settings: they override any settings placed in a settings file, but apply to the current file only.

### Plugins

Plugins also sometimes have their own configuration files.  These generally mimic the format of the editor, and its adviced as usual to use the User Settings for these so as to avoid having your settings blown away with updates

### Build Systems

Sublime also lets you configure custom build systems to build your project.  These can be defined at the same levels of everything else, though in this case it probably makes most sense at the syntax and project level.

### Projects

Projects are a great way to organize your Sublime Text files.  You can set up a project
at any time by creating a .sublime-project file (this will happen automatically if you choose save project or edit project in the Project toolbar menu).  The project configuration menu takes a list of folders, a list of settings, and a list of build system settings as a JSON file.  These settings will then override your user level settings for files in the folders that you specify.  This lets you meet project specifications for things like tabs or line length without constantly fiddling with settings.  You also can enable or disable different plugins based on project, and create visual distinction between projects with different color themes.

### Macros

Macros let you save a series of common commands as a json file.  You can then run them
from the "Tools/Macro" menu.  There's more information in the [unofficial docs][macros]

### Snippets

One final thing that you can configure in Sublime Text is "Snippets".  Sublime Snippets provide advanced templating ability thats configured with an XML template.  A detailed description of what you can do with snippets is available in the [unofficial docs][snippets].  Suffice it to say that it allows everything from a simple text replacement to full  templating based on a variety of environment variables.

Sublime contains several Javascript related snippets by default for several basic tasks, and there are more that you can find in other places around the internet.  [Here's one example by Jonathan Creamer][creamer] with a few snippets for plugin development, and a nice little console.log snippet for quick development.



### Summary

1. Pretty much everything in Sublime can be customized using JSON files
2. Use User files or project/syntax specific files, not the Default files
3. Learn your options and you can get a lot more out of Sublime Text

I hope this is helpful.  I'll be following up with one final post later this week on helpful Sublime plugins for javascript development.


[keyboard]: http://benmccormick.org/2012/12/30/sublime-text-for-javascript-keyboard-shortcuts

[configuration]: http://benmccormick.org/2013/01/01/sublime-text-for-javascript-configuration

[plugins]: http://benmccormick.org/2013/01/03/sublime-text-for-javascript-plugins

[packagecontrol]: http://wbond.net/sublime_packages/package_control

[solarized]: https://gist.github.com/1904917

[soda]: https://github.com/buymeasoda/soda-theme/

[commands]: http://www.sublimetext.com/docs/commands

[snippets]: http://docs.sublimetext.info/en/latest/extensibility/snippets.html

[macros]: http://docs.sublimetext.info/en/latest/extensibility/macros.html

[creamer]: http://freshbrewedcode.com/jonathancreamer/2012/07/13/a-couple-of-useful-javascript-sublime-text-2-snippets/
