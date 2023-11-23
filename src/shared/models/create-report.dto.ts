import { IsLongitude, IsNumber, IsPositive, IsString, Max, Min } from "class-validator";

export class CreateReportDTO {
    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(2050)
    year: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

    @IsLongitude()
    lng: number;

    @IsLongitude()
    lat: number;

    @IsPositive()
    @IsNumber()
    price: number;
}