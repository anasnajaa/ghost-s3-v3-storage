"use strict";
/*
 * AWS S3 SDK 3 storage for ghost blog
 * @author : Anas Najaa <anas@najaa.org> https://anas.najaa.org
 * @updated : 8th Sept 2023
 * 
*/

const fs = require("fs");
const path = require('path');

const { v4 } = require("uuid");
const StorageBase = require("ghost-storage-base");
const fetch = require("isomorphic-fetch");
const { Upload } = require("@aws-sdk/lib-storage");
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");

class ghostS3V3Storage extends StorageBase {
    constructor(config) {
        super();
        this.config = config;
    }

    /**
     * Saves the file to S3 storage
     * - returns the full url to the uploaded image
     * @override
     * @param image
     * @returns {*}
     */
    save(file) {
        return new Promise((resolve, reject) => {
            this.uploadS3File(file, this.config)
                .then(s3Url => {
                    resolve(s3Url);
                });
        });
    }

    /**
     * Check S3 if file exist
     * @override
     * @param {*} awsFileUrl 
     * @returns {Promise.<*>}
     */
    exists(awsFileUrl) {
        return new Promise((resolve, reject) => {
            fetch(awsFileUrl).then(response => {
                if (!response.ok) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            }).catch(err => {
                console.log('ghostS3V3Storage', err);
                resolve(false);
            });
        });
    }

    /**
     * Serve the file from S3 directly
     * @override
     * @returns {serveStaticContent}
     */
    serve() {
        return function serveContent(req, res, next) {
            next();
        }
    }

    /**
     * Delete file by key from S3
     * @override
     * @param {*} awsFileUrl 
     * @returns {Promise.<*>}
     */
    delete(awsFileUrl) {
        return new Promise((resolve, reject) => {
            this.deleteS3File(awsFileUrl, this.config)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        })
    }

    /**
     * Read file bytes from S3
     * @override
     * @param options
     */
    read(options) {
        return new Promise((resolve, reject) => {
            fetch(options.path).then(response => {
                if (!response.ok) {
                    reject(response.status);
                }
                resolve(response.arrayBuffer);
            }).catch(err => {
                console.log('ghostS3V3Storage', err);
                reject(err);
            });
        });
    }

    getAwsClient(config) {
        return new S3Client({
            credentials: {
                accessKeyId: config.awsAccessKeyId,
                secretAccessKey: config.awsSecretAccessKey
            },
            region: config.awsS3Region
        });
    }

    getNewFileKey(file) {
        const MONTHS = [
            '01', '02', '03', '04', '05', '06',
            '07', '08', '09', '10', '11', '12'
        ];
        const now = new Date();
        const baseDir = `${now.getFullYear()}/${MONTHS[now.getMonth()]}/`;
        const ext = path.extname(file.name);
        return `${baseDir}${v4()}${ext}`;
    };

    uploadS3File(file, config) {
        const awsClient = this.getAwsClient(config);
        return new Promise((resolve, reject) => {
            new Upload({
                client: awsClient,
                params: {
                    ACL: "public-read",
                    Bucket: config.awsS3Bucket,
                    ContentType: file.type,
                    Key: this.getNewFileKey(file),
                    Body: fs.createReadStream(file.path),
                    CacheControl: 'max-age=' + (30 * 24 * 60 * 60)// 30 day
                },
                tags: [],
            }).done().then(res => {
                resolve(res.Location);
            }).catch(err => {
                console.log('ghostS3V3Storage', err);
                reject(err);
            });
        });
    }

    deleteS3File(url, config) {
        const fileKey = url.split("amazonaws.com/")[1];
        const awsClient = this.getAwsClient(config);
        const command = new DeleteObjectCommand({
            Bucket: config.awsS3Bucket,
            Key: fileKey,
        });
        return new Promise((resolve, reject) => {
            awsClient.send(command)
                .then(response => {
                    resolve(response);
                }).catch(err => {
                    console.log('ghostS3V3Storage', err);
                    reject(err);
                });
        });
    }
}

module.exports = ghostS3V3Storage;