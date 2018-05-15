const Discord = require('discord.js');
const roles = require('../../config/roles.json');
const channels = require('../../config/channels.json');

module.exports = (client, message) => {
    console.log('Log', message.createdTimestamp + " @" + message.author.username + " in " + message.channel + " said: " + message.content);
//    console.log(message.channel);


    if(message.channel.id == channels.introductions) {
        chanMember = message.author;       //store author as variable for whatever reason
        console.log(chanMember + " wrote an introduction.");        
        normieRole = message.member.guild.roles.find("name", roles.registree);
        message.member.addRole(normieRole).catch(console.error);
        console.log(chanMember + " is now a "+roles.registree);        

        return;
    };
    
    if(message.author.bot) return;
    // log everything and check if message is a user's command

    if(message.content.indexOf(client.config.prefix) !== 0) return;
    //make sure first index of string is the specified command prefix


        
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);

    //magic formula to reformat message into command-argument array
    const command = args.shift().toLowerCase();
    //split args from command and set variables

    if (client.commands.has(command)) {
        client.commands.get(command)(client, message, args);
    };
};
