function inheritingToString() {
    class Person {
        constructor(name, email) {
            this.name = name;
            this.email = email;
        }

        toString(){
           let className = this.constructor.name;
           return `${className} (name: ${this.name}, email: ${this.email})`;
        }
    }

    class Teacher extends Person {
        constructor(name, email, subject) {
            super(name, email);
            this.subject = subject;
        }

        toString(){
            let baseToString = super.toString().slice(0,-1);
            return baseToString + `, subject: ${this.subject})`;
        }
    }

    class Student extends Person{
        constructor(name, email, course){
            super(name, email);
            this.course = course;
        }

        toString(){
            let baseToString = super.toString().slice(0, -1);
            return baseToString = baseToString + `, course: ${this.course})`;
        }
    }

    return {Person, Teacher, Student};
}

let obj = inheritingToString();
let Person = obj.Person;
let Teacher = obj.Teacher;
let Student = obj.Student;

let p1 = new Person('Ivan', 'ivan@abv.bg');
let t1 = new Teacher('Georgi', 'g@abv.bg', 'PHP');
let s1 = new Student('Pesho', 'pesho@abv.bg', 'Java & C#');

console.log(p1.toString());
console.log(t1.toString());
console.log(s1.toString());
