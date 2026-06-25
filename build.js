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

  // HTML
  const htmlSrc = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf8');
  const htmlMin = minifyHTML(htmlSrc);
  fs.writeFileSync(path.join(destDir, 'index.html'), htmlMin, 'utf8');
  console.log(`Minified index.html (${(htmlSrc.length / 1024).toFixed(2)} KB -> ${(htmlMin.length / 1024).toFixed(2)} KB)`);

  // CSS
  const cssSrc = fs.readFileSync(path.join(srcDir, 'styles.css'), 'utf8');
  const cssMin = minifyCSS(cssSrc);
  fs.writeFileSync(path.join(destDir, 'styles.css'), cssMin, 'utf8');
  console.log(`Minified styles.css (${(cssSrc.length / 1024).toFixed(2)} KB -> ${(cssMin.length / 1024).toFixed(2)} KB)`);

  // JS
  const jsSrc = fs.readFileSync(path.join(srcDir, 'app.js'), 'utf8');
  const jsMin = minifyJS(jsSrc);
  fs.writeFileSync(path.join(destDir, 'app.js'), jsMin, 'utf8');
  console.log(`Minified app.js (${(jsSrc.length / 1024).toFixed(2)} KB -> ${(jsMin.length / 1024).toFixed(2)} KB)`);

  console.log('Build completed successfully!');
}

build();
