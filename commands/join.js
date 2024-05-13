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


        let voiceChannel = message.member.voice.channel
        if (args[0]) {
            voiceChannel = await client.channels.fetch(args[0])
            if (!Constants.VoiceBasedChannelTypes.includes(voiceChannel?.type)) {
                return message.channel.send(`${client.emotes.error} | ${args[0]} is not a valid voice channel!`)
            }
        }
        if (!voiceChannel) {
            return message.channel.send(
                `${client.emotes.error} | You must be in a voice channel or enter a voice channel id!`
            )
        }
        client.distube.voices.join(voiceChannel)
        
    }
}