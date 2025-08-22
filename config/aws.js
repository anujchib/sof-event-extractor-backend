import { S3Client } from "@aws-sdk/client-s3";
import { Textract, TextractClient } from "@aws-sdk/client-textract";
import dotenv from "dotenv";

dotenv.config();


 export const s3Client = new S3Client({

    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY_ID
    }

});

 export const textractClient = new TextractClient({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY_ID
    }
});


