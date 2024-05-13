const discord = require('discord.js')
const fs = require('fs-extra')
const express = require('express')
const osu = require('node-os-utils');
const moment = require('moment');


module.exports = {
    info: {
        name: 'Poll Command',
    },
    aliases: [],
    run: async function (client, message, args) {
        
        const c = await message.guild.channels.fetch()
        message.channel.sendTyping()
        let chholder = []
        c.forEach(gc => {
            if (gc.type == 'GUILD_NEWS' || gc.type == 'GUILD_TEXT') {
                chholder.push({
                    label: gc.name,
                    value: gc.id,
                    description: gc.id
                })
            }
        })
        const row = new discord.MessageActionRow().addComponents(
            new discord.MessageSelectMenu()
                .setCustomId("pollchannel")
                .setPlaceholder("Select Channel")
                .addOptions(chholder)
        )
        let msg = await message.channel.send({ embeds: [new discord.MessageEmbed().setTitle("Selections Made")], components: [row] })
        const filter = (interaction) => interaction.customId == 'pollchannel' && interaction.user.id == message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 60000 });
        collector.on('collect', async i => {
            let g = await client.guilds.fetch(message.guild.id)
            let pollchannel = await g.channels.fetch(i.values[0])
            i.deferUpdate()
            msg.edit({ embeds: [new discord.MessageEmbed().setTitle("Selections Made").addField("Selected Poll Channel", pollchannel.name, true).setFooter("Send poll message")] })
            const filtermsg = m => m.author.id == message.author.id;
            let msgcollector = new discord.MessageCollector(message.channel, { filter: filtermsg, time: 180000 })
            msgcollector.on('collect', async m => {
                let pollmessage = m.content
                let pollembed = new discord.MessageEmbed().setDescription(pollmessage)
                let msgsent = await message.channel.send({ embeds: [pollembed] })
                await msgsent.react('👍')
                await msgsent.react('👎')
                if (msg.deletable) await msg.delete()
                if (message.deletable) await message.delete()
                if (m.deletable) await m.delete()
                collector.stop()
                msgcollector.stop()
                chholder = []
            })
            msgcollector.once('end', () => {
                message.channel.send({ embeds: [new discord.MessageEmbed().setTitle("Timed out").setDescription("Start from first")] })
            })
        });
    
    }
}