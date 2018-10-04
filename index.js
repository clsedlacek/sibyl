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

// create collection of commands using Discord's API
client.commands = new Discord.Collection();

// collect all the invites
const invites = {};     // Initialize the invite cache
const wait = require('util').promisify(setTimeout); // A pretty useful method to create a delay without blocking the whole script.

client.on('ready', () => {  // "ready" isn't really ready. We need to wait a spell.  
  wait(1000);
  // Load all invites for all guilds and save them to the cache.
  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

//client.on('guildMemberAdd', member => require('./src/events/guildMembers.js')(client, member));


// setting all the commands and locations
client.commands.set('ping', require('./src/commands/ping.js'));
client.commands.set('serverinfo', require('./src/commands/serverinfo.js'));
client.commands.set('serverpost', require('./src/commands/serverpost.js'));
client.commands.set('roll', require('./src/commands/roll.js'));
client.commands.set('help', require('./src/commands/help.js'));
client.commands.set('meetup', require('./src/commands/meetup.js'));
client.commands.set('community', require('./src/commands/community.js'));
client.commands.set('tarot', require('./src/commands/tarot.js'));
client.commands.set('nvc', require('./src/commands/nvc.js'));

// setting all the role commands to /features/role.js. Some of these could be added to the userRoles script through a clever and consolidated function.

client.commands.set('tripping', require('./src/commands/userRoles.js'));
client.commands.set('altered', require('./src/commands/userRoles.js'));
client.commands.set('stoned', require('./src/commands/userRoles.js'));

// call handleMessage(message) on client.on('message') event; // event call provides function parameter ('message') automagically
client.on('ready', () => require('./src/events/ready.js')(client));

const messages = require('./src/events/messages.js');
client.on('message', message => messages.send(client, message));

/* LOGGING

client.on('messageDelete', message => messages.deleted(client, message));
client.on('messageUpdate', (oldMSG, newMSG) => messages.updated(client, oldMSG, newMSG));

const guildMembers = require('./src/events/guildMembers.js');
client.on('guildCreate', guild => require('./src/events/guildCreate.js')(client, guild));
client.on('guildMemberAdd', (member) => guildMembers.join(client, member, invites));
client.on('guildMemberRemove', (member) => guildMembers.depart(client, member));
client.on('guildBanAdd', (guild, user) => guildMembers.ban(guild, user));
client.on('guildBanRemove', (guild, user) => guildMembers.unban(guild, user));

*/

client.on('messageReactionAdd', (reaction, user) => require('./src/events/messageReactionAdd.js')(client, reaction, user));

// login with environmental token
client.login(process.env.token);

// setting up the HTTP server
httpServer.use(express.static('public'));
httpServer.get('/', (req, res) => res.send('HTTP server working'));
httpServer.listen(httpPort, () => console.log(`HTTP server listening on port ${httpPort}`));
