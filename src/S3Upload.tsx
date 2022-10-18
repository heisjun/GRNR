import { useState } from 'react';
import AWS from 'aws-sdk';
import { Row, Col, Button, Input, Alert } from 'reactstrap';

const [progress, setProgress] = useState(0);
const [selectedFile, setSelectedFile] = useState(null);
const [showAlert, setShowAlert] = useState(false);

const ACCESS_KEY = 'AKIAZXUTC5GVAXEOLRPO';
const SECRET_ACCESS_KEY = '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';
const REGION = 'ap-northeast-2';
const S3_BUCKET = 'grnr-s3';

AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
});
