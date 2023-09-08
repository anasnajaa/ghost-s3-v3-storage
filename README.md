Store Ghost's media at AWS S3 storage using SDK version 3.
Tested and working for Ghost version v5.61.3

# Ghost S3 V3 Storage

This module allows you to store media file at Amazon S3 instead of using local server storage.

## Installation

### Via Git

-   Clone this repo to `/content/adapters/storage`.

    ```
    cd [path/to/ghost]/content/adapters/storage
    git clone https://github.com/anasnajaa/ghost-s3-v3-storage.git
    ```

-   Install dependencies

    ```
    cd ghost-s3-v3-storage
    npm install
    ```

## Configuration

Add `storage` block to file `config.production.json` and include your AWS S3 configurations:

    "storage": {
        "active": '',
        "ghost-s3-v3-storage": {
            "awsAccessKeyId": '',
            "awsSecretAccessKey": '',
            "awsS3Region": '',
            "awsS3Bucket": ''
        }
    },

## Copyright & License

Copyright (c) 2023 Anas Najaa <anas@najaa.org>

Released under the [MIT license](https://github.com/anasnajaa/ghost-s3-v3-storage/blob/master/LICENSE).
