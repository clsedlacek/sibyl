require('dotenv').config();

// dependencies
const Discord = require('discord.js');
const express = require('express');
const config = require('./config/config.json');

// set base directory var
global.__basedir = __dirname;
global.__publicdir = __dirname + '/public';

// initialize clients/servers
const client = new Discord.Client();
const httpServer = express();

// settings
const httpPort = process.env.PORT || 3000;
const apiIp = config.apiIp || 'localhost';

client.config = config;     // so that config file is available to modules. could also merge this line with the dclaration.

client.log = require('./src/functions/log.js');     // overloading client namespace to have log.js functionality. evie.codes says this is a bad idea but she also says it's okay.

client.commands = new Discord.Collection();

client.commands.set('ping', require('./src/commands/ping.js'));
client.commands.set('serverinfo', require('./src/commands/serverinfo.js'));
client.commands.set('roll', require('./src/commands/roll.js'));
client.commands.set('help', require('./src/commands/help.js'));
client.commands.set('meetup', require('./src/commands/meetup.js'));
client.commands.set('community', require('./src/commands/community.js'));
client.commands.set('tarot', require('./src/commands/tarot.js'));
//setting all the commands and locations

client.on('message', message => require("./src/events/message.js")(client, message));
//call handleMessage(message) on client.on('message') event; // event call provides function parameter ('message') automagically
client.on('guildCreate', guild => require('./src/events/guildCreate.js')(client, guild));
client.on('ready', () => require('./src/events/ready.js')(client));
client.on('guildMemberAdd', member => require('./src/events/guildMemberAdd.js')(client, member));
client.on('messageReactionAdd', (reaction, user) => require('./src/events/messageReactionAdd.js')(client, reaction, user));
client.login(process.env.token);

httpServer.use(express.static('public'));
httpServer.get('/', (req, res) => res.send('HTTP server working'));
httpServer.listen(httpPort, () => console.log(`HTTP server listening on port ${httpPort}`));
