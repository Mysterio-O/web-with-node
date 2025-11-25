const crypto = require('crypto');

const password = 'password123'

console.log('\n MD5 Hash:');
const md5Hash = crypto.createHash('md5').update('password123').digest('hex');
// console.log("input: password123\nmd5 hash:",md5Hash)

// ! md5 is not recommended for security reason



const sha265Hash = crypto.createHash('sha256').update(password).digest('hex');
const sha512Hash = crypto.createHash('sha512').update(password).digest('hex');
console.log(sha265Hash,'\n',sha512Hash)