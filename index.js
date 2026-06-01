require("dotenv").config();

const fs = require("fs");
const path = require("path");

const {
  Client,
  Collection,
  GatewayIntentBits
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log(`👑 Logged in as ${client.user.tag}`);

  client.user.setActivity("Developer Mafia 👑");
});

client.on("messageCreate", message => {
  if (message.author.bot) return;

  const prefix = "gf!";

  if (!message.content.startsWith(prefix)) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);

  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);

  if (!command) return;

  command.execute(message, args);
});

client.on("guildMemberAdd", member => {
  const channel = member.guild.channels.cache.find(
    c => c.name === "welcome"
  );

  if (!channel) return;

  channel.send(
    `🔥 Welcome ${member} to The GitFather 👑`
  );
});

client.login(process.env.TOKEN);
