import Mineflayer from "mineflayer";
import { sleep, getRandom } from "./utils";
import fs from "fs";

const CONFIG = JSON.parse(fs.readFileSync("/workspace/config.json", "utf8"));
let bot: any;

const disconnect = () => {
    clearInterval(loop);
    bot?.quit?.();
    bot?.end?.();
};

const reconnect = async () => {
    console.log(`🔄 Trying to reconnect in ${CONFIG.action.retryDelay / 1000} seconds...`);
    await sleep(CONFIG.action.retryDelay);
    startBot();
};

const startBot = () => {
    console.log("🔄 Trying to connect to the server...");

    bot = Mineflayer.createBot({
        host: "Chilaxcraft.aternos.me",
        port: 19750,
        username: "AYMEN_AFK",
        auth: CONFIG.account.auth
    });

    bot.on("login", () => console.log("✅ Successfully logged in!"));
    bot.on("error", (err) => console.error("❌ Connection error:", err));
    bot.on("end", () => {
        console.log("🔴 Disconnected from server.");
        reconnect();
    });

    bot.on("kicked", (reason) => console.log(`⚠️ Kicked from server: ${reason}`));
    bot.on("death", () => console.log("💀 Bot died, respawning..."));
};

// بدء البوت
startBot();

export default startBot;
