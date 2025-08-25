
import express, { Router } from 'express' 
 import { getDownloadURL, getUploadURL } from '../controllers/upload.controller.js';

const router =  express.Router();


router.post('/upload-url',getUploadURL);
router.post('/download-url',getDownloadURL);


export default router;