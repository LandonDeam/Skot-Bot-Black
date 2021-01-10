import{Command} from "discord-akairo";
import{Message} from "discord.js";

export default class KillCommand extends Command {
    public constructor() {
        super("kill", {
            aliases: ["kill", "stop"],
            category: "Owner Commands",
            description: {
                content: "Shuts down the bot",
                usage: "kill",
                examples: [
                    "kill"
                ]
            },
            ratelimit: 1,
            ownerOnly: true
        });
    }

    public exec(message: Message): Promise<void> {
        message.util.send(`Beginning shutdown...`);
        
        return;
    }
}