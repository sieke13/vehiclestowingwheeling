// Import required classes and interfaces
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';
// Truck class extending Vehicle and implementing AbleToTow
class Truck extends Vehicle {
    // Constructor for Truck class
    constructor(vin, color, make, model, year, weight, topSpeed, wheels, towingCapacity) {
        // Call Vehicle constructor and pass relevant properties
        super();
        // Initialize properties
        this.vin = vin;
        this.color = color;
        this.make = make;
        this.model = model;
        this.year = year;
        this.weight = weight;
        this.topSpeed = topSpeed;
        this.towingCapacity = towingCapacity;
        // Initialize wheels with default objects if not exactly 4
        this.wheels = wheels.length === 4 ? wheels : [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
    }
    // Implement tow method from AbleToTow
    tow(vehicle) {
        const vehicleDescription = `${vehicle.make ?? 'Unknown Make'} ${vehicle.model ?? 'Unknown Model'}`;
        if (vehicle.weight <= this.towingCapacity) {
            console.log(`Towing ${vehicleDescription}...`);
        }
        else {
            console.log(`Cannot tow ${vehicleDescription} - exceeds towing capacity of ${this.towingCapacity} lbs.`);
        }
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
        console.log(`Towing Capacity: ${this.towingCapacity} lbs`);
        console.log('Wheels:', this.wheels);
    }
}
// Export the Truck class
export default Truck;
