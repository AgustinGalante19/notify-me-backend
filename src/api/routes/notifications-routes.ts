import { Router } from "express";
import { getSubscriptions } from "@/services/subscriptions";
import { sendNotifications } from "@/services/notificacions";
import getTomorrowDay from "@/utils/getTomorrowDay";

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
			res.send({ status: 200, totalSubs: 0 });
		});
	}
}

const notificationsRouter = new NotificationsRoutes().router;

export default notificationsRouter;
