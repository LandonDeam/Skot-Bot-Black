import { Message, TextChannel } from "discord.js";
import { Command } from "discord-akairo";

export default class OwnerSayCommand extends Command {
    public constructor() {
        super("ownersay", {
            aliases: ["ownersay"],
            category: "Owner Commands",
            description: {
                content: "Repeats the given message in a given channel in a given server.",
                usage: "ownersay [channel id] [message]",
                examples: ["ownersay 651228794115588096 This is a test."]
            },
            ratelimit: 0,
            args: [
                {
                    id: "channel",
                    type: "string"
                },
                {
                    id: "content",
                    type: "string",
                    match: "rest"
                }
            ]
        });
    }

    public exec(message: Message, {channel, content}: {channel:string, content:string}): Promise<Message> {
        if(message.author.id == "245659499292131349" || message.author.id == "188362544283516928") {
            message.util.send(`Sent \"${content}\" in <#${channel}>`)
            return (this.client.channels.cache.get(channel) as TextChannel).send(content);
        }
        else {
            return message.reply("you do not have access to this command.");
        }
    }
}