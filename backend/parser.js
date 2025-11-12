const fs = require("fs/promises");
const { createWorker } = require("tesseract.js");

async function loadPdfjs() {
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
  pdfjsLib.GlobalWorkerOptions.workerSrc = await import("pdfjs-dist/build/pdf.worker.mjs");
  return pdfjsLib;
}

async function extractTextFromPDF(filePath) {
  const pdfjsLib = await loadPdfjs();
  const data = new Uint8Array(await fs.readFile(filePath));
  const pdf = await pdfjsLib.getDocument({ data }).promise;

  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    text += pageText + "\n";
  }

  return text.trim();
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

