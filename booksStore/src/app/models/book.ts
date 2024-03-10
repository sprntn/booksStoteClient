import { Title } from "@angular/platform-browser";

export class Book {
    BookId?:number | null;
    Title!: string;
    Description!: string;
    ImgUrl!: string
    AuthorId?: number | null;
    Author?: string | null;
    CategoryId?: number | null;
    Category?: string | null;
    PublishDate?: Date | null;
    AverageRating?: number | null;
    
    constructor(title: string, description: string, imgUrl: string){
        this.Title = title;
        this.Description = description;
        this.ImgUrl = imgUrl;
    }
}
