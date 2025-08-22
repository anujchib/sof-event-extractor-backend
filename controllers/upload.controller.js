import { getPresignedDownloadURL,getPresignedUploadURL } from "../services/s3.service.js";

export const getUploadURL = async (req,res,next)=>{



    try {

        const { fileName, fileType, fileSize } = req.body;
        
        console.log('Request body:', { fileName, fileType, fileSize });
      
        if(!fileName){

            return res.json({
                error:"fileName is required"
            })
            
        };

        const url = await getPresignedUploadURL(fileName);
        res.json({
            uploadURL: url
        });
        
    } catch (err) {
        next(err)
        
    }
}



export const getDownloadURL = async (req,res,next)=>{



    try {

        const {fileName} = req.query;
        if(!fileName){

            return res.json({
                error:"fileName is required"
            })
            
        };

        const url = await getPresignedDownloadURL(fileName);
        res.json({
            downloadURL: url
        });
        
    } catch (err) {
        next(err)
        
    }
}