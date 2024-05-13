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
        if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
        let mode = null
        switch (args[0]) {
            case "off":
                mode = 0
                break
            case "song":
                mode = 1
                break
            case "queue":
                mode = 2
                break
        }
        mode = queue.setRepeatMode(mode)
        mode = mode ? (mode === 2 ? "Repeat queue" : "Repeat song") : "Off"
        message.channel.send(`${client.emotes.repeat} | Set repeat mode to \`${mode}\``)

    }
}