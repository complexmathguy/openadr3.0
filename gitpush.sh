#!/bin/bash

cd $1

git config --global user.email "srandolph6969@gmail.com"
git config --global user.name "Steven Randolph"
 
echo init the repository
git init .

echo add all files from root dir below, with ignore dirs and files in the .gitignore
git add .

echo 'commit all the files'
git commit -m "initial commit"

echo 'add a remote pseudo for the openadr3.0 repository'

git remote add origin https://complexmathguy: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@github.com/complexmathguy/openadr3.0

echo 'push the commits to the repository master'
git push origin master


echo 'add tag newest'
git tag newest

echo 'push tag newest'
git push origin newest

