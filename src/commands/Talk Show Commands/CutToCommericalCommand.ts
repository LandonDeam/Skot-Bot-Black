import { Message, TextChannel } from "discord.js";
import { Command } from "discord-akairo";

export default class CutToCommercialCommand extends Command {
    public constructor() {
        super("cuttocommercial", {
            aliases: ["cuttocommmerical", "ctc"],
            category: "Talk Show Commands",
            description: {
                content: "Cuts to a commercial break",
                usage: "ctc <number of commercials>",
                examples: [
                    "ctc"
                ]
            },
            ratelimit: 1,
            args: [
                {
                    id: "commercials",
                    type: "number",
                    default: (msg: Message) => 2
                }
            ]
        });
    }

    public async exec(message: Message) {
        
    }
}