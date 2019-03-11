const argv  = process.argv;
let obj = {};

for ( let i = 0; i < argv.length; i++ ) {
    if ( i == 0 ) {
        obj['node'] = argv[i];
        continue;
    }
    if ( i== 1 ) {
        obj['exec_path'] = argv[i];
        continue;
    }
    let cur = argv[i];
    if (i==0) obj['node'] = cur;
    if ( i == 1 ) obj['exec_path'] = cur;
    let arr = cur.split('=');
    obj[arr[0]] = arr[1];
}

const cfg = require(`./env/${obj.env}`);
module.exports = cfg;