const fs = require('fs');

// fs.writeFileSync('./output/temp.txt', 'this is temp file');

// console.log('file created')


if (fs.existsSync('./output/temp.txt')) {
    console.log('exists');

    fs.unlinkSync('./output/temp.txt');
    console.log('file deleted')

}
else {
    console.log('missing');
    fs.writeFileSync('./output/temp.txt', 'this is temp file');
    console.log('created again')
}