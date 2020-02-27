const axios = require('axios')
const Discord = require('discord.js')

const logger = require('../../misc/logger')

const client = new Discord.Client()
const DiscordService = {
    initialize: () => {
        return new Promise((resolve, reject) => {
            client.once('ready', () => {
                logger.info(client.users.map(user => user.email))
                resolve(true)
            })
            logger.info('Discord token', global.gConfig.DISCORD_BOT_TOKEN)
            client.login(global.gConfig.DISCORD_BOT_TOKEN)
        })
    },
}
module.exports = DiscordService
