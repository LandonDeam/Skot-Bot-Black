import{Command} from "discord-akairo";
import{Message} from "discord.js";
import sort from "fast-sort";
import seedrandom from "seedrandom";

export default class RollCommand extends Command {
    public constructor() {
        super("roll", {
            aliases: ["roll","d20"],
            category: "Public Commands",
            description: {
                content: "Returns a random number either from 1-20 or between any two given integers",
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
                    default: (msg: Message) => 20
                }
            ]
        });
    }

    public exec(message: Message, {numOne, numTwo}: {numOne: number, numTwo: number}): Promise<Message> {
        let nums: number[] = sort([numOne, numTwo]).asc(); // sorts the inputs to make it go in ascending order
        return message.util.send(`You rolled ${Math.floor(seedrandom(message.author.id+message.content.toLowerCase().replace("\W", "")+Date.now())() * (nums[1] - nums[0] + 1) + nums[0])}`);
    }
}