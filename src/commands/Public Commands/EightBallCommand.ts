import {Command} from "discord-akairo";
import {Message} from "discord.js";
import seedrandom from "seedrandom";

export default class EightBallCommand extends Command {
    public constructor() {
        super("eightball", {
            aliases: ["eightball", "8ball", "8b"],
            category: "Public Commands",
            description: {
                content: "Chooses a random eight-ball like response to a prompt",
                usage: "8ball <message>",
                examples: [
                    "8ball will alex give me money for free"
                ]
            },
            ratelimit: 10
        });
    }

    public exec(msg: Message) {
        let outcome: String[] = [
            "As I see it, yes.",
            "Ask again later.",
            "Better not tell you now.",
            "Cannot predict now.",
            "Concentrate and ask again.",
            "Don’t count on it.",
            "It is certain.",
            "It is decidedly so.",
            "Most likely.",
            "My reply is no.",
            "My sources say no.",
            "Outlook not so good.",
            "Outlook good.",
            "Reply hazy, try again.",
            "Signs point to yes.",
            "Very doubtful.",
            "Without a doubt.",
            "Yes.",
            "Yes – definitely.",
            "You may rely on it.",
        ]
        msg.util.send(outcome[Math.floor(seedrandom(msg.author.id+msg.content.toLowerCase().replace("\W", "")+Date.now())() * outcome.length)]);
    }
}