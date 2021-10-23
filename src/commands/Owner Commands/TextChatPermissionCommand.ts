import { Message, TextChannel, GuildMember, Permissions, Speaking, Role, User, Guild, GuildMemberRoleManager, OverwriteData, PermissionFlags} from "discord.js";
import { Command } from "discord-akairo";
import { send } from "process";

export default class TextChatPermissionCommand extends Command {
    public constructor() {
        super("textchatperm", {
            aliases: ["textchatperm", "tcp"],
            category: "Owner Commands",
            description: {
                content: "Allows the owner to speak in the given text chat",
                usage: "tcp [text chat]",
                examples: [
                    "tcp <#900785752617656351>"
                ]
            },
            ratelimit: 0,
            args: [
                {
                    id: "channel",
                    type: "string",
                    prompt: {
                        start: (msg:Message) => `${msg.author}, you must provide a valid role to remove!`
                    }
                }
            ]
        });
    }

    public exec (message: Message, {channel}: {channel:string}) {
        if(!(message.author.id == "245659499292131349"))
            return message.util.send("You do not have permission for this command!");
        message.delete();
        (this.client.channels.cache.get(channel) as TextChannel).edit({
            permissionOverwrites: [
                {
                    id:message.author.id,
                    allow:[Permissions.FLAGS.SEND_MESSAGES]
                },
                {
                    id:message.author.id,
                    allow:[Permissions.FLAGS.VIEW_CHANNEL]
                }
        ]});
    }
}