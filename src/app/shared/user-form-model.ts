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

export class UserFormDataModel{
    public id: number = 1;
    public name: string = 'Iman';
    public email: string = 'iman@bitmascot.com';
    public address: {
        city: string;
        street: string;
        postalCode: number;
    }
}