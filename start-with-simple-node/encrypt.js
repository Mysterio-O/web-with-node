const crypto = require('crypto');

const algorithm = "aes-256-cbc";

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encryption(text) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");

    return {
        iv: iv.toString('hex'),
        securedData: encrypted,
    }

}

function decrypted(enc,ivHex){
    const decipher = crypto.createDecipheriv(algorithm,key,Buffer.from(ivHex,'hex'));
    let decrypted = decipher.update(enc,'hex','utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;

}


const password = 'password123'

const encrypted = encryption(password);

const decryptedData = decrypted(encrypted.securedData,encrypted.iv);

console.log(`
    Password Encryption:
    --------------------------
    Actual Raw Password: ${password}
    After encryption: ${encrypted.securedData,
        encrypted.iv}
    After decrypted: ${decryptedData}
    
    `)
    // 