const axios = require("axios");

async function sendSlackAlert(data) {
  let slackMessage = "";

  for (let i in data) {
    slackMessage += `${data[i].subject}: ${data[i].note}\n`;
  }

  axios.post(process.env.SLACK_WEBHOOK, { text: slackMessage }).catch(err => {
    console.log(("Error", err));
  });
}

module.exports = {
  sendSlackAlert
};
