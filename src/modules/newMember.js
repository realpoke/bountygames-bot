const logger = require('../utils/logger.js');

// Getting env variables
require('dotenv').config();

module.exports = function (bot) {
    // When the bot is ready we will run this function
    this.ready = () => {
        bot.on('guildMemberAdd', GuildMember => {
			logger.info('New member joined: ' + GuildMember.user.tag);
			const guild = GuildMember.guild;
			
			if (!guild.me.hasPermission("MANAGE_ROLES")) {
				logger.warn('Bot does not have permission to manage roles.');
				return;
			}

            const role = guild.roles.cache
				.find(r => r.name === process.env.DEFAULT_ROLE);
				
            if (!role) {
				logger.warn('Could not find default role in guild: ' + process.env.DEFAULT_ROLE);
				return;
			}

            GuildMember.roles.add(role, ['New member']);
            logger.debug('Gave ' + role.name + ' to ' + GuildMember.user.tag);
        });
		logger.info('Listening for new members...');
	};
};