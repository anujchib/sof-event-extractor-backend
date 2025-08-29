import { s3Client } from '../config/aws.js';
import { PutObjectCommand, GetObjectCommand, HeadObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';


export const getPresignedUploadURL = async (fileName) => {
  const request = new PutObjectCommand({
    Bucket: process.env.S3_UPLOAD_BUCKET,
    Key: fileName,
  });

  return await getSignedUrl(s3Client, request, { expiresIn: 300 });
};


export const getPresignedDownloadURL = async (fileName) => {
  try {
    
    const headRequest = new HeadObjectCommand({
      Bucket: process.env.S3_OUTPUT_BUCKET,
      Key: fileName,
    });

    await s3Client.send(headRequest); 

   
    const getRequest = new GetObjectCommand({
      Bucket: process.env.S3_OUTPUT_BUCKET,
      Key: fileName,
    });

    const signedUrl = await getSignedUrl(s3Client, getRequest, { expiresIn: 300 });
    return { ready: true, downloadURL: signedUrl };

  } catch (error) {
    if (error.name === "NotFound" || error.$metadata?.httpStatusCode === 404) {
     
      return { ready: false };
    }
    throw error; 
  }
};

export const listFilesWithPrefix = async (prefix) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.S3_OUTPUT_BUCKET,
      Prefix: prefix,
    });

    const response = await s3Client.send(command);
    
    // Extract just the filenames without the directory path
    const files = (response.Contents || []).map(obj => {
      const fullKey = obj.Key;
      // Remove the directory path to get just the filename
      const pathParts = fullKey.split('/');
      return pathParts[pathParts.length - 1]; // Get the last part (filename)
    });

    return files;
  } catch (error) {
    console.error('Error listing files from S3:', error);
    throw error;
  }
};