#!/bin/bash

random_filename="upload_$(date +%s)_$RANDOM.zip"

rm upload_*.zip
zip -r $random_filename src public package.json yarn.lock README.md
