#!/bin/bash
rm ./dist/*.*
npx parcel build minTest.html
docker build -t mariohtml5 . && docker run -p 8080:80 --rm mariohtml5
