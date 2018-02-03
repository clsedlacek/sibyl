const Discord = require('discord.js');

module.exports = (client, message, args) => {
    const embed = new Discord.RichEmbed()       // this will need to be updated to Discord.MessageEmbed once the Discord.js version is updated to version 12
    .setDescription('Let me tell you about this place.')
    //    .setDescription(`${message.guild.name} Server Information`)
    .setThumbnail(message.guild.iconURL)
    .setFooter(message.guild.owner.user.tag, message.guild.owner.user.avatarURL)
    .addField('Server Demographics:', `${message.guild.members.filter(member => member.user.bot).size} bot among ${message.guild.memberCount} members.`)
    .addField('Channels', `${message.guild.channels.filter(chan => chan.type === 'voice').size} voice and ${message.guild.channels.filter(chan => chan.type === 'text').size} text channels`)
    // .addField('Roles', message.guild.roles.map(role => role.name).join(', '));
    message.channel.send({ embed });       // embed variable is the same as the object so this could just be message.channel.send({ embed });
};