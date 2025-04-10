import { Router } from "express";
import { getSubscriptions } from "../../services/subscriptions";
import getTomorrowDay from "../../utils/getTomorrowDay";
import {
	sendNotifications,
	sendNotificationsFirebase,
} from "../../services/notificacions";
import { getToken, saveToken } from "../../services/user-token";

class NotificationsRoutes {
	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get("/check", async (_, res) => {
			const subscriptions = await getSubscriptions({ day: getTomorrowDay() });
			if (subscriptions.length > 0) {
				await sendNotifications(subscriptions);
			}
			res.send({ status: 200, totalSubs: subscriptions.length });
		});

		this.router.get("/firebase", async (_, res) => {
			try {
				const { message: fcmToken } = await getToken();
				const subscriptions = await getSubscriptions({ day: getTomorrowDay() });
				if (subscriptions.length > 0) {
					await sendNotificationsFirebase(fcmToken);
				}
				res.send({ status: 200, message: subscriptions.length });
			} catch (err) {
				console.log(err);
				res.status(500).send("error");
			}
		});

		this.router.post("/check-token", async (req, res) => {
			const { fcmToken } = req.body;
			if (!fcmToken) {
				res.status(400).json({ status: 400, message: "fcmToken is required" });
				return;
			}

			const { status, message } = await saveToken(fcmToken);

			res.status(status).json({ status, message });
		});

		this.router.get("/get-token", async (_, res) => {
			const { status, message } = await getToken();

			res.status(status).json({ status, message });
		});
	}
}

const notificationsRouter = new NotificationsRoutes().router;

export default notificationsRouter;
