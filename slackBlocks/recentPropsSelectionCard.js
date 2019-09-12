const recentPropsSelectionCard = () => {
  return [{
      type: "section",
      text: {
        type: "plain_text",
        text: "Select the recent props you would like to view",
        emoji: true
      }
    },
    {
      type: "divider"
    },
    {
      type: "actions",
      elements: [{
          type: "button",
          text: {
            type: "plain_text",
            emoji: true,
            text: "Given"
          },
          style: "primary",
          value: "given"
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            emoji: true,
            text: "Received"
          },
          style: "primary",
          value: "received"
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            emoji: true,
            text: "Cancel"
          },
          style: "danger",
          value: "reccancel"
        }
      ]
    }
  ]
}

module.exports = recentPropsSelectionCard;
