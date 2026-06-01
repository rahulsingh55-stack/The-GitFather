module.exports = {
  name: "clear",

  async execute(message, args) {
    if (
      !message.member.permissions.has(
        "ManageMessages"
      )
    ) {
      return message.reply(
        "❌ No permission."
      );
    }

    const amount = parseInt(args[0]);

    if (!amount) {
      return message.reply(
        "❌ Enter amount."
      );
    }

    await message.channel.bulkDelete(
      amount,
      true
    );

    message.channel.send(
      `🧹 Deleted ${amount} messages.`
    );
  }
};
