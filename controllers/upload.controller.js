import { getPresignedDownloadURL, getPresignedUploadURL, listFilesWithPrefix } from "../services/s3.service.js";

export const getUploadURL = async (req, res, next) => {
    try {
        const { fileName, fileType, fileSize } = req.body;
        
        console.log('Request body:', { fileName, fileType, fileSize });
      
        if (!fileName) {
            return res.json({
                error: "fileName is required"
            });
        }

        const url = await getPresignedUploadURL(fileName);
        res.json({
            uploadURL: url
        });
        
    } catch (err) {
        next(err);
    }
};

export const getDownloadURL = async (req, res, next) => {
    try {
        const { fileName } = req.body;
        console.log(fileName);
       
        if (!fileName) {
            return res.json({
                error: "fileName is required"
            });
        }

        const url = await getPresignedDownloadURL(fileName);
        res.json({
            downloadURL: url
        });
        
    } catch (err) {
        next(err);
    }
};

export const listFiles = async (req, res, next) => {
    try {
        const { baseFileName, directory = "extracted-text" } = req.body;
        
        console.log('Listing files for:', { baseFileName, directory });
        
        if (!baseFileName) {
            return res.json({
                error: "baseFileName is required"
            });
        }

        // Create prefix to search for files
        const prefix = `${directory}/${baseFileName}_extracted-`;
        
        const files = await listFilesWithPrefix(prefix);
        
        console.log('Found files:', files);
        
        res.json({
            files: files
        });
        
    } catch (err) {
        console.error('Error listing files:', err);
        next(err);
    }
};