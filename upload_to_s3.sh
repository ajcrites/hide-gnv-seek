#!/bin/bash

aws s3 cp index.html s3://hide-gnv-seek/index.html --profile hide
aws s3 cp favicon.ico s3://hide-gnv-seek/favicon.ico --profile hide
aws s3 cp style.css s3://hide-gnv-seek/style.css --profile hide
aws s3 cp src/hidegnvseek3.png s3://hide-gnv-seek/src/hidegnvseek3.png --profile hide
aws s3 cp --recursive dist s3://hide-gnv-seek/dist --profile hide
