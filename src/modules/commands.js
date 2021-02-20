// Importing Discord
const { Collection } = require('discord.js');
const logger = require('../utils/logger.js');
const fs = require('fs');

// Getting env variables
require('dotenv').config();

module.exports = function (bot) {
	// Setup function, which sets up all commands from files
	this.setup = () => {
		// Make new commands
		logger.debug('Making bot commands collection...');
		bot.commands = new Collection();

		// Setting up commands
		logger.info('Loading commands from files...');
		const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

        // Trying to load commands in folder
        commandFiles.forEach(command => {
            logger.debug(command);
            const botCommand = require('../commands/' + command);
            try {
                bot.commands.set(botCommand.name.toLowerCase(), botCommand);
				logger.debug('Command fully loaded: '+ command);
            } catch (expression) {
                logger.error('Failed to load command: '+ command);
                logger.error(expression);
            }
        });
    };
    
    // When the bot is ready this will run
	this.ready = function() {
		// Run setup
        this.setup();

        // Await messages
        bot.on('message', message => {
            // Stop if message is from bot
            if(message.author.bot) return;

            // Stop if wrong prefix
            const prefix = process.env.COMMAND_PREFIX;
            if(!message.content.startsWith(prefix)) return;

            // Get args and command name from message
            const [cmd, ...args] = message.content.trim().substring(prefix.length).split(/\s+/);
            logger.debug(message.author.tag +' is trying to use a command with: '+ message.content)

            // Get command
            const command = bot.commands.get(cmd);

            // Stop if command does not exist
            if (!command) {
                logger.warn('Failed to find command('+ cmd +') that '+ message.author.tag +' tried to use.')
                return;
            }

            // Try running the command
            try {
                logger.info(message.author.tag +' used command('+ command.name +'): '+ message.content)
                return command.execute(message, args);
            } catch (error) {
                logger.error('Failed to run: ' + cmd);
                logger.error(error);
                return message.reply('there was an unexpected error trying to execute the command('+ getcommand.name +')!');
            }
        });
        logger.info('Awaiting commands...');
	};
};