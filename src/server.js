require("dotenv").config();
const pronote_scraper = require("./modules/pronote-scraper");

pronote_scraper().then(data => {
  console.log(data);
});
