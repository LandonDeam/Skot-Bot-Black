import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class ChooseCommand extends Command {
    public constructor() {
        super("choose", {
            aliases: ["choose"],
            category: "Public Command",
            description: {
                content: "Chooses between a set of things",
                usage: "choose [item1, item2, etc...]",
                examples: [
                    "choose bagels, donuts, hotdog, burger"
                ]
            },
            ratelimit: 10,
            args: [
                {
                    id: "items",
                    type: "string",
                    match: "rest"
                }
            ]
        });
    }

    public async exec(message: Message, {items}: {items:string}): Promise<Message> {
        try {
            let arr: String[] = items.split(",");
            arr.forEach(str => { str = str.trim(); });
            let choice: number = Math.floor(Math.random() * arr.length);
            return message.util.send(`I choose ${arr[choice]}`);
        }
        catch {
            return message.util.reply(`Error ocurred`);
        }
    }
    
}