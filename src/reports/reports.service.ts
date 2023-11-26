import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reports } from './reports.entitiy';
import { CreateReportDTO } from 'src/shared/models/create-report.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Reports) private readonly repo: Repository<Reports>,
    ) {}

    async create(reportDetails: CreateReportDTO, user: User) {
        const report = this.repo.create(reportDetails);
        report.user = user;
        return await this.repo.save(report);
    }
}
