#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="master"

if [ "$TRAVIS" = "true" ]
then
  git config --global user.email "gh-pages@localhost"
  git config --global user.name "npm gh-pages"
fi

node ./analytics.js
./node_modules/.bin/gatsby build

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy; just doing a build."
    exit 0
fi

# Actually deploy!
./node_modules/.bin/gh-pages -d public --repo https://$GITHUB_TOKEN@github.com/benmccormick/benmccormickorg.git
git checkout .
