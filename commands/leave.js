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

        client.distube.voices.leave(message)

    }
}