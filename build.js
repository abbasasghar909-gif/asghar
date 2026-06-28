const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const destDir = __dirname;

function minifyHTML(html) {
  return html
    // Remove comments
    .replace(/<!--[\s\S]*?-->/g, '')
    // Collapse whitespace
    .replace(/\s+/g, ' ')
    // Remove spaces between tags
    .replace(/>\s+</g, '><')
    .trim();
}

function minifyCSS(css) {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove spaces around symbols
    .replace(/\s*([{}|:;,])\s*/g, '$1')
    // Collapse multiple spaces
    .replace(/\s+/g, ' ')
    .trim();
}

function minifyJS(js) {
  return js
    // Remove block comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove single-line comments (ignoring URLs like http://)
    .replace(/^(?!\s*['"])\s*\/\/.*$/gm, '') // line starts with comment
    .replace(/([^:]\/\/.*)$/gm, '') // comments at end of line (simple match)
    // Trim lines
    .replace(/^\s+|\s+$/gm, '')
    // Remove extra newlines
    .replace(/\n+/g, '\n')
    .trim();
}

function build() {
  console.log('Starting build / minification...');

  // CSS
  const cssSrc = fs.readFileSync(path.join(srcDir, 'styles.css'), 'utf8');
  const cssMin = minifyCSS(cssSrc);
  fs.writeFileSync(path.join(destDir, 'styles.css'), cssMin, 'utf8');
  console.log(`Minified styles.css (${(cssSrc.length / 1024).toFixed(2)} KB -> ${(cssMin.length / 1024).toFixed(2)} KB)`);

  // Extract critical CSS from styles.css
  const cssLines = cssSrc.split('\n');
  const criticalCss = [
    ...cssLines.slice(0, 631),
    ...cssLines.slice(1861, 1990),
    ...cssLines.slice(3078, 3130)
  ].join('\n');
  const criticalCssMin = minifyCSS(criticalCss);

  // HTML
  let htmlSrc = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf8');
  htmlSrc = htmlSrc.replace('<!-- CRITICAL_CSS -->', `<style>${criticalCssMin}</style>`);
  const htmlMin = minifyHTML(htmlSrc);
  fs.writeFileSync(path.join(destDir, 'index.html'), htmlMin, 'utf8');
  console.log(`Minified index.html (${(htmlSrc.length / 1024).toFixed(2)} KB -> ${(htmlMin.length / 1024).toFixed(2)} KB) with critical CSS embedded`);

  // Guide HTML
  const guideSrc = fs.readFileSync(path.join(srcDir, 'quran-iq-guide.html'), 'utf8');
  const guideMin = minifyHTML(guideSrc);
  fs.writeFileSync(path.join(destDir, 'quran-iq-guide.html'), guideMin, 'utf8');
  console.log(`Minified quran-iq-guide.html (${(guideSrc.length / 1024).toFixed(2)} KB -> ${(guideMin.length / 1024).toFixed(2)} KB)`);

  // Privacy HTML
  const privacySrc = fs.readFileSync(path.join(srcDir, 'privacy-policy.html'), 'utf8');
  const privacyMin = minifyHTML(privacySrc);
  fs.writeFileSync(path.join(destDir, 'privacy-policy.html'), privacyMin, 'utf8');
  console.log(`Minified privacy-policy.html (${(privacySrc.length / 1024).toFixed(2)} KB -> ${(privacyMin.length / 1024).toFixed(2)} KB)`);

  // Terms HTML
  const termsSrc = fs.readFileSync(path.join(srcDir, 'terms-of-service.html'), 'utf8');
  const termsMin = minifyHTML(termsSrc);
  fs.writeFileSync(path.join(destDir, 'terms-of-service.html'), termsMin, 'utf8');
  console.log(`Minified terms-of-service.html (${(termsSrc.length / 1024).toFixed(2)} KB -> ${(termsMin.length / 1024).toFixed(2)} KB)`);

  // Pricing HTML
  const pricingSrc = fs.readFileSync(path.join(srcDir, 'pricing.html'), 'utf8');
  const pricingMin = minifyHTML(pricingSrc);
  fs.writeFileSync(path.join(destDir, 'pricing.html'), pricingMin, 'utf8');
  console.log(`Minified pricing.html (${(pricingSrc.length / 1024).toFixed(2)} KB -> ${(pricingMin.length / 1024).toFixed(2)} KB)`);

  // Blog HTML
  const blogSrc = fs.readFileSync(path.join(srcDir, 'blog.html'), 'utf8');
  const blogMin = minifyHTML(blogSrc);
  fs.writeFileSync(path.join(destDir, 'blog.html'), blogMin, 'utf8');
  console.log(`Minified blog.html (${(blogSrc.length / 1024).toFixed(2)} KB -> ${(blogMin.length / 1024).toFixed(2)} KB)`);

  // FAQ HTML
  const faqSrc = fs.readFileSync(path.join(srcDir, 'faq.html'), 'utf8');
  const faqMin = minifyHTML(faqSrc);
  fs.writeFileSync(path.join(destDir, 'faq.html'), faqMin, 'utf8');
  console.log(`Minified faq.html (${(faqSrc.length / 1024).toFixed(2)} KB -> ${(faqMin.length / 1024).toFixed(2)} KB)`);

  // Course Landing Pages HTML
  const coursesList = [
    'online-quran-classes.html',
    'noorani-qaida.html',
    'quran-with-tajweed.html',
    'hifz-program.html',
    'quran-translation.html',
    'quran-tafsir.html'
  ];
  coursesList.forEach(file => {
    const src = fs.readFileSync(path.join(srcDir, file), 'utf8');
    const min = minifyHTML(src);
    fs.writeFileSync(path.join(destDir, file), min, 'utf8');
    console.log(`Minified ${file} (${(src.length / 1024).toFixed(2)} KB -> ${(min.length / 1024).toFixed(2)} KB)`);
  });

  // JS
  const jsSrc = fs.readFileSync(path.join(srcDir, 'app.js'), 'utf8');
  const jsMin = minifyJS(jsSrc);
  fs.writeFileSync(path.join(destDir, 'app.js'), jsMin, 'utf8');
  console.log(`Minified app.js (${(jsSrc.length / 1024).toFixed(2)} KB -> ${(jsMin.length / 1024).toFixed(2)} KB)`);

  console.log('Build completed successfully!');
}

build();
