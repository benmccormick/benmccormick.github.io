---
title: "Creating a Build System For a Coffeescript Project with Ant"
date: "2013-03-23 16:23:00+00:00"
layout: "post"
path: "/2013/03/23/creating-a-build-system-for-a-coffeescript-project-with-ant"
description: "Using Ant to build my coffeescript projects"
category: "tools"
pageViews: "421"
last30pageViews: "8"
---

I've recently taken the time to develop an organized build system for a [Coffeescript][Coffeescript] and [SASS](http://sass-lang.com/) [project][scratchcalc] that I've been working on in my free time.  I learned a lot during the process, and I wanted to share my experience here.  I used Ant for my build system, and worked in a variety of different libraries for minification, testing and documentation.


### Getting Started

The first step is to install Ant.  It comes preinstalled on OSX, is [fairly straightforward][antlinux] to install on Linux, and is [a bit more involved][antwindows] to install on Windows  If you're using my exact setup, you'll also need [NodeJS][nodejs] (for Coffeescript, UglifyJS,and Docco) and [Ruby][ruby] (for SASS) installed.

### My Project Structure

I went for a structure with 4 directories.

- src
- build
- test
- docs

All of the source files are in the source directory, with Javascript and Coffeescript files in a scripts directory, and SASS styles in a styles folder.  This particular app has only a single HTML file, which sits in the root of the source directory.  The test folder contains a single HTML page, and a series of unit test files written in Coffeescript, in a structure that mirrors the src directory.  The build and docs directories are initially empty.

### The Basics

We start with a simple Ant setup.  We'll create an init task, a clean task, and debug and production tasks.  The following code goes into our build.xml file, which is placed at the root of the project directory.

    <project name="scratchcalc" default="debug">

        <loadproperties srcfile="build.properties" />

        <target name="debug" depends="clean, init">
            <echo>ScratchCalc Version ${version} (Debug Version)</echo>
        </target>

        <target name="production" depends="clean, init">
            <echo>ScratchCalc Version ${version}</echo>
        </target>

        <target name= "init">
            <mkdir dir="${build.dir}" />
        </target>

        <target name="clean">
            <delete dir="${build.dir}" />
        </target>

    </project>

So for this project, we now have 4 tasks that we can call.  To call the init task, all we need to do is run

    Ant init

from the command line.   Both our debug and production tasks mark clean and init as dependencies, so running them will remove and restore the build directory.  Beyond that, our build doesn't do much right now.  Lets change that.

### Copying

The simplest thing we can do with our Ant file is basic copying of files.  So lets start with a task that just copies over our files from the src directory to the build directory.

```xml
<target name="copy" description="Copies files from src to build dirs">
    <echo>Copying JS, CSS & HTML Files</echo>
     <copy todir="${build.dir}">
        <fileset dir="${src.dir}" includes="**/*.HTML,**/*.css,**/*.js" />
     </copy>
</target>
```

This simply copies any HTML, CSS, or Javascript files in the src directory over to an equivalent position in the build directory.  The segments in the `${}` format are variables defined in our build.properties file.  For my project, that looks something like this so far:

    version = 0.0.1
    copyright = Copyright 2012-2013 Ben McCormick.
    src.dir = ./src
    build.dir = ./build
    test.dir = ./test
    lib.dir = ${src.dir}/ext

This would be a great place to start for a project thats currently running without a build system.  If you're able to get your project to build like this, it will set you up to be able to start more interesting things going forward.

And we of course want to do more interesting things.  This project uses Coffeescript and SASS, so we'll need to do a bit more than just copy files.  So lets copy those scripts as well, but convert them to Javascript and CSS while we do.

```xml
<target name="copy" description="Compiles Coffeescript and SASS files,copies the rest">
    <echo>Copying Coffeescript Files</echo>
     <copy todir="${build.dir}">
        <fileset dir="${src.dir}" includes="**/*.HTML,**/*.css,**/*.js" />
     </copy>
     <exec executable="coffee">
          <arg value="--compile"/>
          <arg value="--map" />
          <arg value="--output" />
          <arg value="${build.script.dir}" />
          <arg value="${src.script.dir}" />
     </exec>
     <mkdir dir="${build.styles.dir}" />
     <apply executable="sass" dest="${build.dir}" verbose="true" force="true" failonerror="true">
        <arg value="--unix-newlines" />
        <srcfile />
        <targetfile />
        <filelist dir ="${src.dir}" files="styles/scratch.sass" />
        <!--<fileset dir="${src.dir}" includes="**/*.sass"  />-->
        <mapper type="glob" from="*.sass" to="*.css"/>
    </apply>
</target>
```

So along with copying the raw files, we also now copy the Coffeescript and SASS files.  For Coffeescript, we run the coffee executable against the entire src dir, and have it mirror the output to the build dir.  For Sass, we only want to run the compile on a single file, which pulls all of the other files into it through import statements.  So we use the filelist and mapper to specify the input and output files.

