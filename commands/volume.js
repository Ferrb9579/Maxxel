const discord = require('discord.js')
const fs = require('fs-extra')
const express = require('express')
const osu = require('node-os-utils');
const moment = require('moment');


module.exports = {
    info: {
        name: ''
    },
    aliases: ['v', 'vol'],
    run: async function (client, message, args) {

        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
        const volume = parseInt(args[0])
        if (isNaN(volume)) return message.channel.send(`${client.emotes.error} | Please enter a valid number!`)
        queue.setVolume(volume)
        message.channel.send(`${client.emotes.success} | Volume set to \`${volume}\``)

    }
}