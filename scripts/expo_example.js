import { Expo } from 'expo-server-sdk';

// Create a new Expo SDK client
const expo = new Expo();

// Create the messages that you want to send to clients
const messages = [];
const somePushTokens = ['ExponentPushToken[7cutanEUk2uh-TYR5q1dWI]'];
for (const pushToken of somePushTokens) {
  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
    continue;
  }

  // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
  messages.push({
    to: pushToken,
    sound: 'default',
    body: 'This is a test notification from server',
    data: { withSome: 'data' },
  });
}

const chunks = expo.chunkPushNotifications(messages);
const tickets = [];
(async () => {
  for (const chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log({ ticketChunk });
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error(error);
    }
  }
})();

const receiptIds = [];
for (const ticket of tickets) {
  if (ticket.status === 'ok') {
    receiptIds.push(ticket.id);
  }
}

const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
(async () => {
  for (const chunk of receiptIdChunks) {
    try {
      const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
      console.log({ receipts });
      for (const receiptId in receipts) {
        const { status, message, details } = receipts[receiptId];
        if (status === 'ok') {
          console.log('ok');
        } else if (status === 'error') {
          console.error(
            `There was an error sending a notification: ${message}`
          );
          if (details || details.error) {
            console.error(`The error code is ${details.error}`);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
})();
