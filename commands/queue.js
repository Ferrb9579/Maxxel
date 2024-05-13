const discord = require('discord.js')
const fs = require('fs-extra')
const express = require('express')
const moment = require('moment');


module.exports = {
    info: {
        name: ''
    },
    aliases: [],
    run: async function (client, message, args) {


        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
        let currentPage = 0;
        const embeds = QueueEmbed(queue.songs);
        const queueEmbed = await message.channel.send({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]] });
        try {
            await queueEmbed.react("⬅️");
            await queueEmbed.react("⏹");
            await queueEmbed.react("➡️");
        } catch (error) {
            console.error(error)

        }
        const filter = (reaction, user) => ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) && message.member.id === user.id;
        const collector = await queueEmbed.createReactionCollector({filter, time: 60000});
        collector.on("collect", async (reaction, user) => {
            try {
                if (reaction.emoji.name === "➡️") {
                    if (currentPage < embeds.length - 1) {
                        currentPage++;
                        queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]] });
                    }
                } else if (reaction.emoji.name === "⬅️") {
                    if (currentPage !== 0) {
                        --currentPage;
                        queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]] });
                    }
                } else {
                    collector.stop();
                    reaction.message.reactions.removeAll();
                }
                await reaction.users.remove(message.author.id);
            } catch (error) {
                console.error(error)
            }
        })

        function QueueEmbed(queue) {
            let embeds = [];
            let k = 25;
            //defining each Pages
            for (let i = 0; i < queue.length; i += 25) {
                const current = queue.slice(i, k)
                let j = i;
                k += 25;
                const info = current.map((track) => `**${++j} -** [\`${track.name}\`](${track.url})`).join("\n")
                const embed = new discord.MessageEmbed()
                    .setTitle("Server Queue")
                    .setColor("#fffff0")
                    .setDescription(`**Current Song - [\`${queue[0].name}\`](${queue[0].url})**\n\n${info}`)
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                embeds.push(embed);
            }
            //returning the Embed
            return embeds

        }
    }
}
