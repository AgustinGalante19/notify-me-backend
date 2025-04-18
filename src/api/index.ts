import express, { type Application } from "express";
import cors from "cors";
import morgan from "morgan";
import subscriptionsRouter from "./routes/subscriptions-routes";
import path from "node:path";
import notificationsRouter from "./routes/notifications-routes";
import { applicationDefault, initializeApp } from "firebase-admin/app";

const PORT = process.env.PORT ?? 5000;
class NotifyMeApi {
	private app: Application;

	constructor() {
		this.app = express();

		this.config();
		this.routes();
	}

	private config() {
		this.app.use(cors());
		this.app.use(morgan("dev"));
		this.app.use(express.json());
		this.app.use(
			"/static",
			express.static(path.join(process.cwd(), "/src", "/api", "public")),
		);

		initializeApp({
			credential: applicationDefault(),
			projectId: "notify-me-app-b4bc3",
		});
	}

	private routes() {
		this.app.get("/", (_, res) => {
			res.send("hi");
		});

		this.app.use("/subscriptions", subscriptionsRouter);
		this.app.use("/notifications", notificationsRouter);
	}

	start() {
		this.app.listen(PORT, () => {
			console.log(path.join(process.cwd(), "/src", "/api", "public"));
			console.log(`Server running: http://localhost:${PORT}`);
		});
	}
}

export const notifyMeApiInstance = new NotifyMeApi();
