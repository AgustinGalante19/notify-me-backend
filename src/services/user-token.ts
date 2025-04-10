import type Response from "../types/Response";
import { sql } from "@vercel/postgres";

export async function saveToken(token: string): Promise<Response> {
	try {
		await sql`update notifyme_user set token = ${token} where id = 1`;
		return { status: 200, message: "Token writen successfully" };
	} catch (err) {
		console.log("Error writing token", err);
		return { status: 500, message: "Error writing token" };
	}
}

export async function getToken(): Promise<Response> {
	try {
		const { rows } = await sql`select token from notifyme_user`;
		const fcmToken = rows[0].token;

		return { status: 200, message: fcmToken };
	} catch (err) {
		console.log("Error reading token", err);
		return { status: 500, message: "Unexpected error reading token" };
	}
}
