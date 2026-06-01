const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "help",

  execute(message) {
    const embed = new EmbedBuilder()
      .setTitle("👑 GitFather Commands")
      .setDescription(`
🏓 gf!ping
👤 gf!user
📢 gf!announce
🧹 gf!clear
💻 gf!github
      `)
      .setColor("DarkRed");

    message.reply({ embeds: [embed] });
  }
};
