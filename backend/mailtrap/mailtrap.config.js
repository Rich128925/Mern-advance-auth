import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });

export const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
  testInboxId: Number(process.env.MAILTRAP_INBOX_ID),
});

export const sender = {
  email: "hello@example.com",
  name: "Boluwatife",
};
