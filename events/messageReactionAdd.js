const Discord = require('discord.js');

module.exports = (client, reaction, user) => {
    var muteLimit = 4;         
    var voteTally = 0;         // set counter that will only be incremented by voter's reactions, this will be reset with each vote counted and repopulated again    
    var muteRole = reaction.message.member.guild.roles.find("name", "🤐 Squelched");
    var voterRole = reaction.message.member.guild.roles.find("name", "🌈 Regulars");
    var memberRole = reaction.message.member.guild.roles.find("name", "🕵 Normies");    
    var peerModChannel = reaction.message.guild.channels.find("name", "braintrust");
    var arbitrationChannel = reaction.message.guild.channels.find("name", "arbitration");

    console.log('Log', `${user.tag} reacted to message id ${reaction.message.id} with the reaction ${reaction.emoji}`);
    if (reaction.emoji.name === "🤐") {
        console.log("Muting emoji detected. Testing for reaction count...");

        function testVote(userObj) {       // local function to test if reaction-giver has the role that enables peer-vote muting
            reaction.message.channel.guild.fetchMember(userObj)
            .then(member => {
                if (member.roles.find("name", voterRole.name)) {      // find all members in Regulars role, execute if reaction-giver is a Regular
                    console.log(user.tag + " has the peer-mute Role, mute vote will be counted. So far " + reaction.count + " mute votes have been cast, inclusive.");
                    voteTally++;
                };

                if (voteTally >= muteLimit) {    // if that user was a Regular, recheck how many tallies the post has
                    console.log("Squelchable offense!");
                    reaction.message.member.removeRole(voterRole).catch(console.error); // add muted role to message poster     
                    reaction.message.member.removeRole(memberRole).catch(console.error); // remove member role if the muted poster had one                         
                    reaction.message.member.addRole(muteRole).catch(console.error);  // remove voter role if the muted poster had one
                    return;    
                    // peerModChannel.send("**" + reaction.message.member + " has been muted.**"); // Test to see if the emoji is multiple zipper emojis. If it is greater than the mute threshold, action is taken.
                    // arbitrationChannel.send("Hello <@" + reaction.message.member.id + ">, you have been placed in #arbitration. If you are @here, this means that three or more server members have voted to mute you from the primary chats. Please speak with a member of the staff when they are available to discuss why you have been muted by the community.");
                };
            })};

        reaction.users.forEach(function(user) {     // when reaction is added, run this code for each user who voted
        testVote(user);                        // test to see if they're a voter, and if so, test to see if the votes have crossed tally threshold
        if (voteTally >= muteLimit) {
            voteTally = 0;      // if the vote tally has already exceeded the mute threshold, reset vote tally     
            return;
            };
        })
    }
}