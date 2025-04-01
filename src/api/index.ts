import express, { type Application } from "express";
import cors from "cors";
import morgan from "morgan";
import subscriptionsRouter from "./routes/subscriptions-routes";

const PORT = process.env.PORT ?? 5000;

class NotifyMeApi {
	private app: Application;

	constructor() {
		this.app = express();
		this.routes();
		this.config();
	}

	private config() {
		this.app.use(cors());
		this.app.use(morgan("dev"));
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.json());
	}

	private routes() {
		this.app.get("/", (_, res) => {
			res.send("hi");
		});

		this.app.use("/subscriptions", subscriptionsRouter);
	}

	start() {
		this.app.listen(PORT, () => {
			console.log(`Server running: http://localhost:${PORT}`);
		});
	}
}

export const notifyMeApiInstance = new NotifyMeApi();
