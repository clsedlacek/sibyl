module.exports = (client, member) => {
    console.log('Log', `${member.user.tag} (${member.id}) has joined ${member.guild.name} (${member.guild.id})`);
    //log when a user joins server

//    member.sendMessage("Welcome to **Psychedelic Praxis**! We hope you enjoy your stay.\n\nIn order to access the main channels, write a bit about yourself in **#introductions**. Please take some time to read the rules and guidelines in **#server**.");
    
    member.guild.channels.find("name", "introductions").send("**Welcome to the server, <@" + member.id + ">!** In order to access the chat channels, write your A/S/L and something about yourself here. Please take some time to read the rules and guidelines in #server and enjoy your stay!");
    
//    const welcomeChannel = member.guild.channels.find('name', 'welcome');
//    if (welcomeChannel) {
//        welcomeChannel.send(`Please welcome ${member.user.tag} to our guild!`);
//    }


};
//send welcome message if welcome channel exists