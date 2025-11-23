const fs = require('fs');
const content1 = "this is content 1 \n sync";


try{
    fs.writeFileSync('./output/sync.txt',content1);
    console.log("file written sync");
}catch(err){
    console.error(err);
}

const content2 = "this is another file \n async";

fs.writeFile('./output/async.txt',content2,(error)=> {
    if(error){
        console.error(error);
    }
    console.log('file added async');
});
