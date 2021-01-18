import {Command} from "discord-akairo";
import { GuildMember } from "discord.js";
import {Message} from "discord.js";
import {Repository} from "typeorm";
import { Balance } from "../../models/Balance";
import BalanceManager from "../../structures/economy/BalanceManager";

export default class DeleteUserBalanceCommand extends Command {
    public constructor() {
        super("deleteuserbalance", {
            aliases: ["deleteuserbalance", "dltusrbal"],
            category: "Owner Commands",
            description: {
                content: "Deletes all economy related things for a user",
                usage: "deleteuserbalance",
                examples: [
                    "deleteuserbalance"
                ]
            },
            ratelimit: 1,
            ownerOnly: true,
            args: [
                {
                    id: "member",
                    type: "member",
                    prompt: {
                        start: (msg: Message) => `${msg.author}, you did not enter a user!`,
                        retry: (msg: Message) => `${msg.author}, you must provide a valid user!`
                    }
                }
            ]
        });
    }

    public async exec(message: Message, {member}: {member: GuildMember}): Promise<void> {
        const balanceRepo: Repository<Balance> = this.client.db.getRepository(Balance);
        BalanceManager.exist(balanceRepo, member);
        balanceRepo.delete((await balanceRepo.findOne({user: member.id})).id);
        message.util.send(`Economy data for ${member.nickname} has been cleared!`);
    }
}