// Use fetch API to make HTTP requests
import { CronJob } from "cron";

// Run Cron Job Every 1 Minute
const job = new CronJob(
  "*/1 * * * *", // Runs every 1 minute
  async () => {
    // Task to be executed
    try {
      const response = await fetch(
        "https://node-express-sqlite-api-completed.onrender.com/"
      );
      const data = await response.json();
      console.log("Cron Job executed successfully:", data);
    } catch (error) {
      console.error("Error executing Cron Job:", error);
    }
  }
);

export default job;
