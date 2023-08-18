import { Expose } from "class-transformer";

/**
 * * Here are the properties that we want to share
 */
export class UserDTO {
    @Expose()
    id: number;

    @Expose()
    email: string;
}