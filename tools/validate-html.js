const fs = require('fs');
const htmlparser2 = require('htmlparser2');
const html = fs.readFileSync('public/index.html', 'utf8');
let errors = [];
const parser = new htmlparser2.Parser({
  onerror(err) { errors.push(err.message); },
  onopentag() {},
  ontext() {},
  onclosetag() {}
}, { decodeEntities: true });
parser.write(html);
parser.end();
console.log('errors:', errors.length, errors.slice(0, 20));
