import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

class Cli {
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle to perform an action on',
          choices: this.vehicles.map((vehicle) => ({
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle.vin,
          })),
        },
      ])
      .then((answers) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      });
  }

  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          choices: ['Car', 'Motorbike', 'Truck'],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === 'Car') {
          this.createCar();
        } else if (answers.vehicleType === 'Truck') {
          this.createTruck();
        } else if (answers.vehicleType === 'Motorbike') {
          this.createMotorbike();
        }
      });
  }

  createCar(): void {
    inquirer
      .prompt([
        { type: 'input', name: 'color', message: 'Enter Color' },
        { type: 'input', name: 'make', message: 'Enter Make' },
        { type: 'input', name: 'model', message: 'Enter Model' },
        { type: 'input', name: 'year', message: 'Enter Year' },
        { type: 'input', name: 'weight', message: 'Enter Weight' },
        { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
      ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        this.vehicles.push(car);
        this.selectedVehicleVin = car.vin;
        this.performActions();
      });
  }

  createTruck(): void {
    inquirer
      .prompt([
        { type: 'input', name: 'color', message: 'Enter Color' },
        { type: 'input', name: 'make', message: 'Enter Make' },
        { type: 'input', name: 'model', message: 'Enter Model' },
        { type: 'input', name: 'year', message: 'Enter Year' },
        { type: 'input', name: 'weight', message: 'Enter Weight' },
        { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
        { type: 'input', name: 'towingCapacity', message: 'Enter Towing Capacity' },
      ])
      .then((answers) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [],
          parseInt(answers.towingCapacity)
        );
        this.vehicles.push(truck);
        this.selectedVehicleVin = truck.vin;
        this.performActions();
      });
  }

  createMotorbike(): void {
    inquirer
      .prompt([
        { type: 'input', name: 'color', message: 'Enter Color' },
        { type: 'input', name: 'make', message: 'Enter Make' },
        { type: 'input', name: 'model', message: 'Enter Model' },
        { type: 'input', name: 'year', message: 'Enter Year' },
        { type: 'input', name: 'weight', message: 'Enter Weight' },
        { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
      ])
      .then((answers) => {
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        this.performActions();
      });
  }

  performActions(): void {
    const selectedVehicle = this.vehicles.find(
      (vehicle) => vehicle.vin === this.selectedVehicleVin
    );

    if (!selectedVehicle) return;

    const baseChoices = [
        'Print details',
        'Start vehicle',
        'Accelerate 5 MPH',
        'Decelerate 5 MPH',
        'Stop vehicle',
        'Turn right',
        'Turn left',
        'Reverse',
        'Select or create another vehicle',
        'Exit',
    ];

    const vehicleSpecificChoices = [];
    if (selectedVehicle instanceof Truck) {
        vehicleSpecificChoices.push('Tow');
    }
    if (selectedVehicle instanceof Motorbike) {
        vehicleSpecificChoices.push('Wheelie');
    }

    const allChoices = [...baseChoices, ...vehicleSpecificChoices];

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Select an action',
                choices: allChoices,
            },
        ])
        .then((answers) => {
            switch (answers.action) {
                case 'Print details':
                    selectedVehicle.printDetails();
                    break;
                case 'Start vehicle':
                    selectedVehicle.start();
                    break;
                case 'Accelerate 5 MPH':
                    selectedVehicle.accelerate(5);
                    break;
                case 'Decelerate 5 MPH':
                    selectedVehicle.decelerate(5);
                    break;
                case 'Stop vehicle':
                    selectedVehicle.stop();
                    break;
                case 'Turn right':
                    selectedVehicle.turn('right');
                    break;
                case 'Turn left':
                    selectedVehicle.turn('left');
                    break;
                case 'Reverse':
                    selectedVehicle.reverse();
                    break;
                case 'Tow':
                    if (selectedVehicle instanceof Truck) {
                        this.findVehicleToTow(selectedVehicle);
                    }
                    return;  
                case 'Wheelie':
                    if (selectedVehicle instanceof Motorbike) {
                        selectedVehicle.wheelie();
                    }
                    break;
                case 'Select or create another vehicle':
                    this.startCli();
                    return;  
                case 'Exit':
                    this.exit = true;
                    return;  
            }

            if (!this.exit) {
                this.performActions();
            }
        });
  }

  findVehicleToTow(truck: Truck): void {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'vehicleToTow',
                message: 'Select a vehicle to tow',
                choices: this.vehicles
                    .filter((vehicle) => vehicle !== truck)
                    .map((vehicle) => ({
                        name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
                        value: vehicle.vin,
                    })),
            },
        ])
        .then((answers) => {
            const vehicleToTowVin = answers.vehicleToTow;
            const vehicleToTow = this.vehicles.find(
                (vehicle) => vehicle.vin === vehicleToTowVin
            );

            if (!vehicleToTow) {
                console.log('Selected vehicle not found.');
            } else if (vehicleToTow === truck) {
                console.log('The truck cannot tow itself.');
            } else {
                if (vehicleToTow.weight <= truck.towingCapacity) {
                    console.log(`${truck.make} is towing ${vehicleToTow.make}`);
                } else {
                    console.log(`Cannot tow ${vehicleToTow.make} - Exceeds capacity.`);
                }
            }
            this.performActions();
        });
  }

  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What do you want to do?',
          choices: ['Select Vehicle', 'Create Vehicle', 'Exit'],
        },
      ])
      .then((answers) => {
        if (answers.action === 'Select Vehicle') {
          this.chooseVehicle();
        } else if (answers.action === 'Create Vehicle') {
          this.createVehicle();
        } else if (answers.action === 'Exit') {
          this.exit = true;
        }
      });
  }
}

export default Cli;