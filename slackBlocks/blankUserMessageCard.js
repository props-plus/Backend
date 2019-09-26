const blackUserMessageCard = () => {
  return [
    {
      type: "divider"
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Welcome to Props Plus! You can send a props to a coworker like this!"
      }
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "`/props @john_smith Great job on the project!`"
      }
    },
    {
      type: "divider"
    }
  ]
}

module.exports = blackUserMessageCard
