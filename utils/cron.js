// Use fetch API to make HTTP requests
import { CronJob } from "cron";

// Run Cron Job Every 14 Minutes
const job = new CronJob(
  "*/14 * * * *", // Runs every 14 minutes
  async () => {
    // Task to be executed
    const baseUrl = process.env.RENDER_URL || "http://localhost:3600";
    try {
      const response = await fetch(`${baseUrl}/`);
      const data = await response.json();
      console.log("Cron Job executed successfully:", data);
    } catch (error) {
      console.error("Error executing Cron Job:", error);
    }
  }
);

export default job;
