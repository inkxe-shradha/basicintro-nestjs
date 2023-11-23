import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reports } from './reports.entitiy';
import { CreateReportDTO } from 'src/shared/models/create-report.dto';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Reports) private readonly repo: Repository<Reports>
    ) { }

    async create(reportDetails: CreateReportDTO) {
        const report = this.repo.create(reportDetails)
        return await this.repo.save(report);
    }
}
