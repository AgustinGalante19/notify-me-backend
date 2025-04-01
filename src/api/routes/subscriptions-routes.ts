import { Router } from "express";
import { getSubscriptions } from "@/services/subscriptions";

class SubscriptionsRoutes {
	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get("/", async (_, res) => {
			const subscriptions = await getSubscriptions({});
			res.json(subscriptions);
		});
	}
}

const subscriptionsRouter = new SubscriptionsRoutes().router;

export default subscriptionsRouter;
