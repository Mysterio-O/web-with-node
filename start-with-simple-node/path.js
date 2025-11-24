const path = require('path');

console.log('current file: \n')
console.log('file name:', __filename);
console.log('directory_name:',__dirname);

console.log("\n"+"-".repeat(50)+ "\n");

const filePath = "/generated/g.pdf";

console.log('analyze path:',filePath,"\n")

console.log('dirname:',path.dirname(filePath));

console.log('current base name:', path.basename(__filename));
console.log('base name:', path.basename(filePath));

console.log('file extent:', path.extname(filePath));

console.log('file name:', path.basename(filePath,path.extname(filePath)),"\n")

console.log("\n"+"-".repeat(50)+ "\n");

const parsed = path.parse(filePath);
console.log('parsed path:', parsed);

console.log('formatted path:', path.format(parsed));