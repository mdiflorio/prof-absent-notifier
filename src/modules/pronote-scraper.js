const $ = require("cheerio");

const puppeteer = require("puppeteer");

async function pronote_scraper() {
  const { PRONOTE_SCHOOL, PRONOTE_USER, PRONOTE_PASS } = process.env;
  const PRONOTE_URL = `https://${PRONOTE_SCHOOL}.index-education.net/pronote/eleve.html?login=true`;

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 720 });
  await page.goto(PRONOTE_URL, { waitUntil: "networkidle0" }); // wait until page load

  // Login user
  await page.type("#id_53", PRONOTE_USER);
  await page.type("#id_54", PRONOTE_PASS);
  const wait = new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  await Promise.all([
    page.click("#id_43"),
    page.waitForNavigation({ waitUntil: "networkidle0" }),
    wait
  ]);
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
      absence.push({ subject, note });
    });

  return absence;
}

module.exports = pronote_scraper;
