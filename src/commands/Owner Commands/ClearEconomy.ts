import {Command} from "discord-akairo";
import {Message} from "discord.js";
import {Repository} from "typeorm";
import { Balance } from "../../models/Balance";
import BalanceManager from "../../structures/economy/BalanceManager";

export default class ClearEconomyCommand extends Command {
    public constructor() {
        super("cleareconomy", {
            aliases: ["cleareconomy", "clreco"],
            category: "Owner Commands",
            description: {
                content: "!!!Resets the entire economy!!!",
                usage: "cleareconomy",
                examples: [
                    "cleareconomy"
                ]
            },
            ratelimit: 1,
            ownerOnly: true
        });
    }

    public async exec(message: Message): Promise<void> {
        const balanceRepo: Repository<Balance> = this.client.db.getRepository(Balance);
        balanceRepo.clear();
        message.util.send(`Economy has been reset!`);
    }
}