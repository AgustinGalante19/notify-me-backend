import { Expo, type ExpoPushMessage } from "expo-server-sdk";
import { getMessaging } from "firebase-admin/messaging";
import type Subscription from "../types/Subscription";

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

export async function sendNotificationsFirebase(fcmToken: string) {
	const message = {
		data: {
			title: "test from nodejs",
			time: "2:45",
		},
		token: fcmToken,
	};

	getMessaging()
		.send(message)
		.then((response) => {
			console.log("Successfully sent message:");
			return response;
		});
}
