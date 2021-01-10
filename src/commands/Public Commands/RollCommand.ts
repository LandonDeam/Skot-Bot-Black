import{Command} from "discord-akairo";
import{Message} from "discord.js";
import sort from "fast-sort";

export default class RollCommand extends Command {
    public constructor() {
        super("roll", {
            aliases: ["roll"],
            category: "Public Commands",
            description: {
                content: "Returns a random number either from 1-10 or between any two given integers",
                usage: "roll <number> <number>",
                examples: [
                    "roll",
                    "roll 8 15"
                ]
            },
            ratelimit: 60,
            args: [
                {
                    id: "numOne",
                    type: "number",
                    default: (msg: Message) => 1
                },
                {
                    id: "numTwo",
                    type: "number",
                    default: (msg: Message) => 10
                }
            ]
        });
    }

    public exec(message: Message, {numOne, numTwo}: {numOne: number, numTwo: number}): Promise<Message> {
        let nums: number[] = sort([numOne, numTwo]).asc();
        return message.util.send(`You rolled ${Math.floor(Math.random() * (nums[1] - nums[0] + 1) + nums[0])}`);
    }
}