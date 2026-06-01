// 👑 The GitFather Discord Bot
// npm install discord.js dotenv

require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

const prefix = "gf!";

client.once("ready", () => {
  console.log(`👑 Logged in as ${client.user.tag}`);

  client.user.setActivity("Ruling GitHub Mafia 👑", {
    type: 0
  });
});

// 🎉 Welcome Message
client.on("guildMemberAdd", member => {
  const channel = member.guild.channels.cache.find(
    ch => ch.name === "welcome"
  );

  if (!channel) return;

  const embed = new EmbedBuilder()
    .setTitle("🔥 Welcome to The GitFather")
    .setDescription(
      `👑 Welcome ${member} to the Developer Mafia!\n\n💻 Read rules and enjoy the server.`
    )
    .setThumbnail(member.user.displayAvatarURL())
    .setColor("Red");

  channel.send({ embeds: [embed] });
});

// ⚡ Commands
client.on("messageCreate", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // 🏓 Ping
  if (command === "ping") {
    message.reply("🏓 Pong!");
  }

  // 👤 User Info
  if (command === "user") {
    const embed = new EmbedBuilder()
      .setTitle("👤 User Profile")
      .addFields(
        { name: "Username", value: message.author.username },
        { name: "ID", value: message.author.id }
      )
      .setThumbnail(message.author.displayAvatarURL())
      .setColor("DarkRed");

    message.reply({ embeds: [embed] });
  }

  // 📢 Announcement
  if (command === "announce") {
    const text = args.join(" ");

    if (!text) {
      return message.reply("❌ Please provide announcement text.");
    }

    const embed = new EmbedBuilder()
      .setTitle("📢 Server Announcement")
      .setDescription(text)
      .setColor("Red")
      .setFooter({
        text: "Powered by The GitFather"
      });

    message.channel.send({ embeds: [embed] });
  }

  // 🧹 Clear Messages
  if (command === "clear") {
    if (!message.member.permissions.has("ManageMessages")) {
      return message.reply("❌ You don't have permission.");
    }

    const amount = parseInt(args[0]);

    if (!amount) {
      return message.reply("❌ Enter amount.");
    }

    await message.channel.bulkDelete(amount, true);

    message.channel.send(`🧹 Deleted ${amount} messages.`);
  }

  // 🤖 Help Command
  if (command === "help") {
    const embed = new EmbedBuilder()
      .setTitle("👑 GitFather Commands")
      .setDescription(`
🔥 **Basic**
gf!ping
gf!user
gf!help

📢 **Admin**
gf!announce
gf!clear

⚡ More features coming soon...
      `)
      .setColor("DarkRed");

    message.reply({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
