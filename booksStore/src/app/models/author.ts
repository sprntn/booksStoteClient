import { Data } from "@angular/router";

export class Author {
    AuthorId?: number;
    FirstName!: string;
    LastName?: string;
    Email?: string;
    BirthDate?: Data;
    CountryId?: number;
}