### Concatenation

Mirroring your directory can be helpful for debugging, and is a good initial step if you're converting to Ant from a locally run project.  But we'd really like to limit the amount of requests we make when deploying our site.  To do that, we'll concatenate the js files together.  For my project I create 2 files, one for my external dependencies, and one for my own local files.  I may eventually reduce this to 1, but for now I like separating the 2 for debugging clarity.

```xml
<target name="concatenatejs" description="Concatenate All the JS together">
    <!-- Instead of concatenating the JS files directly, use coffee to preserve the source map -->
    <echo>Concatenating the JS</echo>
    <concat destfile="${build.libs}">
         <filelist dir ="${build.script.dir}" files="lib/jquery.js,lib/knockout.js,lib/BigDecimal.js" />

          <fileset dir="${build.script.dir}/lib" includes="**/*.js"/>
    </concat>
    <apply executable="coffee"  verbose="true" force="true" failonerror="true" parallel="true">
    <arg value="--compile" />
    <arg value="--map" />
    <arg value="--join" />
    <arg value="${build.script.output}" />
    <srcfile />
    <filelist dir ="${src.script.dir}" files="editor/toolkit.coffee,editor/markupGen.coffee,parser/eqTreeBuilder.coffee,parser/NumberValue.coffee,parser/eqScanner.coffee,parser/eqTokenizer.coffee,parser/tablePlaceHolder.coffee,parser/EQParser.coffee,parser/calcFramework.coffee,editor/editor.coffee" />
    </apply>
</target>
```

For the external libraries I use Ant's built in `concat` task to concatenate the files together.  For the Coffeescript files, I use the coffee compiler rather than concatenating the files that I copied.  I was hoping to do this in order to preserve the source map, which allows for easier debugging.  Unfortunately the compiler has trouble generating source maps for joined files right now.  I'm hoping to fix that in the future, in the meantime I may be using a different approach, possibly using uglifyjs to concatenate the files and generate the maps.

## Minify

Speaking of [uglifyjs][uglify], I use that for minifying my Javascript.

```xml
<target name="minify" description="Minify the JS for Production">
    <echo>Minifying the JS For Production with UglifyJS</echo>
    <apply executable="uglifyjs" verbose="true" force="true" failonerror="true">
        <srcfile />
        <arg value="--output" />
        <arg value="${build.script.output}" />
        <filelist  files ="${build.script.output}"/>
    </apply>
</target>
```

I only require this for the production task, and leave the full source available for the debug task to preserve the readability of the generated JS.

### Documentation

I use [docco][docco] for my Coffeescript documentation.  It converts comments into documentation and runs them through a [Markdown][markdown] parser to generate a clean HTML page with the code and comments intermingled.

```xml
<target name="documentation" description="Generate Docco Documentation for coffee files">
    <echo>Generating Documentation with Docco</echo>
    <apply executable="docco" verbose="true" force="true" failonerror="true">
        <srcfile />
        <fileset dir ="${src.script.dir}" >
            <include name="**/*.coffee"/>
        </fileset>
    </apply>
</target>
```

### Testing

I use Jasmine for testing.  [Jasmine][jasmine] is a "Behavior Driven Development" style unit testing framework for Javascript.  In an ideal world I would be setting up a build task to run on the server and display the results when I run the build.  Unfortunately I wasn't able to find a way to do that without generating additional dependencies.  Its possible with NodeJS or RequireJS style modules and dependencies, and its also possible using phantomJS, but I didn't want to require either of those for testing.   So instead I have my build task generate an HTML page with the test results.  I may add some scripting to open this page by default after running a production build in the future.

```xml
<target name="test" description="Generate the JS for testing with Jasmine">
  <!-- Ideally this would run a server side jasmine test, but that requires better dependency management than we have right now-->
  <echo>Generating the Test JS with jasmine</echo>
  <apply executable="coffee"  verbose="true" force="true" failonerror="true" parallel="true">
    <arg value="--compile" />
    <arg value="--join" />
    <arg value="${test.output}" />
    <srcfile />
    <fileset dir ="${test.dir}" >
      <include name="**/*.coffee"/>
    </fileset>
  </apply>
</target>
```

### Summary

