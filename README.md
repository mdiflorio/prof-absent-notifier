# Prof Absent Notifier

prof-absent-notifier scrapes ProNote to check if any Professor is absent. If so, it will then send a notification to your Slack Channel through webhooks. It has been optimised to run on a Raspberry Pi.

## Requirements

- Node JS
- Chome installed (Use this [link](http://code-flow-hjbello.blogspot.com/2018/11/make-puppeteer-work-with-raspbian-vers.html) if you want to run the app on a Raspberry Pi)
- Slack workspace with webhook setup on a channel to send the notifications.

## Installation

Clone the app and run to download dependencies.

```bash
npm install
# or
yarn install
```

Create .env file in the main directory with this format

```bash
PRONOTE_SCHOOL = "your pronote school number"
PRONOTE_USER = "Your Pronote username"
PRONOTE_PASS = "Your Pronote password"
SLACK_WEBHOOK = "slack webhook url"
```

## Usage

To run the app once, simply use

```bash
yarn start
# or
npm run start
```

I prefer to run the app on a Raspberry Pi 3+ and use a cron job to make to run every morning at 6 am. To learn more about cron jobs have a look [here](http://sklinuxtip.blogspot.com/2012/12/15-awesome-cron-job-examples.html).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
