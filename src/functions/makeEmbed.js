const channels = require('../../config/channels.json');

module.exports = {
	simpleLog: function(client, color, title, message) {
        logchan = client.channels.find("id", channels.logs);
        logchan.send({embed: {
            color: color,
            // author: {
            //   name: client.user.username,
            //   icon_url: client.user.avatarURL
            // },
            title: title,
            // url: "http://google.com",
            description: message,
            timestamp: new Date()
            }
        })
    },

    twoferLog: function(client, color, title, message, title1, logMessage1, title2, logMessage2) {
        logchan = client.channels.find("id", channels.logs);
        logchan.send({embed: {
            color: color,
            // author: {
            //   name: client.user.username,
            //   icon_url: client.user.avatarURL
            // },
            title: title,
            description: message,

            fields: [{
                name: title1,
                value: logMessage1
              },
              {
                name: title2,
                value: logMessage2
              }
            ],
            
            timestamp: new Date()
            }
        })
    }
}