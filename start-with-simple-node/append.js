const fs = require('fs');

let err = false;
let alreadyHave = null
try{
    alreadyHave = fs.readFileSync('./output/app.log');
}catch(err){
    console.error(err);
    err = true
}

if (!alreadyHave || err) {
    fs.writeFileSync('./output/app.log', "application initialized");
    console.log('file created');
}

console.log('already have file app.log, appending new data...')

const logEntry1 = `\n${new Date().toISOString()} - user logged in\n`;

fs.appendFileSync('./output/app.log', logEntry1);

console.log('log 1 added');

const logEntry2 = `\n${new Date().toISOString()} - reset password request\n`

fs.appendFileSync('./output/app.log', logEntry2);

console.log('log 2 added');