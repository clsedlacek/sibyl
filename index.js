const Discord = require('discord.js');
const d20 = require('./node_modules/d20.js');
const config = require('.config/config.json');
const client = new Discord.Client();
//import modules, creates bot

client.config = config;     // so that config file is available to modules. could also merge this line with the dclaration.

client.log = require('./functions/log.js');     // overloading client namespace to have log.js functionality. evie.codes says this is a bad idea but she also says it's okay.

client.commands = new Discord.Collection();

client.commands.set('ping', require('./commands/ping.js'));
client.commands.set('serverinfo', require('./commands/serverinfo.js'));
client.commands.set('roll', require('./commands/roll.js'));
client.commands.set('help', require('./commands/help.js'));
client.commands.set('meetup', require('./commands/meetup.js'));
//setting all the commands and locations

client.on('message', message => require("./events/message.js")(client, message));
//call handleMessage(message) on client.on('message') event; event call provides function parameter ('message') automagically
client.on('guildCreate', guild => require('./events/guildCreate.js')(client, guild));
client.on('ready', () => require('./events/ready.js')(client));
client.on('guildMemberAdd', member => require('./events/guildMemberAdd.js')(client, member));
client.on('messageReactionAdd', (reaction, user) => require('./events/messageReactionAdd.js')(client, reaction, user));
client.login(config.token);
