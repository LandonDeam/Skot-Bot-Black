import {GuildMember} from "discord.js";
import {Repository} from "typeorm";
import {Balance} from "../../models/Balance";

export default {
    async exist(balanceRepo: Repository<Balance>, member: GuildMember) {
        console.log(`Checking if ${member.id} is in db...`);
        const user = balanceRepo.findOne({user: member.id})
        if(user == undefined){
        console.log(`${member.id} was added to db.`);
        balanceRepo.insert({
            user: member.id,
            bal: 100,
            bank: 0,
            time: 0,
            timeDeposited: 0
        });
        }
    },

    async getUser(balanceRepo: Repository<Balance>, member: GuildMember): Promise<Balance> {
        this.exist(balanceRepo, member);
        return balanceRepo.findOne({user: member.id});
    },

    async give(balanceRepo: Repository<Balance>, member: GuildMember, money: number) {
        await this.exist(balanceRepo, member);
        let user: Balance = await balanceRepo.findOne({user: member.id});
        user.bal += money;
        balanceRepo.save(user);
    },

    async deposit(balanceRepo: Repository<Balance>, member: GuildMember, money: number, time: number) {
        let user: Balance = await balanceRepo.findOne({user: member.id});
        user.timeDeposited = Date.now();
        user.time = time;
        user.bal -= money;
        user.bank = money;
        balanceRepo.save(user);
    },

    async withdraw(balanceRepo: Repository<Balance>, member: GuildMember, multiplier: number) {
        let user: Balance = await balanceRepo.findOne({user: member.id});
        user.bal += (user.bank * multiplier);
        user.bank = 0;
        user.time = 0;
        user.timeDeposited = 0;
        balanceRepo.save(user);
    }

}