#!/bin/bash

aws s3 cp index.html s3://hide-gnv-seek/index.html --profile hide
aws s3 cp --recursive dist s3://hide-gnv-seek/dist --profile hide
