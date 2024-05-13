const discord = require('discord.js')
const fs = require('fs')
const express = require('express')
const osu = require('node-os-utils');
const Distube = require('distube')

const Database = require('odb.json')
const db = new Database.Database('./Database', {
    deep: true,
    file: "Database.json",
    backup: {
        enabled: true,
        interval: 1000 * 60 * 60 * 24,
        name: "Database-backup.json",
        path: "./Database-backup"
    }
})

const replymsg = JSON.parse(require('./replies.json'))
const app = express()
const config = require('./config.json')
const { SpotifyPlugin } = require("@distube/spotify")
const { SoundCloudPlugin } = require("@distube/soundcloud")
let hours = 0
let minutes = 0
let seconds = 0
setInterval(() => {
    try {
        osu.cpu.usage().then(info => {
            global.CpuUsage = info
        })
        global.CpuAverage = osu.cpu.average()
        global.CpuCores = osu.cpu.count()
        global.CpuModel = osu.cpu.model()
        osu.mem.info().then(info => {
            global.MemoryTotal = info.totalMemMb
            global.MemoryUsed = info.usedMemMb
            global
        })
        global.MemoryScriptUsage = process.memoryUsage().heapUsed / 1024 / 1024;
        seconds += 1
        if (seconds == 60) {
            minutes += 1
            seconds = 0
        }
        if (minutes == 60) {
            hours += 1
            minutes = 0
        }
        global.FinalData = `CPU Usage: ${global.CpuUsage}\nCPU Model: ${global.CpuModel}\nNumber of Cores: ${global.CpuCores}\nTotal Memory: ${global.MemoryTotal}\nMemory Usage: ${global.MemoryUsed}\nScript Memory Usage: ${Math.round(global.MemoryScriptUsage * 1000) / 1000}\nFree Memory: ${global.MemoryFree}\nUptime: ${hours}:${minutes}:${seconds}`
        fs.writeFileSync('./Stats.txt', global.FinalData, { encoding: 'utf-8' })
    } catch (e) {
        console.log(e)
    }

}, 1000)
const client = new discord.Client({ intents: [discord.Intents.FLAGS.DIRECT_MESSAGES, discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING, discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_BANS, discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, discord.Intents.FLAGS.GUILD_INTEGRATIONS, discord.Intents.FLAGS.GUILD_INVITES, discord.Intents.FLAGS.GUILD_MEMBERS, discord.Intents.FLAGS.GUILD_MESSAGES, discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, discord.Intents.FLAGS.GUILD_MESSAGE_TYPING, discord.Intents.FLAGS.GUILD_PRESENCES, discord.Intents.FLAGS.GUILD_VOICE_STATES, discord.Intents.FLAGS.GUILD_WEBHOOKS] })
const configu = {
    PREFIX: "&",
    TOKEN: process.env.TOKEN, // Update this
    OWNERID: '710847002342064188', // Update this
    BOTID: '747823783842414663', // Update this
    SERVERID: '710847318886449152' // Update this
}

client.commands = new discord.Collection()
client.aliases = new discord.Collection()
client.emotes = config.emoji

client.distube = new Distube.default(client, {
    emptyCooldown: 300,
    savePreviousSongs: true,
    updateYouTubeDL: false,
    leaveOnEmpty: false,
    plugins: [new SpotifyPlugin(), new SoundCloudPlugin()]
})

fs.readdir(`./commands/`, (error, files) => {
    if (error) { return console.log("Error while trying to get the commmands."); };
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`);
        const commandName = file.split(".")[0];

        client.commands.set(commandName, command);

        if (command.aliases) {
            command.aliases.forEach(alias => {
                client.aliases.set(alias, command);
            });
        };
        console.log(`Loading Command '${commandName}'`);
    });
});
fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loading event ${eventName}`);
        client.on(eventName, event.bind(null, client));
    });
});


client.setMaxListeners(0)
process.setMaxListeners(0)

