import { Message, TextChannel, GuildMember, Permissions, Speaking, Role, User, Guild, GuildMemberRoleManager} from "discord.js";
import { Command } from "discord-akairo";

export default class RoleRemoverCommand extends Command {
    public constructor() {
        super("removerole", {
            aliases: ["removerole", "rr"],
            category: "Owner Commands",
            description: {
                content: "Removes the specified role from the messager",
                usage: "rr [role id]",
                examples: [
                    "rr 901217141133549580"
                ]
            },
            ratelimit: 0,
            args: [
                {
                    id: "role",
                    type: "Role",
                    prompt: {
                        start: (msg:Message) => `${msg.author}, you must provide a valid role to remove!`
                    }
                }
            ]
        });
    }

    public exec (message: Message, {role, member}: {role:Role, member:GuildMember}) {
        if(!(message.author.id == "245659499292131349"))
            return message.util.send("You do not have permission for this command!");
        message.delete();
        message.member.roles.remove(role);
    }
}