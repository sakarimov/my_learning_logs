const fs = require('fs');

const dfile = fs.readFileSync('notes.txt', 'utf-8');

console.log(dfile);
