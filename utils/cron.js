import axios from "axios";
import { CronJob } from "cron";

// Run Cron Job Every 5 Minutes
const job = new CronJob(
  "*/5 * * * *", // Runs every 5  minutes
  async () => {
    // Task to be executed
    try {
      const response = await axios.get("http://localhost:3600"); // Replace with your API endpoint
      console.log("Cron Job executed successfully:", response.data);
    } catch (error) {
      console.error("Error executing Cron Job:", error);
    }
  }
);

export default job;
