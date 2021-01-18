import {Command} from "discord-akairo";
import {Message, GuildMember} from "discord.js";
import {Repository} from "typeorm";
import {Balance} from "../../models/Balance";
import BalanceManager from "../../structures/economy/BalanceManager";

export default class BalanceCommand extends Command {
    public constructor() {
        super("balance", {
            aliases: ["balance","bal"],
            category: "Public Commands",
            description: {
                content: "Check the balance of a user",
                usage: "balance <member>",
                examples: [
                    "balance",
                    "balance @Host#0001"
                ]
            },
            ratelimit: 3,
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
            `${member.nickname} has ${((await BalanceManager.getUser(balanceRepo, member)).bal).toLocaleString('en-us')}GH₵.`
            );
    }
}