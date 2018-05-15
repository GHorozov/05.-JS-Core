(()=> {
    let id = 0;
    class obj {
        constructor() {
            this.id = id++;
        }

        extend(template) {
            for (let parentData of Object.keys(template)) {
                if(typeof(template[parentData]) === 'function'){
                    Object.getPrototypeOf(this)[parentData] = template[parentData];
                }else{
                    this[parentData] = template[parentData];
                }
            }
        }
    }

    return obj;
})();

// let template ={
//     extensionMethod: function () {},
//     extensionProperty: 'someString'
// };

// let obj1 = new obj();
// obj1.extend(template);
// console.log(obj);

// let obj1 = new myObj();
// let obj2 = new myObj();
// let obj3 = new myObj();
// console.log(obj1.id);
// console.log(obj2.id);
// console.log(obj3.id);





