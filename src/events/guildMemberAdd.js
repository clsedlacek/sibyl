const channels = require('../../config/channels.json');
const introductions = require('../features/introductions.js');

module.exports = (client, member) => {
    console.log('Log', `${member.user.tag} (${member.id}) has joined ${member.guild.name} (${member.guild.id})`);
    //log when a user joins server

    introductions.sendWelcomeMessage(member);
    
//send welcome message if welcome channel exists
}
