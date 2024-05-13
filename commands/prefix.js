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
        let prefix = await db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = config.PREFIX;
        if (!args[0]) {
            message.react('❌')
            message.reply(`Please provide a new prefix. Current prefix is ${prefix}`)
        }
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            message.react('❌')
            message.reply(`You don't have permission to change the prefix [ADMINISTRATOR]`)
        }
        if (args[1]) {
            message.react('❌')
            message.reply(`Prefix can't have spaces`)
        }
        db.set(`prefix_${message.guild.id}`, args[0])
        message.react('✅')
    }
}