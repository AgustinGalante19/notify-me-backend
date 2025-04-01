import { CronJob } from "cron";
import { Expo, type ExpoPushMessage } from "expo-server-sdk";
import type Subscription from "../types/Subscription";
import { getSubscriptions } from "./subscriptions";
import getTomorrowDay from "../utils/getTomorrowDay";

const USER_EXPO_PUSH_TOKEN = process.env.USER_EXPO_PUSH_TOKEN ?? "";

const expo = new Expo({});

export async function sendNotifications(subs: Subscription[]) {
	const messages: ExpoPushMessage[] = subs.map((sub) => ({
		to: USER_EXPO_PUSH_TOKEN,
		sound: "default",
		body: `Hola! No olvides que mañana se hará el cobro de la suscripción de ${sub.name}.`,
		data: { subscriptionId: sub.id },
	}));

	const chunks = expo.chunkPushNotifications(messages);
	for (const chunk of chunks) {
		try {
			const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
			console.log("Notificaciones enviadas:", ticketChunk);
		} catch (error) {
			console.error("Error enviando notificaciones:", error);
		}
	}
}

export const NotifyMeJob = new CronJob(
	"0 12 * * *",
	async () => {
		const subscriptions = await getSubscriptions({ day: getTomorrowDay() });
		if (subscriptions.length > 0) {
			sendNotifications(subscriptions);
		}
	},
	null,
	false,
	"America/Buenos_Aires",
);
