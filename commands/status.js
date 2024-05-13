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
        let msg = await message.channel.send({ embeds: [new discord.MessageEmbed().setTitle("Fetching...")] })
        if (msg.createdTimestamp - message.createdTimestamp < 250) STATUSCOLOR = "GREEN"
        if (msg.createdTimestamp - message.createdTimestamp < 500) STATUSCOLOR = "YELLOW"
        if (msg.createdTimestamp - message.createdTimestamp < 750) STATUSCOLOR = "ORANGE"
        if (msg.createdTimestamp - message.createdTimestamp > 1000) STATUSCOLOR = "RED"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('ADMINISTRATOR')) ADMINISTRATORPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('ADMINISTRATOR')) ADMINISTRATORPERMISSION = "False"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('BAN_MEMBERS')) BANMEMBERSPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('BAN_MEMBERS')) BANMEMBERSPERMISSION = "False"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('KICK_MEMBERS')) KICKMEMBERSPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('KICK_MEMBERS')) KICKMEMBERSPERMISSION = "False"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('MANAGE_GUILD')) MANAGEGUILDPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('MANAGE_GUILD')) MANAGEGUILDPERMISSION = "False"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('MENTION_EVERYONE')) MENTIONEVERYONEPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('MENTION_EVERYONE')) MENTIONEVERYONEPERMISSION = "False"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('MANAGE_CHANNELS')) MANAGECHANNELSPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('MANAGE_CHANNELS')) MANAGECHANNELSPERMISSION = "False"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('MANAGE_ROLES')) MANAGEROLESPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('MANAGE_ROLES')) MANAGEROLESPERMISSION = "False"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('MANAGE_MESSAGES')) MANAGEMESSAGESPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('MANAGE_MESSAGES')) MANAGEMESSAGESPERMISSION = "False"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('MANAGE_EMOJIS')) MANAGEEMOJISPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('MANAGE_EMOJIS')) MANAGEEMOJISPERMISSION = "False"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('MANAGE_WEBHOOKS')) MANAGEWEBHOOKSPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('MANAGE_WEBHOOKS')) MANAGEWEBHOOKSPERMISSION = "False"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('MANAGE_NICKNAMES')) MANAGENICKNAMESPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('MANAGE_NICKNAMES')) MANAGENICKNAMESPERMISSION = "False"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('MUTE_MEMBERS')) MUTEMEMBERSPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('MUTE_MEMBERS')) MUTEMEMBERSPERMISSION = "False"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('DEAFEN_MEMBERS')) DEAFENMEMBERSPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('DEAFEN_MEMBERS')) DEAFENMEMBERSPERMISSION = "False"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('MOVE_MEMBERS')) MOVEMEMBERSPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('MOVE_MEMBERS')) MOVEMEMBERSPERMISSION = "False"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('CONNECT')) CONNECTPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('CONNECT')) CONNECTPERMISSION = "False"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('SPEAK')) SPEAKPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('SPEAK')) SPEAKPERMISSION = "False"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('STREAM')) STREAMPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('STREAM')) STREAMPERMISSION = "False"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('SEND_MESSAGES')) SENDMESSAGESPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('SEND_MESSAGES')) SENDMESSAGESPERMISSION = "False"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('SEND_TTS_MESSAGES')) SENDTTSMESSAGESPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('SEND_TTS_MESSAGES')) SENDTTSMESSAGESPERMISSION = "False"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('READ_MESSAGE_HISTORY')) READMESSAGEHISTORYPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('READ_MESSAGE_HISTORY')) READMESSAGEHISTORYPERMISSION = "False"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('VIEW_AUDIT_LOG')) VIEWAUDITLOGPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('VIEW_AUDIT_LOG')) VIEWAUDITLOGPERMISSION = "False"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('VIEW_GUILD_INSIGHTS')) VIEWGUILDINSIGHTSPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('VIEW_GUILD_INSIGHTS')) VIEWGUILDINSIGHTSPERMISSION = "False"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('ADD_REACTIONS')) ADDREACTIONSPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('ADD_REACTIONS')) ADDREACTIONSPERMISSION = "False"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('CREATE_INSTANT_INVITE')) CREATEINSTANTINVITEPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('CREATE_INSTANT_INVITE')) CREATEINSTANTINVITEPERMISSION = "False"
        if (client.guilds.cache.get(config.SERVERID).me.permissions.has('ATTACH_FILES')) ATTACHFILESPERMISSION = "True"
        if (!client.guilds.cache.get(config.SERVERID).me.permissions.has('ATTACH_FILES')) ATTACHFILESPERMISSION = "False"
        const status = new discord.MessageEmbed()
            .setTitle(`**Ping** = ${msg.createdTimestamp - message.createdTimestamp}`)
            .addField(`${client.user.username}`, `Made by <@${config.OWNERID}>`, true)
            .setDescription(`**PERMISSIONS** \n ADMINISTRATOR = ${ADMINISTRATORPERMISSION} \n BAN MEMBERS = ${BANMEMBERSPERMISSION} \n KICK MEMBERS = ${KICKMEMBERSPERMISSION} \n MANAGEGUILD = ${MANAGEGUILDPERMISSION} \n MENTIONEVERYONE = ${MENTIONEVERYONEPERMISSION} \n MANAGECHANNELS = ${MANAGECHANNELSPERMISSION} \n MANAGEROLES = ${MANAGEROLESPERMISSION} \n MANAGEMESSAGES = ${MANAGEMESSAGESPERMISSION} \n MANAGEEMOJIS = ${MANAGEEMOJISPERMISSION} \n MANAGEWEBHOOKS = ${MANAGEWEBHOOKSPERMISSION} \n MANAGENICKNAMES = ${MANAGENICKNAMESPERMISSION} \n MUTEMEMBERS = ${MUTEMEMBERSPERMISSION} \n DEAFENMEMBERS = ${DEAFENMEMBERSPERMISSION} \n MOVEMEMBERS = ${MOVEMEMBERSPERMISSION} \n CONNECT = ${CONNECTPERMISSION} \n SPEAK = ${SPEAKPERMISSION} \n STREAM = ${STREAMPERMISSION} \n SENDMESSAGES = ${SENDMESSAGESPERMISSION} \n SENDTTSMESSAGES = ${SENDTTSMESSAGESPERMISSION} \n READMESSAGEHISTORY =${READMESSAGEHISTORYPERMISSION} \n VIEWAUDITLOG = ${VIEWAUDITLOGPERMISSION} \n VIEWGUILDINSIGHTS = ${VIEWGUILDINSIGHTSPERMISSION} \n ADDREACTIONS = ${ADDREACTIONSPERMISSION} \n CREATEINSTANTINVITE = ${CREATEINSTANTINVITEPERMISSION} \n ATTACHFILES = ${ATTACHFILESPERMISSION} \n \n **SERVER INFO** \n Numbers of members **: :** ${message.guild.memberCount}`)
            .setColor(STATUSCOLOR)
        const hosting = new discord.MessageEmbed().setDescription(global.FinalData).setColor(STATUSCOLOR)
        await msg.edit({ embeds: [status, hosting] })
        const filter = (reaction, user) => {
            return reaction.emoji.name === '❌' && user.id === message.author.id;
        }
        const collector = msg.createReactionCollector({ filter, time: 30000 })
        await msg.react(`❌`)
        collector.once('collect', async (reaction, user) => {
            msg.reactions.removeAll()
            await msg.delete()
            await message.delete()
        })
        collector.once('end', () => {
            if (!msg.deletable) return
            msg.reactions.removeAll()
        })
    }
}