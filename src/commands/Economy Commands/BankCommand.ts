import {Command} from "discord-akairo";
import { MessageEmbed } from "discord.js";
import {Message, GuildMember} from "discord.js";
import {Repository} from "typeorm";
import {Balance} from "../../models/Balance";
import BalanceManager from "../../structures/economy/BalanceManager";
import ms from "ms";

export default class BankCommand extends Command {
    public constructor() {
        super("bank", {
            aliases: ["bank"],
            category: "Economy Commands",
            description: {
                content: "Check the bank status of a member",
                usage: "bank <member>",
                examples: [
                    "bank",
                    "bank @Host#0001"
                ]
            },
            ratelimit: 5,
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
        const user: Balance = await BalanceManager.getUser(balanceRepo, member);

        if(Number(user.bank) <= 0) return message.util.send(`${member.displayName} has nothing banked at the moment.`); // returns if no money in bank

        if(Number(user.timeDeposited) + Number(user.time) <= Date.now()) { // if the money in the member's bank is available for withdraw
            const ended: number = Number(user.timeDeposited) + Number(user.time);
            return message.util.send(new MessageEmbed()
            .setAuthor(`Bank | ${member.user.tag}`)
            .setColor("#4caf50")
            .setDescription(`**Money is available for withdrawal!**\n`+
                            `Originally deposited: ${(user.bank).toLocaleString('en-us')}GH₵`)
            .setFooter(`Available since`)
            .setTimestamp(ended)
            );
        }
        else{
            const ends: number = Number(user.timeDeposited);
            let str: string = ms(Number(user.timeDeposited)+Number(user.time)-Date.now(), {long: true});
            return  message.util.send(new MessageEmbed()
            .setAuthor(`Bank | ${member.user.tag}`)
            .setColor("#f44336")
            .setDescription(`Will be available for withdrawal in *${str}.*\n`+
                            `Amount deposited: **${(user.bank).toLocaleString('en-us')}GH₵**`)
            .setFooter(`Deposited`)
            .setTimestamp(ends)
            );
        }
    }
}