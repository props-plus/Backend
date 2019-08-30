const propsReceivedCard = (sender, receiver, props, message) => {
  return [
  	{
  		"type": "section",
  		"text": {
  			"type": "mrkdwn",
  			"text": `Congratulations, ${receiver}! You have received a Props from ${sender}`
  		}
  	},
    {
  		"type": "section",
  		"text": {
  			"type": "mrkdwn",
  			"text": `${message}`
  		}
  	},
  	{
  		"type": "section",
  		"text": {
  			"type": "mrkdwn",
  			"text": `${props}`
  		}
  	}
  ]
};

module.exports = propsReceivedCard;
