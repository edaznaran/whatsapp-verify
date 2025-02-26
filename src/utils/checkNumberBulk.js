import { launch } from "puppeteer";

// To Make sure Mobile version of Whatsapp Web doesn't load, fixes headless issue
const USER_AGENT =
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36";

async function checkNumber(phoneNumber, browser) {
	const page = await browser.newPage();
	await page.setUserAgent(USER_AGENT);
	await page.setDefaultNavigationTimeout(0);
	await page.goto(
		`https://web.whatsapp.com/send?phone=${phoneNumber}&text&app_absent=0`,
		{ waitUntil: "networkidle0" }
	);
	await page.waitForNavigation({ waitUntil: "networkidle2" });
	// Wait for page load - added for cases where networkidle doesn't
	//await new Promise(r => setTimeout(r, 1000));
	const numberExists = (await page.$("#main")) !== null;

	await page.close();
	return { phoneNumber, exists: numberExists };
}

async function checkNumberBulk(phoneNumbers) {
	const browser = await launch({
		headless: true,
		userDataDir: "./profileData",
	});
	const results = [];

	try {
		const promises = phoneNumbers.map(phoneNumber =>
			checkNumber(phoneNumber, browser)
		);
		const resolvedResults = await Promise.all(promises);
		results.push(...resolvedResults);
	} catch (error) {
		console.error("Error checking numbers:", error);
	} finally {
		await browser.close();
	}

	return results;
}

export default checkNumberBulk;
