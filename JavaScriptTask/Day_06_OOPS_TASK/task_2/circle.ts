class Circle {
    private _radius: number;
    private _color: string;
  
    constructor(radius: number = 1, color: string = 'red') {
      this._radius = radius;
      this._color = color;
    }
  
    getRadius(): number {
      return this._radius;
    }
  
    setRadius(radius: number): void {
      this._radius = radius;
    }
  
    getColor(): string {
      return this._color;
    }
  
    setColor(color: string): void {
      this._color = color;
    }
  
    toString(): string {
      return `Circle - Radius: ${this._radius}, Color: ${this._color}`;
    }
  
    getArea(): number {
      return Math.PI * Math.pow(this._radius, 2);
    }
  
    getCircumference(): number {
      return 2 * Math.PI * this._radius;
    }
  }
  
  const circle1 = new Circle();
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