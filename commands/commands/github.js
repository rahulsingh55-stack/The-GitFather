const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "github",

  execute(message) {
    const embed = new EmbedBuilder()
      .setTitle("👑 GitFather GitHub")
      .setDescription(
        "[Visit GitHub](https://github.com)"
      )
      .setColor("Black");

    message.reply({ embeds: [embed] });
  }
};
