const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

/**
 * Converts a given URL into a PDF file.
 * 
 * @param {string} url - The URL to convert to PDF.
 * @param {string|object} [outputPathOrOptions] - The file path to save the PDF, or an options object.
 * @param {object} [options={}] - Optional puppeteer PDF options.
 * @returns {Promise<void>}
 */
async function convertUrlToPdf(url, outputPathOrOptions, options = {}) {
    if (!url) {
        throw new Error('URL is required.');
    }

    let outputPath = typeof outputPathOrOptions === 'string' ? outputPathOrOptions : undefined;
    let finalOptions = typeof outputPathOrOptions === 'object' ? outputPathOrOptions : options || {};

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Navigate to URL and wait until network is mostly idle
    await page.goto(url, { waitUntil: 'networkidle2' });

    let fileName = outputPath;

    // Generate PDF name from title if not provided
    if (!fileName) {
        const title = await page.title();
        const sanitizedTitle = title.replace(/[^a-zA-Z0-9-_\.]/g, '_') || 'document';
        fileName = `${sanitizedTitle}.pdf`;
    }

    let finalPath = fileName;

    // If outputDir is provided in options, use it as the base directory
    if (finalOptions.outputDir) {
        finalPath = path.resolve(finalOptions.outputDir, path.basename(fileName));
    }

    // Ensure the output directory exists
    const dir = path.dirname(finalPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Generate PDF
    const pdfOptions = {
        path: finalPath,
        format: 'A4',
        printBackground: true,
        ...finalOptions
    };

    await page.pdf(pdfOptions);
    await browser.close();
}

module.exports = convertUrlToPdf;
