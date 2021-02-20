const logger = require('../utils/logger.js');

// Getting env variables
require('dotenv').config();

module.exports = function (bot) {
    // When the bot is ready we will run this function
    this.ready = () => {
        bot.on('message', (message) => {
            if (message.author.bot) return;
            logger.debug('Example module caught a message.');
            this.custom(message);
        });
        logger.debug('Listening for messages...');
    };

    // Create custom functions in the module
    this.custom = (message) => {
        logger.debug('Custom function ran. Message we got (' + message.content + ')');
    };
};
