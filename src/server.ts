import { notifyMeApiInstance } from "./api";
import { NotifyMeJob } from "./services/notificacions";

NotifyMeJob.start();
notifyMeApiInstance.start();
