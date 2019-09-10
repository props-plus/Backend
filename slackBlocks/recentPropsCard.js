const recentPropsCard = (user, props) => {

  console.log(props);

  const propsList = props.map(prop => ({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `${prop.msg} ${prop.sender}`
    }
  }));

  return propsList;
}

module.exports = recentPropsCard;
