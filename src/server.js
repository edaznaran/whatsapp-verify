import bodyParser from "body-parser";
import express from "express";
import checkNumber from "./utils/checkNumber.js";
import checkNumberBulk from "./utils/checkNumberBulk.js";

const app = express();
app.use(bodyParser.json());

// Utils

// Check Single Number
app.get("/checknumber", async (req, res) => {
	const { phoneNumber } = req.query;
	const exists = await checkNumber(phoneNumber);
	return res.json({ phoneNumber, exists });
});

// Check Multiple Numbers
app.post("/checknumber", async (req, res) => {
	const { phoneNumbers } = req.body;
	const result = await checkNumberBulk(phoneNumbers);
	return res.json({ phoneNumbers, result });
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`Started Server on port ${process.env.PORT || 3000}`);
});
