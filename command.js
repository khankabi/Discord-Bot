const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
];
const rest = new REST({ version: '10' }).setToken("MTMwOTE4ODExNTYyOTM0MjczMA.GYHNR0.XnAylExFRQXSZiguLd7XVrKXIq-LDn39T2BXws");

(async () => {

    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands("1309188115629342730"), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();