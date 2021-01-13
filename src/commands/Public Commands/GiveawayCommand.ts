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
                    id: "time",
                    type: (msg: Message, str: string) => {
                        return Number(ms(str));
                    },
                    prompt: {
                        start: (msg: Message) => `${msg.author}, you must provide a time!`,
                        retry: (msg: Message) => `${msg.author}, you must provide a valid time!`
                    }
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

    public async exec(message: Message, {time, item}: {time: number, item: string}): Promise<any> {

    }
}