const logger = require('../utils/logger.js');

// Getting env variables
require('dotenv').config();

module.exports = function (bot) {
    // When the bot is ready we will run this function
    this.ready = () => {
        logger.debug('Status: ' + process.env.STATUS);
		bot.user.setPresence({ activity: { name: process.env.STATUS_MESSAGE, type: process.env.STATUS_TYPE }, status: 'online' })
			.then(presence => logger.info('[setStatus.js] Status set: (' + presence.status + ")" + presence.activities))
			.catch(error => logger.error(error));
    };
};
