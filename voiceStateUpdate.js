let GENERATOR = "enable"
const Database = require('odb.json')
const db = new Database('./Data.json')
module.exports = async (client, oldState, newState) => {
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

};
