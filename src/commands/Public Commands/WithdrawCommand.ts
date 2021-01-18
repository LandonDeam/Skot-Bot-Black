import {Command} from "discord-akairo";
import {MessageEmbed} from "discord.js";
import {Message, GuildMember} from "discord.js";
import {Repository} from "typeorm";
import {Balance} from "../../models/Balance";
import BalanceManager from "../../structures/economy/BalanceManager";
import ms from "ms";

export default class WithdrawCommand extends Command {
    public constructor() {
        super("withdraw", {
            aliases: ["withdraw","wd"],
            category: "Public Commands",
            description: {
                content: "Withdraws funds from the bank",
                usage: "withdraw",
                examples: [
                    "withdraw"
                ]
            },
            ratelimit: 3
        });
    }

    public async exec(message: Message): Promise<Message> {
        const balanceRepo: Repository<Balance> = this.client.db.getRepository(Balance);
        let user = await BalanceManager.getUser(balanceRepo, message.member);

        if(Number(user.bank) <= 0) {
            return message.util.reply(`You have no money in the bank to withdraw!`);
        }
        else if(Number(user.timeDeposited) + Number(user.time) > Date.now()) {
            const ends: number = Number(user.timeDeposited);
            return  message.util.send(new MessageEmbed()
            .setAuthor(`Bank | ${message.member.user.tag}`)
            .setColor("#f44336")
            .setDescription(`Will be available for withdrawal in *${ms((Number(user.timeDeposited) + Number(user.time))-(Date.now()))}.*\n`+
                            `Amount deposited: **${(user.bank).toLocaleString('en-us')}GH₵**`)
            .setFooter(`Deposited`)
            .setTimestamp(ends)
            );
        } //Math.pow(2.5, (Math.random() / 12) * Math.log10((Number(user.time) / 86400000) + 1))
        let multiplier: number = 1 + (0.2 * Math.log(6 * (Math.random() * 0.33 + 0.67) * (Number(user.time) / 86400000) + 100) + 0.079);
        return message.util.send(new MessageEmbed()
        .setAuthor(`Withdrawal | ${message.member.user.tag}`)
        .setColor("#4caf50")
        .setDescription(`Withdrawn: *${(await BalanceManager.withdraw(balanceRepo, message.member, multiplier)).toLocaleString('en-us')}GH₵*\n`+
                        `New Balance: ${await (await BalanceManager.getUser(balanceRepo, message.member)).bal}GH₵`)
        );
    }
}