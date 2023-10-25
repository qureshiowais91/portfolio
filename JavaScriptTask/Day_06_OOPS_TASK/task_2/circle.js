var Circle = /** @class */ (function () {
    function Circle(radius, color) {
        if (radius === void 0) { radius = 1; }
        if (color === void 0) { color = 'red'; }
        this._radius = radius;
        this._color = color;
    }
    Circle.prototype.getRadius = function () {
        return this._radius;
    };
    Circle.prototype.setRadius = function (radius) {
        this._radius = radius;
    };
    Circle.prototype.getColor = function () {
        return this._color;
    };
    Circle.prototype.setColor = function (color) {
        this._color = color;
    };
    Circle.prototype.toString = function () {
        return "Circle - Radius: ".concat(this._radius, ", Color: ").concat(this._color);
    };
    Circle.prototype.getArea = function () {
        return Math.PI * Math.pow(this._radius, 2);
    };
    Circle.prototype.getCircumference = function () {
        return 2 * Math.PI * this._radius;
    };
    return Circle;
}());
var circle1 = new Circle();
console.log(circle1.toString());
console.log("Area:", circle1.getArea());
console.log("Circumference:", circle1.getCircumference());
console.log(circle1.toString());
console.log("Area:", circle1.getArea());
console.log("Circumference:", circle1.getCircumference());
circle1.setColor('green');
circle1.setRadius(9);
console.log(circle1.toString());
console.log("Area:", circle1.getArea());
console.log("Circumference:", circle1.getCircumference());
