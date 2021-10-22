import { Message, TextChannel, GuildMember} from "discord.js";
import { Command } from "discord-akairo";

export default class InviteTSCommand extends Command {
    public constructor() {
        super("invitets", {
            aliases: ["invitets", "its", "calltostage"],
            category: "Talk Show Commands",
            description: {
                content: "Invites the given member to the Sam and Land Talk Show channel.",
                usage: "its [member]",
                examples: [
                    "its <@188362544283516928>"
                ]
            },
            ratelimit: 0,
            args: [
                {
                    id: "member",
                    type: "member",
                    prompt: {
                        start: (msg:Message) => `${msg.author}, you must provide a valid member to invite!`
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
            )
        ) 
            return message.util.send("You do not have permission for this command!");
        member.permissionsIn(message.channel).add("SEND_MESSAGES");
        message.delete();
        return (this.client.channels.cache.get("867902314983587880") as TextChannel).send(`${message.author} has invited you, <@${member.id}>, to the talk show!`);
    }
}