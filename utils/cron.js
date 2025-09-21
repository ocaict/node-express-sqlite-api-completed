import axios from "axios";
import { CronJob } from "cron";

// Run Cron Job Every 2 Minutes
const job = new CronJob(
  "*/2 * * * *", // Runs every 2 minutes
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
