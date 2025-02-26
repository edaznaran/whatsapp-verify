import chalk from "chalk";
const log = console.log;
import { launch } from "puppeteer";

(async () => {
	log(
		chalk.blue("Opening a browser window, please scan / login on Whatsapp")
	);
	log(chalk.yellow("Once you're logged in, you can close the page or tab"));
	const browser = await launch({
		headless: false,
		userDataDir: "./profileData",
	});
	const page = await browser.newPage();
	await page.goto("https://web.whatsapp.com");
	browser.on("targetdestroyed", async () => {
		log(chalk.yellow("Page Closed. If logged in you can use the check command"));
		browser.close();
	});
})();
