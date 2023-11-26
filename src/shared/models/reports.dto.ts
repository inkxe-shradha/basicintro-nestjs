//import { ApiModelProperty } from '@nestjs/swagger';

import { Expose, Transform } from 'class-transformer';

export class ReportDTO {
    @Expose()
    id: number;

    @Expose()
    price: number;

    @Expose()
    year: number;

    @Expose()
    lng: number;

    @Expose()
    lat: number;

    @Expose()
    make: string;

    @Expose()
    model: string;

    @Expose()
    millage: number;

    @Transform(({ obj }) => obj?.user.id)
    @Expose()
    userId: number;
}
