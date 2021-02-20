module.exports = {
	name: 'ping',

	execute(message, ...args) {
		return message.reply('Pong!');
	}
};