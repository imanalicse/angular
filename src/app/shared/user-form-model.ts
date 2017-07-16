export class UserFormModel{
    public id: number;
    public name: string;
    public email: string;
    public address: {
        city: string;
        street: string;
        postalCode: number;
    }
}