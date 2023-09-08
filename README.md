Store Ghost's media at AWS S3 storage using SDK version 3.
Tested and working for Ghost version v5.61.3

# Ghost S3 Storage

This module allows you to store media file at Amazon S3 instead of storing at local server.

## Installation

    npm install --save ghost-s3-v3-storage

## Create storage module

Create index.js file with folder path 'content/storage/ghost-s3-v3/index.js' (manually create folder if not exist)
module.exports = require('ghost-s3-storage');

## Configuration

Create new Amazon S3 bucket and new IAM User with permissions allowed to put and get object from that bucket. Remember saving ACCESS_KEY and ACCESS_SECRET_KEY.

Add `storage` block to file `config.js` in each environment as below:

    storage: {
        active: 'ghost-s3',
        'ghost-s3': {
            accessKeyId: 'Put_your_access_key_here',
            secretAccessKey: 'Put_your_secret_key_here',
            bucket: 'Put_your_bucket_name',
            region: 'Put_your_bucket_region',
            assetHost: 'Put_your_cdn_url*'
        }
    },

## Copyright & License

Copyright (c) 2023 Anas Najaa <anas@najaa.org>

Released under the [MIT license](https://github.com/anasnajaa/ghost-s3-v3/blob/master/LICENSE).
