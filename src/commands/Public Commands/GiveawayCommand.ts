import {Command} from "discord-akairo";
import {Message, MessageEmbed} from "discord.js";
import ms from "ms";
import {Repository} from "typeorm";
import {Giveaways} from "../../models/Giveaway";
import GiveawayManager from "../../structures/giveaways/GiveawayManager";

export default class GiveawayCommand extends Command {
    public constructor() {
        super("giveaway", {
            aliases: ["giveaway"],
            category: "Public Commands",
            description: {
                content: "Start a giveaway",
                usage: "giveaway [time] [item]",
                examples: [
                    "giveaway 10m Discord Nitro"
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: "timeStr",
                    type: "string"
                },
                {
                    id: "item",
                    type: "string",
                    match: "rest",
                    prompt: {
                        start: (msg: Message) => `${msg.author}, you must provide an item to giveaway!`
                    }
                }
            ]
        })
    } //https://youtu.be/1XlQqoR9U8Y?t=790

    public async exec(message: Message, {timeStr, item}: {timeStr: string, item: string}): Promise<void> {
        try{
            let time: number = ms(timeStr);
            const giveawayRepo: Repository<Giveaways> = this.client.db.getRepository(Giveaways);
            const end: number = Date.now() + time;

            const msg: Message = await message.channel.send(new MessageEmbed()
            .setAuthor(`Giveaway | ${item}`)
            .setColor("#4caf50")
            .setDescription(`${message.author} is giving away **${item}**`)
            .setFooter("Giveaway Ends")
            .setTimestamp(end)
            );
            msg.react("🎉");

            giveawayRepo.insert({
                channel: msg.channel.id,
                message: msg.id,
                end: end
            });

            setTimeout(() => {
                GiveawayManager.end(giveawayRepo, msg);
            }, time);
        }
        catch {
            message.util.reply(`Please enter a valid time!`);
        }
    }
}