const axios = require('axios')
const Discord = require('discord.js')

const client = new Discord.Client()
const DiscordService = {
    initialize: () => {
        return new Promise((resolve, reject) => {
            client.once('ready', () => {
                console.log(client.users.map(user => user.email))
                resolve(true)
            })
            console.log(global.gConfig.DISCORD_BOT_TOKEN)
            client.login(global.gConfig.DISCORD_BOT_TOKEN)
        })
    },
}
module.exports = DiscordService
