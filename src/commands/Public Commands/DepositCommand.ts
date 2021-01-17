import {Command} from "discord-akairo";
import {Message, GuildMember} from "discord.js";
import {MongoEntityManager, Repository} from "typeorm";
import {Balance} from "../../models/Balance";
import BalanceManager from "../../structures/economy/BalanceManager";
import ms from "ms";

export default class DepositCommand extends Command {
    public constructor() {
        super("deposit", {
            aliases: ["deposit"],
            category: "Public Commands",
            description: {
                content: "Deposits specified amount of money in the bank for a period of time to collect interest.",
                usage: "deposit [money] [time]",
                examples: [
                    "deposit 500 5d",
                    "deposit 1000 10w"
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: "money",
                    type: "number",
                    prompt: {
                        start: (msg: Message) => `${msg.author}, please enter a valid number to deposit into the bank.`,
                        retry: (msg: Message) => `${msg.author}, please enter a valid number to deposit into the bank.`
                    }
                },
                {
                    id: "timeStr",
                    type: "string"
                }
            ]
        });
    }

    public async exec(message: Message, {money, timeStr}: {money: number, timeStr: string}): Promise<void> {
        try {
            let time: number = ms(timeStr);
            const balanceRepo: Repository<Balance> = this.client.db.getRepository(Balance);
            let user = await BalanceManager.getUser(balanceRepo, message.member);
            if(user.bal >= money) {
                BalanceManager.deposit(balanceRepo, message.member, money, time);
                let str: string = ms(time, {long: true});
                message.util.send(`${message.member.nickname} deposited ${money} for the next ${str}.`)
            }
            else {
                message.util.reply(`Error, insufficient funds!`);
            }
        }
        catch {
            message.util.reply(`Error! invalid time was entered!`);
        }
        
    }
}