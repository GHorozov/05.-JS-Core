function solve() {
    class Employee{
        constructor(name, age){
            if(new.target === Employee){
                throw new Error('Cannot instantiate directly.');
            }
            this.name= name;
            this.age= age;
            this.salary = 0;
            this.tasks = [];
        }

        work(){
            let currentTask = this.tasks.shift();
            console.log(`${this.name}` + currentTask);
            this.tasks.push(currentTask);
        }

        getSalary(){
            return this.salary;
        }

        collectSalary(){
            console.log(`${this.name} received ${this.getSalary()} this month.`);
        }
    }

    class Junior extends Employee{
        constructor(name, age){
            super(name, age);
            this.tasks.push(' is working on a simple task.');
        }

    }

    class Senior extends Employee{
        constructor(name, age){
            super(name, age);
            this.tasks.push(' is working on a complicated task.');
            this.tasks.push(' is taking time off work.');
            this.tasks.push(' is supervising junior workers.');
        }
    }

    class Manager extends Employee{
        constructor(name, age){
            super(name, age);
            this.dividend = 0;
            this.tasks.push(' scheduled a meeting.');
            this.tasks.push(' is preparing a quarterly report.');
        }

        getSalary(){
            return super.getSalary() + this.dividend ;
        }
    }

    return {Employee, Junior, Senior, Manager};
}

let Junior = solve().Junior;
let Senior = solve().Senior;
let Manager = solve().Manager;

let j1 = new Junior('Ivan', 20);
let s1 = new Senior('Petar', 35);
let m1 = new Manager('Stamat', 50);

j1.salary += 10;
s1.salary += 20;
m1.salary += 30;
m1.divident += 10;

console.log(j1.collectSalary()); //10
console.log(s1.collectSalary()); // 20;
console.log(m1.collectSalary()); //40


