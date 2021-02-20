// Requiring modules
const logger = require('./utils/logger.js');
const { Client } = require('discord.js');
const fs = require('fs');

// Getting modules files
const modules = fs.readdirSync('./src/modules').filter(file => file.endsWith('.js'));

// Initiating Discord client
const bot = new Client();

// Getting env variables
require('dotenv').config();

// Runs when the bot comes online
bot.once('ready', () => {
    logger.debug('Log level is set to: ' + process.env.LOG_LEVEL)
    logger.info('Setting up modules...');
    modules.forEach(module => {
        const botModule = require('./modules/' + module);
        if (botModule === null) return;
        logger.debug('Started loading module: ' + module);
        try {
            new botModule(bot).ready();
            logger.debug('Loaded module: ' + module);
        } catch (expression) {
            logger.error('Module failed to load: ' + module);
            logger.error(expression);
        }
    });
    logger.info('Module setup done.');
    logger.info(bot.user.tag + ' is ready!');
});

logger.info('Logging on Discord...')
bot.login(process.env.DISCORD_TOKEN);
