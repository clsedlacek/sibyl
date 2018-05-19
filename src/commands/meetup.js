const Discord = require('discord.js');
const roles = require('../../config/roles.json');
const channels = require('../../config/channels.json');


module.exports = (client, message, args) => {
    console.log('Log', 'someone wants to be a meathead...');
    var regularRole = message.member.guild.roles.find("name", roles.community);   
    var meetupRole = message.member.guild.roles.find("name", roles.locationVerified);
    
    if (args.length === 0) {
        message.channel.send(`Please specify your location.`)
        return
    };    

    function meetupAdd(userObj) {
        message.channel.guild.fetchMember(userObj)
        .then(member => {
            if (member.roles.find("name", regularRole.name)) {      // find members in Regulars role
                console.log(userObj.username + " requesting meatspace permissions is a regular.");                
                member.addRole(meetupRole).catch(console.error);            // Add meetup role
                console.log("User has been deemed certified meat.");
            } else {
                message.channel.send("Meetup rights are only available to " + roles.community)            
                return
                };
            message.guild.channels.find("id", channels.meetups).send("**<@" + userObj.id + ">** has been deemed " + roles.locationVerified + " at location **" + args.join(' ') + "**");
        })};
    
    meetupAdd(message.author);
    };
