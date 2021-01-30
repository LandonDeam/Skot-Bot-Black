import {Message, MessageEmbed} from "discord.js";
import {Command} from "discord-akairo";
import BalanceManager from "../../structures/economy/BalanceManager";
import {Balance} from "../../models/Balance";

export default class FlipCommand extends Command {
    public constructor() {
        super("flip", {
            aliases: ["flip","bet"],
            category: "Gambling Commands",
            description: {
                content: "50/50 chance to double your money, or lose it all",
                usage: "flip [money]",
                examples: [
                    "flip 500"
                ]
            },
            ratelimit: 5,
            args: [
                {
                    id: "money",
                    type: "number",
                    prompt: {
                        start: (msg:Message) => `${msg.author}, you must provide a valid amount to flip!`
                    }
                }
            ]
    });
    }

    public async exec(message: Message, {money}: {money: number}): Promise<Message> {
        const balanceRepo = this.client.db.getRepository(Balance);
        let player: Balance = await BalanceManager.getUser(balanceRepo, message.member);
        if(money <= Number(player.bal)) {
            if(Math.floor(Math.random() * 2) == 1) {
                await BalanceManager.add(balanceRepo, message.member, money);
                return message.util.send(new MessageEmbed()
                    .setAuthor("Flip!")
                    .setDescription(`${message.member.nickname} won ${(money).toLocaleString('en-us')}GH₵ in a flip!`)
                    .setColor("#4caf50")
                );
            }
            await BalanceManager.add(balanceRepo, message.member, -money);
            return message.util.send(new MessageEmbed()
                .setAuthor("Flip!")
                .setDescription(`${message.member.nickname} lost ${(money).toLocaleString('en-us')}GH₵ in a flip!`)
                .setColor("#f44336")
            );
        }
        return message.util.send(new MessageEmbed()
            .setAuthor("Flip!")
            .setDescription(`Sorry ${message.member.nickname}, I don't give credit. Come back when you're a little, mmmm.... richer!`)
            .setColor("#f44336")
            .setFooter("-Morshu")
        );
    }
}
