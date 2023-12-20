export class User {
    UserID: number;
    FirstName: string;
    LastName: string;
    Email: string;
    // password: string;

    constructor(id: number, firstName: string, lastName: string, email: string){
        this.UserID = id;
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Email = email;
    }
}
