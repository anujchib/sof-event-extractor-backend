import { s3Client } from '../config/aws.js';
import { PutObjectCommand,GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

 export const  getPresignedUploadURL =  async (fileName)=>{
    const request = new PutObjectCommand({
        Bucket:process.env.S3_UPLOAD_BUCKET,
        Key: fileName,
    });

    return await getSignedUrl(s3Client,request,{expiresIn:300})

};

 export const  getPresignedDownloadURL =  async (fileName)=>{
    const request = new GetObjectCommand({
        Bucket:process.env.S3_OUTPUT_BUCKET,
        Key: fileName,
    });

    return await getSignedUrl(s3Client,request,{expiresIn:300})

};

// export default {getPresignedUplaodURL,getPresignedDownloadURL};