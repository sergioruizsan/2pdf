const express = require('express');
const router = express.Router();
const puppeteer = require("puppeteer");

/* POST 2pdf */
router.get('/', async (req, res)  => {

  const url = req.query.url
  const browser = await puppeteer.launch({
    headless: true
  });

  const webPage = await browser.newPage()

  await webPage.goto(url, {
    waitUntil: 'networkidle0'
  })

  const pdf = await webPage.pdf({
    printBackground: true,
    format: 'A4',
  })

  await browser.close()

  res.contentType('application/pdf')
  res.send(pdf)

});

module.exports = router;
