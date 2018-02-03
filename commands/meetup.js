const Discord = require('discord.js');


module.exports = (client, message, args) => {
    console.log('Log', 'someone wants to be a meathead...');
    var regularRole = message.member.guild.roles.find("name", "🌈 Regulars");   
    var meetupRole = message.member.guild.roles.find("name", "🍖 Certified Meat");
    
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
                console.log("User has been deemed certicied meat.");
            } else {
                message.channel.send(`Meetup rights are only available to @🌈 Regulars.`)            
                return
                };
            message.guild.channels.find("name", "meetups").send("**<@" + userObj.id + ">** has been deemed 🍖 Certified Meat at location **" + args.join(' ') + "**");
            // message.guild.channel.get("meetups").send(`"${member.user.username}" has been added to the channel at location ${args}`);                
        })};
    
    meetupAdd(message.author);
    };