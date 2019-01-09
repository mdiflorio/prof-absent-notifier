require("dotenv").config();
const { pronote_scraper } = require("./modules/pronote-scraper");
const { sendSlackAlert } = require("./modules/notifications");

 pronote_scraper().then(data => {
  if (data.length > 0) {
    sendSlackAlert(data);
  }
});



