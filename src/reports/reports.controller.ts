import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReportDTO } from 'src/shared/models/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('reports')
export class ReportsController {
    constructor(private reportService: ReportsService) { }

    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReportDTO) {
        return this.reportService.create(body)
    }
}
