import axios from "axios";
import { CronJob } from "cron";

// Run Cron Job Every 14 Minutes
const job = new CronJob(
  "*/14 * * * *", // Runs every 14 minutes
  async () => {
    // Task to be executed
    try {
      const response = await axios.get(
        "https://node-express-sqlite-api-completed.onrender.com/"
      );
      console.log("Cron Job executed successfully:", response.data);
    } catch (error) {
      console.error("Error executing Cron Job:", error);
    }
  }
);

export default job;
