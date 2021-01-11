import{Command} from "discord-akairo";
import {TextChannel} from "discord.js";
import{Message} from "discord.js";

export default class MaldCommand extends Command {
    public constructor() {
        super("mald", {
            aliases: ["mald"],
            category: "Public Commands",
            description: {
                content: "Lets Skotty know he's malding",
                usage: "mald",
                examples: [
                    "mald"
                ]
            },
            ratelimit: 3
        });
    }

    public exec(message: Message): Promise<Message> {
        //client.channels.get("707447475228639267").send("<@188362544283516928>");
        message.util.send("Skotty's malding bro");
        return (this.client.channels.cache.get('707447475228639267') as TextChannel).send('<@188362544283516928>');
    }
}