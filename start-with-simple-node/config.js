require("dotenv").config();

const config = {
    app:{
        name:process.env.APP_NAME || "Default",
        version:process.env.APP_V || '1.0.0',
        port: process.env.PORT || 3000,
        env:process.env.NODE_ENV
    }
}
console.log(config);
module.exports = config;