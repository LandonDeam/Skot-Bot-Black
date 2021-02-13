import {Message} from "discord.js";
import {Command} from "discord-akairo";

export default class SayCommand extends Command {
    public constructor() {
        super("say", {
            aliases: ["say"],
            category: "Public Commands",
            description: { 
                content: "Repeats the text given by the user",
                usage: "say [message]",
                examples: [
                    "say turning the frickin frogs gay"
                ]
            },
            ratelimit: 5,
            args: [
                {
                    id: "say",
                    type: "string",
                    match: "rest",
                    prompt: {
                        start: (msg: Message) => `${msg.author}, you must provide at least one character for the bot to say something!`
                    }
                }
            ]

        });
    }
    public async exec(message: Message, {say}: {say: Message}): Promise<Message> {
        return message.util.send(say);
    }
}