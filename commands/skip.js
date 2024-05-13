const discord = require('discord.js')
const fs = require('fs-extra')
const express = require('express')
const osu = require('node-os-utils');
const moment = require('moment');


module.exports = {
    info: {
        name: ''
    },
    aliases: [],
    run: async function (client, message, args) {

        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
        try {
            const song = await queue.skip()
            message.channel.send(`${client.emotes.success} | Skipped! Now playing:\n${song.name}`)
        } catch (e) {
            message.channel.send(`${client.emotes.error} | ${e}`)
        }

    }
}