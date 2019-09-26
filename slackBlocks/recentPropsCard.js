const recentPropsCard = (value, props) => {

  switch (value) {
    case 'given':

      break;
    case 'received':

      break;
    case 'reccancel':
      return  [{
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Your request has been canceled.`
        }
      }]
      break;
  }

  const propsList = props.map(prop => ({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `You received ${prop.msg} from ${prop.sender}`
    }
  }));

  return propsList;
}

module.exports = recentPropsCard;
