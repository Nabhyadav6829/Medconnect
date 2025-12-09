// parser.js → YEHI USE KAR, PURA REPLACE KAR DE
const fs = require("fs/promises");
const { createWorker } = require("tesseract.js");
const pdf = require("pdf-parse");  // ← Correct import for v1.1.1 (direct function)

async function extractTextFromPDF(filePath) {
  const dataBuffer = await fs.readFile(filePath);
  
  // YEHI LINE V1 KE LIYE PERFECT HAI → pdf(buffer).then() style
  const data = await pdf(dataBuffer);
  
  return data.text.trim();
}

async function extractTextFromImage(filePath) {
  const worker = await createWorker("eng");
  try {
    const { data } = await worker.recognize(filePath);
    return data.text.trim();
  } finally {
    await worker.terminate();
  }
}

async function extractText(filePath, mimetype) {
  if (mimetype === "application/pdf") {
    return await extractTextFromPDF(filePath);
  } else if (mimetype.startsWith("image/")) {
    return await extractTextFromImage(filePath);
  } else {
    throw new Error("Unsupported file format. Please upload a PDF or image file.");
  }
}

module.exports = { extractTextFromPDF, extractTextFromImage, extractText };