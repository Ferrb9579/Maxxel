const discord = require('discord.js')
const fs = require('fs-extra')
const express = require('express')
const osu = require('node-os-utils');
const moment = require('moment');


module.exports = {
    info: {
        name: ''
    },
    aliases: ['p'],
    run: async function (client, message, args) {

        const string = args.join(" ")
        if (!string) return message.channel.send(`${client.emotes.error} | Please enter a song url or query to search.`)
        if (!message.member.voice.channel) return console.log('Join Voice channel')

        client.distube.play(message, string)
    }
}