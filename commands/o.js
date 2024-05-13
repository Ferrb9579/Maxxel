const discord = require('discord.js')
const fs = require('fs-extra')
const express = require('express')
const osu = require('node-os-utils');
const moment = require('moment');
const Database = require('odb.json')
const db = new Database('./Data.json')

module.exports = {
    info: {
        name: ''
    },
    aliases: [],
    run: async function (client, message, args) {
        console.log(db.get('Fanisus'))
    }
}