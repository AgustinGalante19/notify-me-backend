import { Router } from "express";
import {
	addSubscription,
	deleteSubscription,
	editSubscription,
	getSubscriptions,
} from "../../services/subscriptions";

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

		this.router.post("/", async (req, res) => {
			const { name, amount, icon, id, charge_day, wallet_target } = req.body;
			const response = await addSubscription({
				amount,
				charge_day,
				icon,
				id,
				name,
				wallet_target,
			});
			res.json(response);
		});

		this.router.put("/:id", async (req, res) => {
			const { name, amount, icon, charge_day, wallet_target } = req.body;
			const response = await editSubscription({
				amount,
				charge_day,
				icon,
				id: Number(req.params.id),
				name,
				wallet_target,
			});
			res.json(response);
		});

		this.router.delete("/:id", async (req, res) => {
			const response = await deleteSubscription(Number(req.params.id));
			res.json({ status: 200, rows: response.rowCount });
		});
	}
}

const subscriptionsRouter = new SubscriptionsRoutes().router;

export default subscriptionsRouter;
