import dotenv from "dotenv";
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

// console.log(process.cwd())
// console.log(process.env)

const config = {
    env: process.env.NODE_ENV ? Number(process.env.NODE_ENV) : 5000,
    port: process.env.port
}

export default config