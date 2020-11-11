#!/bin/sh
rm -Rf ./dist
rm -Rf ./node_modules
echo 'Done!'

echo Installing source dependencies...
npm install --silent
npm dedupe -q --no-package-lock
npm run generate
echo App generated

echo Build started on `date`

aws s3 rm s3://$S3_BUCKET/ --recursive
aws s3 cp "./dist/" s3://$S3_BUCKET/ --recursive

aws cloudfront create-invalidation --distribution-id $CF_DISTRO --paths /\*

echo Build completed on `date`