client.on('messageCreate', async (message) => {
    if (message.author.id == client.user.id) return
    const prefix = "!"
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        if (command == "t") {
            let CATEGORY = await message.guild.channels.create('Maxxel Musics', { type: 'GUILD_CATEGORY' })
            let CHANNEL = await message.guild.channels.create('song-request', { parent: CATEGORY, topic: 'Type in the url or the song name' })
            let VOICE = await message.guild.channels.create('Music', { type: 'GUILD_VOICE', parent: CATEGORY, bitrate: 8000 })
            db.set(`music_request_channel-${message.guild.id}-text`, CHANNEL.id)
            db.set(`music_request_channel-${message.guild.id}-voice`, VOICE.id)
            let Help = await CHANNEL.send({ embeds: [new discord.MessageEmbed().setTitle(`Maxxel Music | Request | Guide`).setDescription(`Enter the song name or URL to play a song\n\n\`\`\`You can also type !command <Parameters>\`\`\`\n**Commands**\n\`\`\`play\`\`\`, \`\`\`stop\`\`\`, \`\`\`seek\`\`\`, \`\`\`skip\`\`\`, \`\`\`queue\`\`\``)] })
            let Queue = await CHANNEL.send({ embeds: [new discord.MessageEmbed().setTitle('Maxxel Music | Music Queue').setDescription(`Empty\nJoin a voice channel and queue songs by name or url in here.`)] })
            let Status = await CHANNEL.send({ embeds: [new discord.MessageEmbed().setTitle('Maxxel Music | Currently no song is playing!').setDescription(`Join a voice channel and enter a song name or url to play.`)] })
            db.set(`music_request_channel_message-${message.guild.id}-help`, Help.id)
            db.set(`music_request_channel_message-${message.guild.id}-queue`, Queue.id)
            db.set(`music_request_channel_message-${message.guild.id}-status`, Status.id)
            await Status.react('⏪')
            await Status.react('⏩')
            await Status.react('⏯')
            await Status.react('⏮')
            await Status.react('⏭')
            await Status.react('🔁')
            await Status.react('🔉')
            await Status.react('🔊')
            await Status.react('🔇')
            await Status.react('🔄')
            await Status.react('♾️')
            await Status.react('🔀')
            await Status.react('📑')
            await Status.react('⭐')

        }
        if (command == "ban") {
            if (!args[0]) return message.reply("Blank")
            message.channel.send(replymsg.ban[Math.floor(Math.random() * replymsg.ban.length)])
            if (message.member.permissions.has('BAN_MEMBERS') || message.member.permissions.has('ADMINISTRATOR')) {
                if (message.guild.me.permissions.has('ADMINISTRATOR') || message.guild.me.permissions.has('BAN_MEMBERS')) {
                    if (message.mentions.members.size >= 2 && message.mentions.members.size <= 10) {

                        let embed = new discord.MessageEmbed()
                            .setTitle(replymsg.ban[Math.floor(Math.random() * replymsg.ban.length)])
                            .setDescription('sf')
                            .setFooter('Are you sure you wanna do this?')
                        let msg = await message.channel.send({ embeds: [embed] })
                        const filter = (reaction, user) => {
                            return reaction.emoji.name === '👌' && user.id === message.author.id;
                        }
                        const collectormsg = msg.createReactionCollector({ filter, time: 30000 })

                        await msg.react('👌')
                        collectormsg.once('collect', async (reaction, user) => {
                            collectormsg.stop()
                            message.mentions.members.forEach(m => {
                                if (m.bannable) m.ban()
                                else message.channel.send(`Unable to ban ${m}`)
                            })
                        })
                        collectormsg.once('end', () => {
                            msg.reactions.removeAll()
                        })
                    }
                    if (message.mentions.members.size < 2) {
                        if (!args[1]) return
                        let embed = new discord.MessageEmbed()
                            .setTitle(replymsg.ban[Math.floor(Math.random() * replymsg.ban.length)])
                            .setDescription('ad')
                            .setFooter('Are you sure you wanna do this?')
                        let msg = await message.channel.send({ embeds: [embed] })
                        const filter = (reaction, user) => {
                            return reaction.emoji.name === '👌' && user.id === message.author.id;
                        }
                        const collectormsg = msg.createReactionCollector({ filter, time: 30000 })

                        await msg.react('👌')
                        collectormsg.once('collect', async (reaction, user) => {
                            collectormsg.stop()
                            message.mentions.members.forEach(m => {
                                if (m.bannable) m.ban()
                                else message.channel.send(`Unable to ban ${m}`)
                            })
                        })
                        collectormsg.once('end', () => {
                            msg.reactions.removeAll()
                        })
                    }
                }
                else message.channel.send("I ain't got enough power man")
            }
            else message.channel.send("Well your a junior")
        }
        // Owner
    } catch {
        console.error()
    }
})

app.get('/', (req, res) => {
    res.send(`<body bgcolor="black" text="white" style="font-size:80%;">${fs.readFileSync("./Stats.txt", { encoding: "utf-8" }).split('\n').join('<br>')}</body>`)
})
/*client.on('voiceStateUpdate', async (oldState, newState) => {
    if (GENERATOR === "disable") return console.log(`Disabled`)
    const vcuser = await client.users.fetch(newState.id);
    const vcmember = newState.guild.member(vcuser);
    if (!newState.member.voice.channel) { // Leave VC
        if (!db.get(`vcgenerator`).includes(oldState.channel.id)) {
            if (!db.get(`vcblacklist`).includes(oldState.channel.id)) {
                if (oldState.channel.members.size === 0) {
                    oldState.channel.delete()
                    db.delete(`vc${db.get(`${oldState.channel.id}`)}`)
                    db.delete(`${oldState.channel.id}`)
                }
                else return
            }
            else return
        }
    }
    else if (!oldState.channel && db.get(`vcgenerator`).includes(newState.channel.id)) { // Join VC

        const channel = await newState.guild.channels.create(`${vcuser.tag}'s Vc`, {
            type: 'voice',
            parent: newState.channel.parent,
            userLimit: 10,
            bitrate: 8000,
            permissionOverwrites: [
                {
                    id: oldState.member.id,
                    allow: ['MANAGE_CHANNELS', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS']
                }
            ]
        })
        await vcmember.voice.setChannel(channel);
        await db.set(`vc${newState.member.id}`, channel.id);
        await db.set(`${channel.id}`, newState.member.id);
    }
    else { // Switch VC
        if (newState.channel && !oldState.channel) return
        if (!db.get(`vcgenerator`).includes(oldState.channel.id)) {
            if (!db.get(`vcblacklist`).includes(oldState.channel.id)) {
                if (oldState.channel.members.size === 0) {
                    oldState.channel.delete()
                    db.delete(`vc${db.get(`${oldState.channel.id}`)}`)
                    db.delete(`${oldState.channel.id}`)
                }
                else return
            }
            else return
        }
    }
})
*/


