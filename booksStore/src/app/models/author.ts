import { Data } from "@angular/router";

export class Author {
    AuthorId?: number;
    //FirstName!: string;
    //LastName?: string;
    FullName!: string;
    Email?: string;
    BirthDate?: Data;
    CountryId?: number;
}
