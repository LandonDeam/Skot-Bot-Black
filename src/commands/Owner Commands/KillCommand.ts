import {Command} from "discord-akairo";
import {Message} from "discord.js";
import nodemon from "nodemon";

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
        message.util.send(`Shutting down bot...`);
        wait(3e3);
        process.exit(2);
        return;
    }
}

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}