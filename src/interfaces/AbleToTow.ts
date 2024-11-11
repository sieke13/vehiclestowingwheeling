// import the classes
import Truck from "../classes/Truck.js";
import Motorbike from "../classes/Motorbike.js";
import Car from "../classes/Car.js";


interface AbleToTow {
    towingCapacity: number;

    tow(vehicle: Truck | Motorbike | Car): void;
}


export default AbleToTow;
