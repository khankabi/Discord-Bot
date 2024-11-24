const { Client, GatewayIntentBits } = require("discord.js")
const { connectionDb } = require("./connection")
const shortid = require("shortid")
const express = require("express")
const URL = require("./models/url")
const app = express()
const port = 8080

// connection to db
const url = "mongodb://localhost:27017/user"
connectionDb(url)
    .then(() => {
        console.log("Connection successful...")
    })
    .catch((err) => {
        console.log("Connection failed...")
    })

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    const User = message.author.username
    let msg = message.content.toLowerCase()



    // Url Shortner
    if (msg.startsWith("short")) {

        const url = message.content.split("short ")[1];
        if (!url) return message.channel.send("Please provide a url to shorten");

        const sId = shortid()
        await URL.create({
            shortId: sId,
            redirectUrl: url,
            createdBy: User
        })
        return message.reply({
            content: "New short url " + `http://localhost:8080/url/${sId}`
        })
    }
    console.log(message.content);
    console.log(message);
    message.channel.send("i am here")
})

client.on("interactionCreate", interaction => {
    interaction.reply("Pong !!!")
})

app.get("/", (req, res) => {
    res.send("Hello World")
})
app.get("/url/:shortId",async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId})
    if (!entry) {
        return res.status(404).json({ error: "URL not found" });
    }
    else {
        return res.redirect(entry.redirectUrl)
    }
})
client.login("MTMwOTE4ODExNTYyOTM0MjczMA.GHsG67.ojEWbI_LzdXEEd70wdZ4LLr9V5sj3OtNq_gd3U")
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
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
