const color = require('colors');

// Getting env variables
require('dotenv').config();

module.exports = {
	debug: message => { if(process.env.LOG_LEVEL > 3) console.debug(color.blue("[DEBUG]" + "[" + new Date().toUTCString() + "]: " + message)) },
	warn: message => { if(process.env.LOG_LEVEL > 2) console.warn(color.yellow("[WARN]" + "[" + new Date().toUTCString() + "]: " + message)) },
	info: message => { if(process.env.LOG_LEVEL > 1) console.info(color.green("[INFO]" + "[" + new Date().toUTCString() + "]: " + message)) },
	error: message => { if(process.env.LOG_LEVEL > 0) console.error(color.red("[ERROR]" + "[" + new Date().toUTCString() + "]: " + message)) },
};