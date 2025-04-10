import fs from "node:fs";
import path from "node:path";
import type Response from "../types/Response";

const dataFolderPath = path.join(process.cwd(), "data");
const dataFilePath = path.join(dataFolderPath, "user.json");

export async function saveToken(token: string): Promise<Response> {
	if (!fs.existsSync(dataFolderPath)) fs.mkdirSync(dataFolderPath);

	if (!fs.existsSync(dataFilePath)) fs.writeFileSync(dataFilePath, "{}");

	try {
		fs.writeFileSync(dataFilePath, JSON.stringify({ fcmToken: token }));
		return { status: 200, message: "Token writen successfully" };
	} catch (err) {
		console.log("Error writing token", err);
		return { status: 500, message: "Error writing token" };
	}
}

export async function getToken(): Promise<Response> {
	try {
		const file = fs.readFileSync(dataFilePath);

		const { fcmToken } = JSON.parse(file.toString());

		return { status: 200, message: fcmToken };
	} catch (err) {
		console.log("Error reading token", err);
		return { status: 500, message: "Unexpected error reading token" };
	}
}
