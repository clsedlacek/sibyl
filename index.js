// import dotenv dependency to use environmental variables
require('dotenv').config();

// import dependencies
const Discord = require('discord.js');
const express = require('express');
const config = require('./config/config.json');

// set base directory var
global.__basedir = __dirname;
global.__publicdir = __dirname + '/public';

// initialize clients/servers
const client = new Discord.Client();
const httpServer = express();

// settings to configure HTTP environment using localhost
const httpPort = process.env.PORT || 3000;
const apiIp = config.apiIp || 'localhost';

// so that config file is available to modules. could also merge this line with the declaration.
client.config = config;   

// overloading client namespace to have log.js functionality. evie.codes says this is a bad idea but she also says it's okay.
client.log = require('./src/functions/log.js');     

// create collection of commands using Discord's API
client.commands = new Discord.Collection();

// setting all the commands and locations
client.commands.set('ping', require('./src/commands/ping.js'));
client.commands.set('serverinfo', require('./src/commands/serverinfo.js'));
client.commands.set('serverpost', require('./src/commands/serverpost.js'));
client.commands.set('roll', require('./src/commands/roll.js'));
client.commands.set('help', require('./src/commands/help.js'));
client.commands.set('meetup', require('./src/commands/meetup.js'));
client.commands.set('community', require('./src/commands/community.js'));
client.commands.set('tarot', require('./src/commands/tarot.js'));

// setting all the role commands to /features/role.js. Some of these could be added to the userRoles script through a clever and consolidated function.

client.commands.set('tripping', require('./src/commands/userRoles.js'));
client.commands.set('stoned', require('./src/commands/userRoles.js'));
client.commands.set('altered', require('./src/commands/userRoles.js'));

// call handleMessage(message) on client.on('message') event; // event call provides function parameter ('message') automagically
client.on('message', message => require("./src/events/message.js")(client, message));
// other events that have calls
client.on('guildCreate', guild => require('./src/events/guildCreate.js')(client, guild));
client.on('ready', () => require('./src/events/ready.js')(client));
client.on('guildMemberAdd', member => require('./src/events/guildMemberAdd.js')(client, member));
client.on('messageReactionAdd', (reaction, user) => require('./src/events/messageReactionAdd.js')(client, reaction, user));

// login with environmental token
client.login(process.env.token);

// setting up the HTTP server
httpServer.use(express.static('public'));
httpServer.get('/', (req, res) => res.send('HTTP server working'));
httpServer.listen(httpPort, () => console.log(`HTTP server listening on port ${httpPort}`));
