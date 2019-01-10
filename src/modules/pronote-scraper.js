const $ = require("cheerio");

const puppeteer = require("puppeteer");

async function pronote_scraper() {
  const { PRONOTE_SCHOOL, PRONOTE_USER, PRONOTE_PASS } = process.env;
  const PRONOTE_URL = `https://${PRONOTE_SCHOOL}.index-education.net/pronote/eleve.html?fd=1&login=true`;

  const browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser', headless: true });
  const page = await browser.newPage();
  await page.goto(PRONOTE_URL, { waitUntil: "networkidle0" }); // wait until page load

  // Login user
  await page.type("#id_53", PRONOTE_USER);
  await page.type("#id_54", PRONOTE_PASS);

  await page.waitForSelector("#id_43");
  await Promise.all([page.click("#id_43")]);

  await page.waitForSelector(".EmploiDuTemps_Element");

  // Get page HTML
  let bodyHTML = await page.evaluate(() => document.body.innerHTML);

  let absence = [];

  const timetableAbsenceText = await $(".EmploiDuTemps_Element", bodyHTML)
    .find("div")
    .filter(function() {
      return this.attribs.style.match(/red/gm);
    })
    .each(function(i, elem) {
      const subject = $(this)
        .closest("tr")
        .next()
        .find("div")
        .first()
        .text();

      const note = $(this).text();

      // Make sure entries are not empty.
      if (note !== "" && subject !== "") {
        absence.push({ subject, note });
      }
    });

  await browser.close();

  return absence;
}

module.exports = { pronote_scraper };
