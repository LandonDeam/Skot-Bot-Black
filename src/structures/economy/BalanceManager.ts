import {GuildMember} from "discord.js";
import {Repository} from "typeorm";
import {Balance} from "../../models/Balance";

export default {

    async exist(balanceRepo: Repository<Balance>, member: GuildMember) { // checks if user exists, and if not, instantiates a balance object for them in the database
        //console.log(`Checking if ${member.id} is in db...`);
        const user: Balance = await balanceRepo.findOne({user: member.id})
        if(user == undefined){
        //console.log(`${member.user.tag} was added to db.`);
        balanceRepo.insert({
            user: member.id,
            bal: 100,
            bank: 0,
            time: 0,
            timeDeposited: 0
        });
        }
    },

    async getUser(balanceRepo: Repository<Balance>, member: GuildMember): Promise<Balance> { // returns user Balance object
        await this.exist(balanceRepo, member);
        return await balanceRepo.findOne({user: member.id});
    },

    async add(balanceRepo: Repository<Balance>, member: GuildMember, money: number) { // adds amount to user balance
        await this.exist(balanceRepo, member);
        let user: Balance = await balanceRepo.findOne({user: member.id});
        user.bal = money + Number(user.bal);
        balanceRepo.save(user);
    },

    async deposit(balanceRepo: Repository<Balance>, member: GuildMember, money: number, time: number) { // deposits amount into user bank and stores time data
        let user: Balance = await balanceRepo.findOne({user: member.id});
        user.timeDeposited = Date.now();
        user.time = time;
        user.bal -= money;
        user.bank = money;
        balanceRepo.save(user);
    },

    async withdraw(balanceRepo: Repository<Balance>, member: GuildMember, multiplier: number): Promise<number> { // gives the user their banked money + interest
        let user: Balance = await balanceRepo.findOne({user: member.id});
        let withdrawn: number = Math.floor(Number(user.bank) * multiplier * 100)/100;   

        //console.log(`${member.user.tag} withdrew ${withdrawn} with a percentage of ${(multiplier - 1) * 100}`);
        await this.add(balanceRepo, member, withdrawn);
        user.bank = 0;
        user.time = 0;
        user.timeDeposited = 0;
        //console.log(`${member.user.tag} now has a balance of ${user.bal}`);
        balanceRepo.save(user);
        return withdrawn;
    }

}