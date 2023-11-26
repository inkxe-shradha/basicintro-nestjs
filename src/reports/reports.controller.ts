import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReportDTO } from 'src/shared/models/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/shared/interceptor/serialize/serialize.interceptor';
import { ReportDTO } from 'src/shared/models/reports.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportService: ReportsService) {}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDTO)
    createReport(@Body() body: CreateReportDTO, @CurrentUser() user: User) {
        return this.reportService.create(body, user);
    }
}
