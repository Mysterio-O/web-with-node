const os = require('os');

console.log('system info\n');
console.log('-'.repeat(50));

console.log('platform:', os.platform());
console.log('architecture:', os.arch());
console.log('os type:', os.type());
console.log('os release:', os.release());
console.log('hostname:', os.hostname());

console.log('-'.repeat(50));

console.log("\ncpu info:")
const cpus = os.cpus();
console.log('cpu model:', cpus[0].model)
console.log("number of cores:", cpus.length);
console.log('cpu speed:', cpus[0].speed);

console.log('-'.repeat(50));

const totalMem = os.totalmem();
const freeMem = os.freemem();
console.log("total memory:", Math.ceil((totalMem / 1024) / 1024 / 1024), 'gb')
console.log('free memory:', Math.ceil((freeMem / 1024) / 1024 / 1024), 'gb')

console.log('-'.repeat(50));

const uptime = os.uptime();
const days = Math.floor(uptime / 86400)
const hours = Math.floor((uptime % 86400) / 3600);
const minutes = Math.floor((uptime % 3600) / 60)
console.log(`uptime: ${days} days ${hours} hours ${minutes} minutes`)


