// Importing Vehicle and Wheel classes
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';
// TODO: The Motorbike class should extend the Vehicle class
class Motorbike extends Vehicle {
    // TODO: Create a constructor that accepts the properties of the Motorbike class
    constructor(vin, color, make, model, year, weight, topSpeed, wheels) {
        // TODO: The constructor should call the constructor of the parent class, Vehicle
        super();
        // TODO: The constructor should initialize the properties of the Motorbike class
        this.vin = vin;
        this.color = color;
        this.make = make;
        this.model = model;
        this.year = year;
        this.weight = weight;
        this.topSpeed = topSpeed;
        // TODO: The constructor should check if the wheels array has 2 elements and create 2 new default Wheel objects if it does not
        if (!wheels || wheels.length !== 2) {
            this.wheels = [
                new Wheel(),
                new Wheel()
            ];
        }
        else {
            this.wheels = wheels;
        }
    }
    wheelie() {
        console.log(`Motorbike ${this.make} ${this.model} is doing a wheelieeeeeeeeeeeee!`);
    }

    printDetails() {
        super.printDetails();
        console.log(`VIN: ${this.vin}`);
        console.log(`Color: ${this.color}`);
        console.log(`Make: ${this.make}`);
        console.log(`Model: ${this.model}`);
        console.log(`Year: ${this.year}`);
        console.log(`Weight: ${this.weight} lbs`);
        console.log(`Top Speed: ${this.topSpeed} mph`);
        console.log(`Front Wheel: ${this.wheels[0].getDiameter} inch with a ${this.wheels[0].getTireBrand} tire`);
        console.log(`Rear Wheel: ${this.wheels[1].getDiameter} inch with a ${this.wheels[1].getTireBrand} tire`);
    }
}

export default Motorbike;