Adding a build system has been great for my project.  Its allowed me to be a lot more organized and to do some cool things that are a pain by hand (unit testing, Coffeescript).  I definitely recommend looking into doing this for any non-trivial Javascript/web project that you're working on.

    <project name="scratchcalc" default="debug">

      <loadproperties srcfile="build.properties" />

      <target name="debug" depends="clean, init, copy,concatenatejs">
        <echo>ScratchCalc Version ${version} (Debug Version)</echo>
      </target>

      <target name="production" depends="clean, init, copy,concatenatejs,minify,documentation,test">
        <echo>ScratchCalc Version ${version}</echo>
      </target>

      <target name="copy" description="Compiles Coffeescript and SASS files,copies the rest">
        <echo>Copying Coffeescript Files</echo>
         <copy todir="${build.dir}">
          <fileset dir="${src.dir}" includes="**/*.HTML,**/*.css,**/*.js" />
         </copy>
         <exec executable="coffee">
            <arg value="--compile"/>
            <arg value="--map" />
            <arg value="--output" />
            <arg value="${build.script.dir}" />
            <arg value="${src.script.dir}" />
         </exec>
         <mkdir dir="${build.styles.dir}" />
         <apply executable="sass" dest="${build.dir}" verbose="true" force="true" failonerror="true">
              <arg value="--unix-newlines" />
              <srcfile />
              <targetfile />
              <filelist dir ="${src.dir}" files="styles/scratch.sass" />
              <!--<fileset dir="${src.dir}" includes="**/*.sass"  />-->
              <mapper type="glob" from="*.sass" to="*.css"/>
          </apply>
      </target>

      <target name="concatenatejs" description="Concatenate All the JS together">
        <!-- Instead of concatenating the JS files directly, use coffee to preserve the source map -->
        <echo>Concatenating the JS</echo>
        <concat destfile="${build.libs}">
           <filelist dir ="${build.script.dir}" files="lib/jquery.js,lib/knockout.js,lib/BigDecimal.js" />

            <fileset dir="${build.script.dir}/lib" includes="**/*.js"/>
        </concat>
        <apply executable="coffee"  verbose="true" force="true" failonerror="true" parallel="true">
          <arg value="--compile" />
          <arg value="--map" />
          <arg value="--join" />
          <arg value="${build.script.output}" />
          <srcfile />
          <filelist dir ="${src.script.dir}" files="..." />
        </apply>
      </target>

      <target name="documentation" description="Generate Docco Documentation for coffee files">
        <echo>Generating Documentation with Docco</echo>
        <apply executable="docco" verbose="true" force="true" failonerror="true">
              <srcfile />
              <fileset dir ="${src.script.dir}" >
                <include name="**/*.coffee"/>
              </fileset>
          </apply>
      </target>

      <target name="test" description="Generate the JS for testing with Jasmine">
        <!-- Ideally this would run a server side jasmine test, but that requires better dependency management than we have right now-->
        <echo>Generating the Test JS with jasmine</echo>
        <apply executable="coffee"  verbose="true" force="true" failonerror="true" parallel="true">
          <arg value="--compile" />
          <arg value="--join" />
          <arg value="${test.output}" />
          <srcfile />
          <fileset dir ="${test.dir}" >
            <include name="**/*.coffee"/>
          </fileset>
        </apply>
      </target>

      <target name="minify" description="Minify the JS for Production">
        <echo>Minifying the JS For Production with UglifyJS</echo>
        <apply executable="uglifyjs" verbose="true" force="true" failonerror="true">
              <srcfile />
              <arg value="--output" />
              <arg value="${build.script.output}" />
              <filelist  files ="${build.script.output}"/>
          </apply>
      </target>

      <target name= "init">
        <mkdir dir="${build.dir}" />
      </target>

      <target name="clean">
        <delete dir="${build.dir}" />
      </target>

    </project>

*Update June 2014: Since writing this post, Javascript based build tools have continued to mature and grow.  These days I'd recommend [Grunt][grunt] or [Gulp][gulp] for your front end build script needs, though Ant is still a fine choice if you're integrating your builds with a Java project, or have lots of experience with it.*


---

### Further Reading

- <a href="http://www.amazon.com/gp/product/1449327680/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=1449327680&linkCode=as2&tag=productjavasc-20">Maintainable JavaScript</a><img src="http://ir-na.amazon-adsystem.com/e/ir?t=productjavasc-20&l=as2&o=1&a=1449327680" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /> - This is a great little book for anyone writing Javascript applications in teams.  It has a great section on developing a Javascript build system with Ant



[Coffeescript]: http://Coffeescript.org/
[sass]: http://sass-lang.com/
[maintainablejs]: http://www.amazon.com/Maintainable-Javascript-Nicholas-C-Zakas/dp/1449327680
[antlinux]: http://www.rndblog.com/how-to-install-ant-on-linux/
[antwindows]: http://www.nczonline.net/blog/2012/04/12/how-to-install-apache-ant-on-windows/
[scratchcalc]: https://bitbucket.org/ben336/scratchcalc
[uglify]: https://github.com/mishoo/UglifyJS2
[jasmine]: http://pivotal.github.com/jasmine
[docco]: http://jashkenas.github.com/docco
[nodejs]: http://nodejs.org/
[ruby]: http://www.ruby-lang.org/
[markdown]: http://daringfireball.net/projects/markdown/
[grunt]: http://gruntjs.com/
[gulp]: http://gulpjs.com/
