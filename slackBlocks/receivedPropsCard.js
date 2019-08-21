const propsReceivedCard = (sender, props) => {
  return [
  	{
  		"type": "section",
  		"text": {
  			"type": "mrkdwn",
  			"text": `Congratulations! You have received a Props from ${sender}`
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
