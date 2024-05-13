const discord = require('discord.js')
const fs = require('fs-extra')
const express = require('express')
const osu = require('node-os-utils');
const moment = require('moment');


module.exports = {
    info: {
        name: ''
    },
    aliases: ["userinfo", "useri", "ui", "uinfo"],
    run: async function (client, message, args) {
        if (message.mentions.members.size <= 0) {
            mu = message.member.user
            m = message.member
            const embed = new discord.MessageEmbed()
                .setTitle(`User Information for \`\`\`${mu.username}\`\`\` \`\`\`${mu.id}\`\`\``)
                .addField("Username", `\`\`\`${mu.username}\`\`\``)
                .addField("Nickname", `\`\`\`${m.nickname}\`\`\``)
                .addField("User ID", `\`\`\`${m.id}\`\`\``)
                .addField("Account Created On", `\`\`\`${mu.createdAt}\`\`\``)
                .addField("Joined Server On", `\`\`\`${m.joinedAt}\`\`\``)
                .setThumbnail(mu.avatarURL())
                .setImage(mu.avatarURL({ size: 4096 }))
            let msg = await message.channel.send({ embeds: [embed] })
            const filter = (reaction, user) => {
                return reaction.emoji.name === '❌' && user.id === message.author.id;
            }
            const collectormsg = msg.createReactionCollector({ filter, time: 30000 })

            await msg.react(`❌`)
            await message.react(`❌`)
            collectormsg.once('collect', async (reaction, user) => {
                collectormsg.stop()
                await msg.reactions.removeAll()
                if (msg.deletable) await msg.delete()

            })
            collectormsg.once('end', () => {
                msg.reactions.removeAll()
            })
        }
        else {
            message.mentions.members.forEach(async m => {
                mu = message.mentions.users.get(m.id)
                const embed = new discord.MessageEmbed()
                    .setTitle(`User Information for \`\`\`${mu.username}\`\`\` \`\`\`${mu.id}\`\`\``)
                    .addField("Username", `\`\`\`${mu.username}\`\`\``)
                    .addField("Nickname", `\`\`\`${m.nickname}\`\`\``)
                    .addField("User ID", `\`\`\`${m.id}\`\`\``)
                    .addField("Account Created On", `\`\`\`${mu.createdAt}\`\`\``)
                    .addField("Joined Server On", `\`\`\`${m.joinedAt}\`\`\``)
                    .setThumbnail(mu.avatarURL())
                    .setImage(mu.avatarURL({ size: 4096 }))
                let msg = await message.channel.send({ embeds: [embed] })
                const filter = (reaction, user) => {
                    return reaction.emoji.name === '❌' && user.id === message.author.id;
                }
                const collectormsg = msg.createReactionCollector({ filter, time: 30000 })

                await msg.react(`❌`)
                await message.react(`❌`)
                collectormsg.once('collect', async (reaction, user) => {
                    collectormsg.stop()
                    await msg.reactions.removeAll()
                    if (msg.deletable) await msg.delete()

                })
                collectormsg.once('end', () => {
                    msg.reactions.removeAll()
                })

            })
        }
        const filter = (reaction, user) => {
            return reaction.emoji.name === '❌' && user.id === message.author.id;
        }
        const collectormessage = message.createReactionCollector({ filter, time: 30000 })
        collectormessage.once('collect', async (reaction, user) => {
            collectormessage.stop()
            await message.reactions.removeAll()
            if (message.deletable) await message.delete()
        })
        collectormessage.once('end', () => {
            message.reactions.removeAll()
        })
    }
}
