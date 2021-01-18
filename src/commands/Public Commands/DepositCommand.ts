import {Command} from "discord-akairo";
import {Message} from "discord.js";
import {Repository} from "typeorm";
import {Balance} from "../../models/Balance";
import BalanceManager from "../../structures/economy/BalanceManager";
import ms from "ms";
import { MessageEmbed } from "discord.js";

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
            const user = await BalanceManager.getUser(balanceRepo, message.member);
            if(Number(user.bal) >= money && time > 0 && money >= 1 && Number(user.bank == 0)) {

                BalanceManager.deposit(balanceRepo, message.member, money, time);
                let str: string = ms(time, {long: true});
                await message.util.send(new MessageEmbed()
                    .setAuthor(`Bank | ${message.member.user.tag}`)
                    .setColor("#f44336")
                    .setDescription(`Will be available for withdrawal in *${str}.*\n`+
                                    `Amount deposited: **${(money).toLocaleString('en-us')}GH₵**`)
                    .setFooter(`Available`)
                    .setTimestamp(Date.now() + time)
                );
            }
            else if(time <= 0) {
                message.util.reply(`Error, time must be greater than 0!`);
            }
            else if(time < 1) {
                message.util.reply(`Error, you must put at least 1GH₵!`);
            }
            else if(Number(user.bank) != 0) {
                message.util.reply(`Error! You can only have one bank deposit at a time!`);
            }
            else {
                message.util.reply(`Error, insufficient funds!`);
            }
        }
        catch {
            message.util.reply(`error! Invalid time was entered!`);
        }
        
    }
}