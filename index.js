const { Client, GatewayIntentBits } = require("discord.js")
require('dotenv').config()
// const axios = require('axios');

const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent ] });
client.on("messageCreate",message=>{
    if (message.author.bot) return ;
    let msg = message.content.toLowerCase()

    if(msg.startsWith("create")){
        const url = message.content.split("create ")[1];
        return message.reply({
            content:"Generating short url "+url
        })
    }
    console.log(message.content);
    console.log(message);
   
    message.reply({
        content:"hi from bot"
    })
})

client.on("interactionCreate",interaction=>{
    interaction.reply("Pong !!!")
})  
client.login(process.env.API_KEY)

// Message {
//   channelId: '1309182872032116788',
//   guildId: '1309182872032116786',
//   id: '1310187287421911070',
//   createdTimestamp: 1732443391424,
//   type: 0,
//   system: false,
//   content: 'hello',
//   author: User {
//     id: '1309180803900506195',
//     bot: false,
//     system: false,
//     flags: UserFlagsBitField { bitfield: 0 },
//     username: 'sonushaikh77',
//     globalName: 'Sonu_shaikh',
//     discriminator: '0',
//     avatar: 'dfca3b8c6849314db354d14d2526916f',
//     banner: undefined,
//     accentColor: undefined,
//     avatarDecoration: null,
//     avatarDecorationData: null
//   },
//   pinned: false,
//   tts: false,
//   nonce: '1310187281830641664',
//   embeds: [],
//   components: [],
//   attachments: Collection(0) [Map] {},
//   stickers: Collection(0) [Map] {},
//   position: null,
//   roleSubscriptionData: null,
//   resolved: null,
//   editedTimestamp: null,
//   reactions: ReactionManager { message: [Circular *1] },
//   mentions: MessageMentions {
//     everyone: false,
//     users: Collection(0) [Map] {},
//     roles: Collection(0) [Map] {},
//     _members: null,
//     _channels: null,
//     _parsedUsers: null,
//     crosspostedChannels: Collection(0) [Map] {},
//     repliedUser: null
//   },
//   webhookId: null,
//   groupActivityApplication: null,
//   applicationId: null,
//   activity: null,
//   flags: MessageFlagsBitField { bitfield: 0 },
//   reference: null,
//   interactionMetadata: null,
//   interaction: null,
//   poll: null,
//   call: null
// }
