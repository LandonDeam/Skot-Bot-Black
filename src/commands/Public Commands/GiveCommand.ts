import {Command} from "discord-akairo";
import {Message, MessageEmbed, GuildMember} from "discord.js";
import {Repository} from "typeorm";
import {Balance} from "../../models/Balance";
import BalanceManager from "../../structures/economy/BalanceManager";

export default class GiveCommand extends Command {
    public constructor() {
        super("give", {
            aliases: ["give","g"],
            category: "Public Commands",
            description: {
                content: "Give specified amount of currency to another member",
                usage: "give [member] [money]",
                examples: [
                    "give @Host#0001 200",
                    "give host 1337"
                ]
            },
            ratelimit: 5,
            args: [
                {
                    id: "member",
                    type: "member"
                },
                {
                    id: "money",
                    type: "number"
                }
            ]
        });
    }

    public async exec(message: Message, {member, money}: {member: GuildMember, money: number}): Promise<Message> {
        const balanceRepo: Repository<Balance> = this.client.db.getRepository(Balance);
        let receiver: Balance = await BalanceManager.getUser(balanceRepo, member);
        let sender: Balance = await BalanceManager.getUser(balanceRepo, message.member);

        if(money <= Number(sender.bal)) { //check if user has enough money
            await BalanceManager.add(balanceRepo, message.member, -money);
            await BalanceManager.add(balanceRepo, member, money);
            return message.util.send(new MessageEmbed()
                .setAuthor(`Western Union`)
                .setDescription(`${message.member.nickname} successfully gave ${member.nickname} ${(money).toLocaleString('en-us')}GH₵!`)
                .setColor("4caf50")
            );
        }
        return message.util.reply(new MessageEmbed() //user not have enough money >:(
            .setAuthor(`Western Union`)
            .setDescription(`**Failed to send ${(money).toLocaleString('en-us')}GH₵ to ${member.nickname}, insufficient funds in user account.**\n`+
                            `You have: ${(sender.bal).toLocaleString('en-us')}GH₵`)
            .setColor("f44336")
        );
    }
}