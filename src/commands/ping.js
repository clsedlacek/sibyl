const Discord = require('discord.js');

module.exports = (client, message, args) => {
    console.log('Log', 'pinged...');
    message.channel.send(`Ponging in progress...`).then((msg) => {
        msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms.`);
        //fancy pong that first sends message, then shows latency time in message
    });
};