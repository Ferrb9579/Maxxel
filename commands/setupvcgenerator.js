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


        const setup = await message.guild.channels.create("Voice-Control", {
            type: 'text'
        })
        const setupvoice = await message.guild.channels.create("VC Generator", {
            type: 'voice'
        })
        db.set(`vcgeneratortext`, setup.id)
        db.push(`vcgenerator`, setupvoice.id)
        const msgid = await setup.send('O')
        db.set(`vcgeneratortextmsg`, msgid.id)
        const msg = await client.guilds.cache.get(config.SERVERID).channels.cache.get(db.get(`vcgeneratortext`)).messages.cache.get(db.get(`vcgeneratortextmsg`))
        if (!msg) return
        const filter = (reaction, user) => {
            return reaction.emoji.name === '1️⃣' && user.id !== config.BOTID;
        }
        msg.react('1️⃣')
        const collector = msg.createReactionCollector(filter)
        collector.on('collect', (reaction, user) => {
            msg.edit('1')
            reaction.users.remove(user.id)
        });
        const filter1 = (reaction, user) => {
            return reaction.emoji.name === '2️⃣' && user.id !== config.BOTID;
        }
        msg.react('2️⃣')
        const collector2 = msg.createReactionCollector(filter1)
        collector2.on('collect', (reaction, user) => {
            msg.edit('2')
            reaction.users.remove(user.id)
        });
        const filter2 = (reaction, user) => {
            return reaction.emoji.name === '3️⃣' && user.id !== config.BOTID;
        }
        msg.react('3️⃣')
        const collector3 = msg.createReactionCollector(filter2)
        collector3.on('collect', (reaction, user) => {
            msg.edit('3')
            reaction.users.remove(user.id)
        });
        const filter3 = (reaction, user) => {
            return reaction.emoji.name === '4️⃣' && user.id !== config.BOTID;
        }
        msg.react('4️⃣')
        const collector4 = msg.createReactionCollector(filter3)
        collector4.on('collect', (reaction, user) => {
            msg.edit('4')
            reaction.users.remove(user.id)
        });
    

    }
}