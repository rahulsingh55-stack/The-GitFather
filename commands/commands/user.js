const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "user",

  execute(message) {
    const embed = new EmbedBuilder()
      .setTitle("👤 User Info")
      .addFields(
        {
          name: "Username",
          value: message.author.username
        },
        {
          name: "ID",
          value: message.author.id
        }
      )
      .setThumbnail(
        message.author.displayAvatarURL()
      )
      .setColor("Red");

    message.reply({ embeds: [embed] });
  }
};
