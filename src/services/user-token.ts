import fs from "node:fs";
import path from "node:path";

export async function saveToken(token: string): Promise<{
	status: number;
	message: string;
}> {
	const dataFolderPath = path.join(process.cwd(), "data");
	if (!fs.existsSync(dataFolderPath)) fs.mkdirSync(dataFolderPath);

	const dataFilePath = path.join(dataFolderPath, "user.json");
	if (!fs.existsSync(dataFilePath)) fs.writeFileSync(dataFilePath, "{}");

	try {
		fs.writeFileSync(dataFilePath, JSON.stringify({ fcmToken: token }));
		return { status: 200, message: "Token writen successfully" };
	} catch (err) {
		console.log("Error writing token", err);
		return { status: 500, message: "Error writing token" };
	}
}
