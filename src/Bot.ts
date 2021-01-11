import {token, owners} from "./Config";
import BotClient from "./client/BotClient";
import {Intents} from "discord.js";

let intents: Intents = new Intents(Intents.NON_PRIVILEGED);
intents.add("GUILD_MEMBERS");
export const client: BotClient = new BotClient({token, owners});
client.start();