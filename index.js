const Discord = require('discord.js');
const d20 = require('d20');
const config = require('./config/config.json');
const client = new Discord.Client();
//import modules, creates bot

client.config = config;     // so that config file is available to modules. could also merge this line with the dclaration.

client.log = require('./src/functions/log.js');     // overloading client namespace to have log.js functionality. evie.codes says this is a bad idea but she also says it's okay.

client.commands = new Discord.Collection();

client.commands.set('ping', require('./src/commands/ping.js'));
client.commands.set('serverinfo', require('./src/commands/serverinfo.js'));
client.commands.set('roll', require('./src/commands/roll.js'));
client.commands.set('help', require('./src/commands/help.js'));
client.commands.set('meetup', require('./src/commands/meetup.js'));
client.commands.set('community', require('./src/commands/community.js'));
//setting all the commands and locations

client.on('message', message => require("./src/events/message.js")(client, message));
//call handleMessage(message) on client.on('message') event; // event call provides function parameter ('message') automagically
client.on('guildCreate', guild => require('./src/events/guildCreate.js')(client, guild));
client.on('ready', () => require('./src/events/ready.js')(client));
client.on('guildMemberAdd', member => require('./src/events/guildMemberAdd.js')(client, member));
client.on('messageReactionAdd', (reaction, user) => require('./src/events/messageReactionAdd.js')(client, reaction, user));
client.login(config.token);
