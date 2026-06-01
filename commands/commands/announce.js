const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "announce",

  execute(message, args) {
    const text = args.join(" ");

    if (!text) {
      return message.reply(
        "❌ Please provide announcement text."
      );
    }

    const embed = new EmbedBuilder()
      .setTitle("📢 Announcement")
      .setDescription(text)
      .setColor("DarkRed");

    message.channel.send({
      embeds: [embed]
    });
  }
};
