'use strict'

const pkg = require('../package.json')
const year = new Date().getFullYear()

function makeHtmlAttributes(attributes) {
  if (!attributes) {
    return '';
  }

  const keys = Object.keys(attributes);
  // eslint-disable-next-line no-param-reassign
  return keys.reduce((result, key) => (result += ` ${key}="${attributes[key]}"`), '');
}

function htmlTemplate(externals) {
  return ({ attributes, files, meta, publicPath, title }) => {
    let scripts = [...(files.js || [])];
    let links = [...(files.css || [])];

    // externals = [{ type: 'js', file: '//xxxx1.js', pos: 'before' }, { type: 'css', file: '//xxxx1.css' }]
    if (Array.isArray(externals)) {
      const beforeLinks = [];
      const beforeScripts = [];
      externals.forEach((node) => {
        let fileList;
        const isCssFile = node.type === 'css';
        if (node.pos === 'before') {
          fileList = isCssFile ? beforeLinks : beforeScripts;
        } else {
          fileList = isCssFile ? links : scripts;
        }
        fileList.push({ fileName: node.file });
      });
      scripts = beforeScripts.concat(scripts);
      links = beforeLinks.concat(links);
    }

    scripts = scripts
      .map(({ fileName }) => {
        const attrs = makeHtmlAttributes(attributes.script);
        return `<script src="${publicPath}${fileName}"${attrs}></script>`;
      })
      .join('\n');

    links = links
      .map(({ fileName }) => {
        const attrs = makeHtmlAttributes(attributes.link);
        return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
      })
      .join('\n');

    const metas = meta
      .map((input) => {
        const attrs = makeHtmlAttributes(input);
        return `<meta${attrs}>`;
      })
      .join('\n');

    return `
  <!doctype html>
  <html${makeHtmlAttributes(attributes.html)}>
    <head>
      ${metas}
      <title>${title}</title>
      ${links}
    </head>
    <body>
      ${scripts}
      <header></header>
      <main id="app-main">
      <div>${testBtns}</div>
      <div id="target"></div>
      </main>
      <footer></footer>
      ${testScript}
    </body>
  </html>`;
  };
}

const testBtns = ['error', 'info', 'debug', 'warning']
.map((type) => `<button role="button" type="button" id="${type}-btn" value="${type} logged">log ${type}</button>`)
.join('');

const testListeners = ['error', 'info', 'debug', 'warning']
.map((type) => `
let ${type}Btn = document.getElementById("${type}-btn");
${type}Btn.addEventListener("click", (e) => ${type}("testLogger", e.target.value + counter++))
`)
.join('');

const testScript = `
<script>
var counter = 0;
var debug = DebugUI.debug;
var info = DebugUI.info;
var warning = DebugUI.warning;
var error = DebugUI.error;
var subscribe = DebugUI.subscribe;
var debugConsole = new DebugUI.DebugConsole({
  mountTo: document.getElementById('target')
});

debugConsole.open()

subscribe('testLogger', (record) => debugConsole.log(record));
${testListeners}
</script>
`;

module.exports = htmlTemplate;