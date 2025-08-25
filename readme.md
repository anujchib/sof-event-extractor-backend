# 📄 Document Processing CICD Pipeline  

## 🚀 Overview  
This project implements a **serverless document processing pipeline** using AWS services.  
Currently, it supports **PDF uploads only** and is designed for automated text extraction, NLP post-processing, and structured output generation.  

The pipeline leverages **Amazon S3, Lambda, Textract, and SNS** in an event-driven architecture. A lightweight test frontend is included, while the **actual production frontend is under development**.  

---

## ⚙️ Workflow  

1. **Frontend (Test Upload UI)**  
   - User selects and uploads a **PDF file** via a drag-and-drop + upload button.  
   - A backend API generates a **pre-signed S3 URL**.  
   - The file is uploaded securely to an **S3 input bucket**.  

   ⚠️ Note: The current test frontend has **CORS-related issues** with download links.  
   - You can still access the processed file URLs through the **Chrome developer console**.  
   - The production frontend will resolve this.  

2. **S3 Event Trigger (Textract Start)**  
   - Upload triggers a **Lambda function**.  
   - This Lambda starts an **asynchronous Amazon Textract job** (`StartDocumentAnalysis`).  
   - An **SNS topic** is registered to receive completion notifications.  

3. **Textract Processing (Async)**  
   - Textract extracts text and structured data from the PDF.  
   - On completion, it sends a message to the **SNS topic**.  

4. **SNS → Lambda (Result Handler)**  
   - The SNS notification invokes another **Lambda function**.  
   - This Lambda fetches results from Textract and writes a **.txt file** to an **intermediate S3 bucket**.  

5. **LLM/NLP Post-Processing**  
   - Upload of the `.txt` file triggers a **third Lambda function**.  
   - This Lambda applies **NLP and LLM-based extraction** for deeper insights.  
   - Final structured outputs are saved in an **S3 output bucket** (JSON, CSV, etc.).  

6. **Download Link (Frontend Integration)**  
   - The frontend is designed to poll for the **download pre-signed URL**.  
   - Once available, a download button is shown to the user.  
   - Currently, due to **CORS issues**, direct download does not work from the test frontend.  

---

## 🏗️ Architecture  

**AWS Services Used:**  
- **Amazon S3** → Input, Intermediate, and Output buckets.  
- **AWS Lambda** → Event-driven processing pipeline.  
- **Amazon Textract (Async)** → Document OCR and text extraction.  
- **Amazon SNS** → Job completion notifications.  
- **LLM/NLP Layer** → Advanced text and entity extraction.  
- **Pre-signed URLs** → Secure upload and download.  

---

## 📌 High-Level Flow  

```
[Test Frontend Upload]
      |
      v
   [S3 Input Bucket] --(Event)--> [Lambda: Start Textract]
                                       |
                                       v
                             [Amazon Textract (Async)]
                                       |
                                       v
                              [SNS Job Completion]
                                       |
                                       v
                          [Lambda: Fetch Results]
                                       |
                                       v
                      [Intermediate S3 (.txt results)]
                                       |
                                       v
                          [Lambda: NLP/LLM Processor]
                                       |
                                       v
                         [S3 Output Bucket (Final)]
                                       |
                                       v
                     [Frontend Download (CORS issue)]
```

---

## 🔮 Current Limitations & Future Work  
- ✅ **Currently Supported**: PDF files only.  
- ⚠️ **Known Issue**: Download links on the test frontend fail due to CORS. Files are still retrievable via the **Chrome DevTools console**.  
- 🚧 **Future Enhancements**:  
  - Fix download integration in production frontend.  
  - Support additional file formats (DOCX, Images, etc.).  
  - Bundle JSON/CSV outputs into a **ZIP archive**.  
  - Add authentication and role-based access.  
  - Enhance LLM layer with **event extraction & summarization**.  
