Store Ghost's media at AWS S3 storage using SDK version 3.
Tested and working for Ghost version v5.61.3

# Ghost S3 V3 Storage

This module allows you to store media file at Amazon S3 instead of using local server storage.

## Installation

### Via Git

-   Login to Ghost server.

    ```
    ssh user@server
    ```

-   Navigate to Ghost root directory.

    ```
    cd [path/to/ghost]
    ```

-   Create the following directory inside Ghost root directory `/content/adapters/storage`.

    ```
    cd /content
    mkdir adapters
    cd adapters
    mkdir storage
    ```

-   Clone this repo inside storage directory.

    ```
    git clone https://github.com/anasnajaa/ghost-s3-v3-storage.git
    ```

-   Install dependencies

    ```
    cd ghost-s3-v3-storage
    npm i
    ```

## Configuration

-   Switch back to ghost root dir.

    ```
    cd [path/to/ghost]
    ```

-   Edit config.production.json

    ```
    nano config.production.json
    ```

Add `storage` block to `config.production.json` and include your AWS S3 configurations:

    "storage": {
        "active": "ghost-s3-v3-storage",
        "ghost-s3-v3-storage": {
            "awsAccessKeyId": "",
            "awsSecretAccessKey": "",
            "awsS3Region": "",
            "awsS3Bucket": "
        }
    },

-   Save and restart Ghost service.

    ```
    systemctl restart ghost.service
    ```

## Copyright & License

Copyright (c) 2023 Anas Najaa <anas@najaa.org>

Released under the [MIT license](https://github.com/anasnajaa/ghost-s3-v3-storage/blob/master/LICENSE).
