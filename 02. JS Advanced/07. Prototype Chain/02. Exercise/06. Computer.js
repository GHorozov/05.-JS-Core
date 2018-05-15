function createComputerHierarchy() {
    class Computer{
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace){
            if(new.target === Computer){
                throw new Error('This is abstact class.');
            }
            this.manufacturer = manufacturer;
            this.processorSpeed = processorSpeed;
            this.ram = ram;
            this.hardDiskSpace = hardDiskSpace;
        }
    }

    class Keyboard{
        constructor(manufacturer, responseTime){
            this.manufacturer = manufacturer;
            this.responseTime = responseTime;
        }
    }

    class Monitor{
        constructor(manufacturer, width, height){
            this.manufacturer = manufacturer;
            this.width = width;
            this.height = height;
        }
    }

    class Battery{
        constructor(manufacturer, expectedLife){
            this.manufacturer = manufacturer;
            this.expectedLife = expectedLife;
        }
    }

    class Laptop extends Computer{
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery){
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.weight = weight;
            this.color = color;
            this.battery = battery;
        }

        get battery(){
            return this._battery;
        }

        set battery(newBattery){
            if(!(newBattery instanceof Battery)){
                throw new TypeError(`${newBattery} is not instance of Battery.`)
            }
            this._battery = newBattery;
        }
    }

    class Desktop extends Computer{
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor){
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.keyboard = keyboard;
            this.monitor = monitor;
        }

        get keyboard(){
            return this._keyboard;
        }

        set keyboard(newKeyboard){
            if(!(newKeyboard instanceof Keyboard)){
                throw new TypeError(`${newKeyboard} is not instance of Keyboard.`)
            }
            this._keyboard = newKeyboard;
        }

        get monitor(){
            return this._monitor;
        }

        set monitor(newMonitor){
            if(!(newMonitor instanceof Monitor)){
                throw new TypeError(`${this} is not instance of Monitor.`)
            }
            this._monitor = newMonitor;
        }
    }

    return {
        Battery,
        Keyboard,
        Monitor,
        Computer,
        Laptop,
        Desktop
    }
}

let Computer = createComputerHierarchy().Computer;
let Laptop = createComputerHierarchy().Laptop;
let Desktop = createComputerHierarchy().Desktop;
let Monitor = createComputerHierarchy().Monitor;
let Battery = createComputerHierarchy().Battery;
let Keyboard = createComputerHierarchy().Keyboard;

let keyboard = new Keyboard('Logitech',70);
console.log(keyboard);

// let monitor = new Monitor('Benq',28,18);
// let desktop = new Desktop("JAR Computers",3.3,8,1,keyboard,monitor);
// expect(desktop.manufacturer).to.equal("JAR Computers",'Expected manufacturer did not match.');
// expect(desktop.processorSpeed).to.be.closeTo(3.3,0.01,'Expected processor speed did not match.');
// expect(desktop.ram).to.equal(8,'Expected RAM did not match.');
// expect(desktop.hardDiskSpace).to.equal(1,'Expected hard disk space did not match.');
// expect(desktop.keyboard).to.equal(keyboard,'Expected keyboard did not match.');
// expect(desktop.monitor).to.equal(monitor,'Expected monitor did not match.');