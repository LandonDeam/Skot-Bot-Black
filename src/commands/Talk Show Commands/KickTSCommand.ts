import { Message, TextChannel, GuildMember, Permissions, Speaking } from "discord.js";
import { Command } from "discord-akairo";

export default class KickTSCommand extends Command {
    public constructor() {
        super("kickets", {
            aliases: ["kickets", "kts", "getoffthestage"],
            category: "Talk Show Commands",
            description: {
                content: "Kicks the given member from the Sam and Land Talk Show channel.",
                usage: "kts [member]",
                examples: [
                    "kts <@188362544283516928>"
                ]
            },
            ratelimit: 0,
            args: [
                {
                    id: "member",
                    type: "member",
                    prompt: {
                        start: (msg:Message) => `${msg.author}, you must provide a valid member to kick!`
                    }
                }
            ]
        });
    }

    public exec (message: Message, {member}: {member:GuildMember}): Promise<Message> {
        if(
            !(message.author.id == "271035017487056900" || 
              message.author.id == "245659499292131349" || 
              message.channel.id == "867902314983587880"
            ) || 
            member.id == "271035017487056900" || 
            member.id == "245659499292131349"
        )
            return message.util.send("You do not have permission for this command!");
        member.permissionsIn(message.channel).remove("SEND_MESSAGES");
        message.delete();
        return (this.client.channels.cache.get("867902314983587880") as TextChannel).send(`${message.author} has kicked you, <@${member.id}>, from the talk show.`);
    }
}