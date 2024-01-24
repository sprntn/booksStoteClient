import { Title } from "@angular/platform-browser";

export class Book {
    BookId?:number | null;
    Title!: string;
    Description!: string;
    ImgUrl!: string
    AuthorId?: number | null;
    GenreId?: number | null;
    PublishDate?: Date | null;

    // constructor(title: string, description: string, imgUrl: string){
    //     this.Title = title;
    //     this.Description = description;
        
    // }
}
