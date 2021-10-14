import { Message } from "discord.js";
import { Command } from "discord-akairo";

export default class PrintMessageToConsole extends Command {
    public constructor() {
        super("printmessagetoconsole", {
            aliases: ["printmessagetoconsole", "pmtc"],
            category: "Owner Commands",
            description: {
                content: "Prints the given message to the console (for debugging and command development)",
                usage: "pmtc [message]",
                examples: "pmtc <@188362544283516928>"
            },
            ratelimit: 0,
            args: [
                {
                    id: "content",
                    type: "string",
                    match: "rest"
                }
            ]
        });
    }

    public exec(message: Message, {content}: {content:string}): Promise<Message> {
        if(message.author.id == "245659499292131349") {
            console.log(`User ${message.author.username} prints this to the console:\n${content}`);
            return message.util.send("Printed.");
        }
        else {
            return message.reply("you do not have access to this command.");
        }
    }
}