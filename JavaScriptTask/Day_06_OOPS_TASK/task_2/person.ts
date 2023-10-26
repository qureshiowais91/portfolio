class Person {
    private name: string;
    private age: number;
    private address: string;

    constructor(name: string, age: number, address: string) {
        this.name = name;
        this.age = age;
        this.address = address;
    }

    getName(): string {
        return this.name;
    }

    getAge(): number {
        return this.age;
    }

    getAddress(): string {
        return this.address;
    }

    setName(name: string): void {
        this.name = name;
    }

    setAge(age: number): void {
        this.age = age;
    }

    setAddress(address: string): void {
        this.address = address;
    }

    displayDetails(): void {
        console.log(`Name: ${this.name}, Age: ${this.age}, Address: ${this.address}`);
    }
}

const person1 = new Person("Alice", 30, "123 Main St, City");
person1.displayDetails(); 
