import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly repo: Repository<User>
    ) { }

    async createUser(email: string, password: string) {
        const user = this.repo.create({ email, password });

        return await this.repo.save(user);
        // return await this.repo.insert({ email, password });
    }

    async findOne(id: number) {
        if (!id) throw new NotFoundException(`User is not exist.`);
        return await this.repo.findOneBy({
            id
        });
    }

    async find(email: string) {
        return await this.repo.find({
            where: {
                email
            }
        });
    }

    async update(id: number, attrs: Partial<User>) {
        // return await this.repo.update(id, { 
        //     email: attrs.email,
        //     password: attrs.password
        //  });

        const user = await this.repo.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User not found`);
        }
        Object.assign(user, attrs);
        console.log(
            'User updated', user
        );

        return this.repo.save(user);
    }

    async removeUser(id: number) {
        // return await this.repo.delete(id);
        const user = await this.repo.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User not found`);
        }
        return this.repo.remove(user);
    }
}
