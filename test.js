const convertUrlToPdf = require('./index');

(async () => {
    try {
        console.log('Converting example.com to example.pdf...');
        await convertUrlToPdf('https://example.com', 'example.pdf');
        console.log('Done! Check example.pdf');
        
        console.log('\nConverting example.com with automatic title naming in a specific directory...');
        await convertUrlToPdf('https://example.com', { outputDir: './my-pdfs' });
        console.log('Done! Check the newly generated PDF inside the my-pdfs folder.');
    } catch (err) {
        console.error('Failed:', err);
    }
})();
