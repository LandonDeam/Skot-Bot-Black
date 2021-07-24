import {Command} from "discord-akairo";
import {Message, GuildMember} from "discord.js";
import {Repository} from "typeorm";
import {Balance} from "../../models/Balance";
import BalanceManager from "../../structures/economy/BalanceManager";

export default class BalanceCommand extends Command {
    public constructor() {
        super("balance", {
            aliases: ["balance","bal"],
            category: "Economy Commands",
            description: {
                content: "Check the balance of a user",
                usage: "balance <member>",
                examples: [
                    "balance",
                    "balance @Host#0001"
                ]
            },
            ratelimit: 10,
            args: [
                {
                    id: "member",
                    type: "member",
                    default: (msg: Message) => msg.member
                }
            ]
        });
    }

    public async exec(message: Message, {member}: {member: GuildMember}): Promise<Message> {
        const balanceRepo: Repository<Balance> = this.client.db.getRepository(Balance);
        return message.util.send(
            `${(member.nickname !== null) ? member.nickname : member.displayName} has ${((await BalanceManager.getUser(balanceRepo, member)).bal).toLocaleString('en-us')}GH₵.`
            );
    }
}