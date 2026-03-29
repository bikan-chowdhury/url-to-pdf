# URL to PDF Converter

A simple NPM package to convert any webpage into a PDF file using its URL. Under the hood, it uses Puppeteer to render completely loaded pages.

## 🌐 Live Demo

Live web implementation of this package:
**[https://itsave.app/url-to-pdf-converter](https://itsave.app/url-to-pdf-converter)**

## 📦 Installation

Install `url-to-pdf-converter` using npm:

```bash
npm i url-to-pdf-converter
```

## 🚀 Quick Start

Here are different ways you can use this package in your project.

### Method 1: Using Promises (`.then()` / `.catch()`)

If you prefer using Promises, you can structure your code like this:

```javascript
const convertUrlToPdf = require("url-to-pdf-converter");

const url = "https://example.com";

convertUrlToPdf(url)
  .then(() => console.log("🎉 Success: PDF generated from the webpage!"))
  .catch((err) => console.error("❌ Error generating PDF:", err));
```

### Method 2: Using Async / Await

If your project uses modern syntax, `async/await` is a great way to use the package:

```javascript
const convertUrlToPdf = require("url-to-pdf-converter");

async function generatePDF() {
  try {
    await convertUrlToPdf("https://example.com", "output.pdf");
    console.log("🎉 Success: PDF generated and saved as output.pdf");
  } catch (error) {
    console.error("❌ Error generating PDF:", error);
  }
}

generatePDF();
```

### Method 3: Saving to a Specific Folder

You can automatically save the PDF to a specific folder using the `outputDir` option:

```javascript
const convertUrlToPdf = require("url-to-pdf-converter");

// This will automatically name the PDF based on the webpage's title
// and save it inside the 'my-pdfs' folder.
convertUrlToPdf("https://example.com", { outputDir: "./my-pdfs" })
  .then(() => console.log("✅ PDF successfully saved in my-pdfs folder."))
  .catch((err) => console.error(err));
```

## 📄 API Options & Details

### `convertUrlToPdf(url, [outputPath], [options])`

**Parameters:**

- `url` _(String)_: **(Required)** The URL of the webpage you want to convert.
- `outputPath` _(String)_: _(Optional)_ The exact file name where you want the PDF to be saved (e.g., `'my-page.pdf'`).
  - **Note:** If you don't provide this, the package will automatically use the targeted webpage's title as the file name.
- `options` _(Object)_: _(Optional)_ Extra options to customize the PDF.
  - `outputDir` _(String)_: A folder path where you want the PDF saved. The package will create this folder automatically if it doesn't exist.
  - You can also pass any standard [Puppeteer PDFOptions](https://pptr.dev/api/puppeteer.pdfoptions) (like `format`, `margin`, `landscape`).

**Returns:**

- A `Promise` that finishes when the PDF is completely saved.
