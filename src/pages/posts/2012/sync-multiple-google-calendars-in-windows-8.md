---
title: "Sync Multiple Google Calendars in Windows 8"
date: "2012-11-07T12:00:00+00:00"
layout: "post"
path: "/2012/11/07/sync-multiple-google-calendars-in-windows-8"
category: "tools"
description: "A helpful tip for using Google Calendar in Windows 8"
pageViews: "34"
last30pageViews: "1"
---

Syncing with multiple Google calendars, or any Google calendars that you don't directly control seems like an unsupported feature in Windows 8 calendar app. Since I like to be able to see my wife's calendar as well as my own, and also occasionally create separate calendars for different things, this was a very frustrating limitation. After a bit of research, I found that it was possible. In the end, the workaround is a testament to how much Google has changed over the years.

###How to do it

After a bit of frustration trying to make it work through Google directly, I found this workaround on Microsoft's help page:

	1. Download "User Agent Switcher" from the Chrome Webstore
	2. Say your device is an Iphone 4
	3. Go to http://m.google.com/sync
	4. Deactivate Javascript in Settings
	5. Click your Windows mail device
	6. In the URL is this string: "supportMultipleCalendars=false". Change it to true.
	7. Reload the Page.
	8. If you have deactivated javascript you can add the calendars.
	9. Save
	10. Re-add your Google Account to your Windows Calendar app. It now works.

This is of course easier if you actually own an iOS device of some kind, since you can skip steps one and 2, and don't have to worry about switching your User Agent String back later. Disabling javascript is accessible under the Safari hub in the iOS settings app. Also I found step 10 to be unecessary. After closing the app and reopening it I was able to see my additional calendars.

###Why its ridiculous

For an advocate of the open web, Google sure does manage to make its services hard to use on competing platforms doesn't it? I understood when Google's stuff was crippled on Windows Phone, where it has no native apps, and the web-apps are the feature phone versions. It is a niche market and Google wasn't going to put extra time and energy into optimizing it in order to help a competitor. But Windows 8 is hardly going to be a niche market. Google is actively preventing something that clearly is technically trivial. Doing this in order to discourage users from using your service on a competing platform may be good business, but it is not "open web friendly." Its Google's choice to make obviously, and I wouldn't call it unethical exactly, but they've come a long way from the moral high ground they claimed to occupy in the web space just a few years ago.
