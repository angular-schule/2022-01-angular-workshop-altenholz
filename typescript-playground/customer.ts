export class Customer {

    constructor(private id: number) {}

    fooBar(foo: string): string {
        setTimeout(() => {
            console.log('ID', this.id);
        }, 2000);
        return '';
    }
}