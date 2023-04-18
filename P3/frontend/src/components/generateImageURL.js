import aws from 'aws-sdk'

const region = "ca-central-1";
const bucketName = "on-park-bucket";
const accessKeyId = "AKIAQBCMTDZY7MTTM4OL";
const secretAccessKey = "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";

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
});

export async function generateUploadURL() {
    
    const getRanHex = size => {
    let result = [];
    let hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  
    for (let n = 0; n < size; n++) {
      result.push(hexRef[Math.floor(Math.random() * 16)]);
    }
    return result.join('');
    }

    const imageName = getRanHex(16);
  
    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    });
    
    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    const url = uploadURL;
    return url;
}