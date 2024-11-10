// Import required classes and interfaces
import Vehicle from './Vehicle.js';
import Motorbike from './Motorbike.js';
import Car from './Car.js';
import Wheel from './Wheel.js';
import AbleToTow from '../interfaces/AbleToTow.js';

// Truck class extending Vehicle and implementing AbleToTow
class Truck extends Vehicle implements AbleToTow {
    vin: string;  // Definite assignment assertion
    color: string;
    make: string;
    model: string;
    year: number;
    weight: number;
    topSpeed: number;
    wheels: Wheel[];  // No definite assignment needed, will initialize later
    towingCapacity: number;

    // Constructor for Truck class
    constructor(
        vin: string,
        color: string,
        make: string,
        model: string,
        year: number,
        weight: number,
        topSpeed: number,
        wheels: Wheel[],
        towingCapacity: number,
    ) {
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
    tow(vehicle: Truck | Motorbike | Car): void {
        const vehicleDescription = `${vehicle.make ?? 'Unknown Make'} ${vehicle.model ?? 'Unknown Model'}`;
        
        if (vehicle.weight <= this.towingCapacity) {
            console.log(`Towing ${vehicleDescription}...`);
        } else {
            console.log(`Cannot tow ${vehicleDescription} - exceeds towing capacity of ${this.towingCapacity} lbs.`);
        }
    }

    
    override printDetails(): void {  
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