const status = queue =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? "All Queue" : "This Song") : "Off"
    }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("playSong", (queue, song) => {
        //db.set(`music_request_channel-${message.guild.id}-text`, CHANNEL.id)
        //db.set(`music_request_channel_message-${message.guild.id}-help`, Help.id)
        //db.set(`music_request_channel_message-${message.guild.id}-queue`, Queue.id)
        //db.set(`music_request_channel_message-${message.guild.id}-status`, Status.id)
        console.log(queue.textChannel.id)
        queue.textChannel.send(
            `${client.emotes.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user.id
            }\n${status(queue)}`
        )
    })
    .on("addSong", (queue, song) => {
        queue.textChannel.send(
            `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user.id}`
        )
    })
    .on("addList", (queue, playlist) => {
        queue.textChannel.send(
            `${client.emotes.success} | Added \`${playlist.name}\` playlist (${playlist.songs.length
            } songs) to queue\n${status(queue)}`
        )
    })
    .on("searchNoResult", (message, query) => {
        message.channel.send("No result found for: " + query)
    })
    .on("error", (channel, e) => {
        channel.send(`${client.emotes.error} | An error encountered: ${e.toString().slice(0, 1974)}`)
        console.error(e)
    })
    .on("empty", channel => channel.send("Voice channel is empty! Leaving the channel..."))
    .on("searchNoResult", message => message.channel.send(`${client.emotes.error} | No result found!`))
    .on("finish", queue => queue.textChannel.send("Finished!"))


app.listen(port)
/*
client.on('voiceStateUpdate', (oldState, newState) => {
    if (GENERATOR === "disable") return console.log(`Disabled`)
    const vcuser = await client.users.fetch(newState.id);
    const vcmember = newState.guild.members.fetch(vcuser)
    if (!newState.member.voice.channel) { // Leave VC
        if (!db.get(`vcgenerator`).includes(oldState.channel.id)) {
            if (!db.get(`vcblacklist`).includes(oldState.channel.id)) {
                if (oldState.channel.members.size === 0) {
                    oldState.channel.delete()
                    db.delete(`vc${db.get(`${oldState.channel.id}`)}`)
                    db.delete(`${oldState.channel.id}`)
                }
                else return
            }
            else return
        }
    }
    else if (!oldState.channel && db.get(`vcgenerator`).includes(newState.channel.id)) { // Join VC

        const channel = await newState.guild.channels.create(`${vcuser.tag}'s Vc`, {
            type: 'voice',
            parent: newState.channel.parent,
            userLimit: 10,
            bitrate: 8000,
            permissionOverwrites: [
                {
                    id: oldState.member.id,
                    allow: ['MANAGE_CHANNELS', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS']
                }
            ]
        })
        await vcmember.voice.setChannel(channel);
        await db.set(`vc${newState.member.id}`, channel.id);
        await db.set(`${channel.id}`, newState.member.id);
    }
    else { // Switch VC
        if (newState.channel && !oldState.channel) return
        if (!db.get(`vcgenerator`).includes(oldState.channel.id)) {
            if (!db.get(`vcblacklist`).includes(oldState.channel.id)) {
                if (oldState.channel.members.size === 0) {
                    oldState.channel.delete()
                    db.delete(`vc${db.get(`${oldState.channel.id}`)}`)
                    db.delete(`${oldState.channel.id}`)
                }
                else return
            }
            else return
        }
    }
})*/
client.login(process.env.TOKEN)
/*
process.on("unhandledRejection", (reason, promise) => {
    try {
        console.error("Unhandled Rejection at: ", promise, "reason: ", reason.stack || reason);
    } catch {
        console.error(reason);
    }
});*/


function QueueEmbed(queue) {
    console.log('incom')
    let embeds = [];
    let k = 10;
    //defining each Pages
    for (let i = 0; i < queue.length; i += 10) {
        const current = queue.slice(i, k)
        let j = i;
        k += 10;
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