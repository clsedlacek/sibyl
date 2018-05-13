const Discord = require('discord.js');
const d20 = require('d20');

module.exports = (client, message, args) => {
    console.log('Log', 'rolled...');
    if (args.length === 0) {
        message.channel.send(`Please specify a die type in one of the following formats: d*x*, *y*d*x*, *y*d*x*+/-*z*, or simply *x*.`)
        return
    };
    var dice = args.toString();
    result = d20.roll(dice);
    // message.channel.send("You roll " + dice + " and get " + result); // old message response, replaced with embed
    const embed = new Discord.RichEmbed()       // this will need to be updated to Discord.MessageEmbed once the Discord.js version is updated to version 12
        .setDescription(message.author.username + ' rolls ' + dice + '!')
        .setThumbnail("http://mtgs.me/s/discordbots/dicespill.jpg")
        .addField('Result:', result)
        message.channel.send({ embed });       // embed variable is the same as the object so this could just be message.channel.send({ embed });
};
