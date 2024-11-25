const { Client, GatewayIntentBits } = require("discord.js")
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyB2sAdFm8wgAFLgwHzKYmHOIf8OxstaxZM");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const { connectionDb } = require("./connection")
const fetch = require('node-fetch');
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
    // gemini ai
    else if (msg.startsWith("nexus")) {
        const prompt = message.content.split("nexus ")[1];
        const result = await model.generateContent(prompt + " in short");
        const response = result.response.text()
        message.reply({
            content: response
        })
    }
    //ip api
    else // Check if the message starts with "ip"
        if (message.content.startsWith("ip")) {
            try {
                const ip = message.content.split("ip ")[1]; // Extract the IP address

                if (!ip) {
                    return message.channel.send("IP address is not provided.");
                }

                message.channel.send("Fetching IP details...");

                // Fetch IP details
                const response = await fetch(`http://ip-api.com/json/${ip}`);
                if (!response.ok) {
                    return message.channel.send(`Error: ${response.status} - ${response.statusText}`);
                }

                const details = await response.json(); // Parse the JSON response

                // Reply with the IP details
                message.reply({
                    content: `**IP Details:**\n` +
                        `- **IP Address**: ${details.query}\n` +
                        `- **City**: ${details.city || "N/A"}\n` +
                        `- **Region**: ${details.regionName || "N/A"}\n` +
                        `- **Country**: ${details.country || "N/A"}\n` +
                        `- **Postal Code**: ${details.zip || "N/A"}\n` +
                        `- **Latitude**: ${details.lat || "N/A"}\n` +
                        `- **Latitude**: ${details.lat || "N/A"}\n` +
                        `- **ISP**: ${details.isp || "N/A"}`
                });
            } catch (err) {
                console.error("Error:", err.message);
                message.channel.send("An error occurred while fetching IP details.");
            }
        }

        // all response
        else {
            const result = await model.generateContent(msg);
            const response = result.response.text()
            message.reply({
                content: response
            })
        }
    message.channel.send("I got It " + User + " !!!")

})

client.on("interactionCreate", interaction => {
    interaction.reply("Pong !!!")
})

app.get("/", (req, res) => {
    res.send("Hello World")
})
app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId })
    if (!entry) {
        return res.status(404).send("URL not found");
    }
    else {
        return res.redirect(entry.redirectUrl)
    }
})
client.login(API_TOKEN)
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})