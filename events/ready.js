const moment = require('moment');
module.exports = async (client) => {
    console.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);
    console.log("Becoming a hard coded stuff")
    client.user.setActivity("Hi, Um I don't have enough inspiration", { type: 'STREAMING' })
    console.log(moment().utc().format('D/M/YYYY/h/m/s'))
};
