var Person = /** @class */ (function () {
    function Person(name, age, address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }
    // Getter methods to access private properties
    Person.prototype.getName = function () {
        return this.name;
    };
    Person.prototype.getAge = function () {
        return this.age;
    };
    Person.prototype.getAddress = function () {
        return this.address;
    };
    // Setter methods to update private properties
    Person.prototype.setName = function (name) {
        this.name = name;
    };
    Person.prototype.setAge = function (age) {
        this.age = age;
    };
    Person.prototype.setAddress = function (address) {
        this.address = address;
    };
    // Method to display person's details
    Person.prototype.displayDetails = function () {
        console.log("Name: ".concat(this.name, ", Age: ").concat(this.age, ", Address: ").concat(this.address));
    };
    return Person;
}());
// Example usage
var person1 = new Person("Alice", 30, "123 Main St, City");
person1.displayDetails(); // Output: Name: Alice, Age: 30, Address: 123 Main
