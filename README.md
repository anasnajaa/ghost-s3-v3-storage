# Ghost S3 V3 Storage

Store [Ghost's](https://ghost.org/) media at AWS S3 storage using [AWS SDK version 3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/).

Tested for Ghost version v5.61.3

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
            "awsS3Bucket": ""
        }
    },

-   Save and restart Ghost service.

    ```
    systemctl restart ghost.service
    ```

## Copyright & License

Copyright (c) 2023 Anas Najaa <anas@najaa.org>

Released under the [MIT license](https://github.com/anasnajaa/ghost-s3-v3-storage/blob/master/LICENSE).
