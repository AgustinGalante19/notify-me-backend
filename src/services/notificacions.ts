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

export async function sendNotificationsFirebase(/* add params */) {
	// This registration token comes from the client FCM SDKs.
	const registrationToken =
		"fNJXR6_MQR9EOqe4g2BbmZ:APA91bG7wRH2eH0gT_9hTWA8yJ9O3-R0M6MySH7pBewJMzzbWL6ES4iZ1-kAMnTJogZcYj18u1yqfCMXeexZcX9dxCxcUhAkIunNfSt8Po84ILuWGVWaR58";

	const message = {
		data: {
			title: "test from nodejs",
			time: "2:45",
		},
		token: registrationToken,
	};

	getMessaging()
		.send(message)
		.then((response) => {
			console.log("Successfully sent message:");
			return response;
		});
}
