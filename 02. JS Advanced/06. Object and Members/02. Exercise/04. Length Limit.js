class Stringer{
    constructor(string, length){
        this.innerString = string;
        this.innerLength = Number(length);
    }

    increase(length){
        this.innerLength += length;
    }

    decrease(length){
        if((this.innerLength - length) < 0){
            this.innerLength = 0;
        }else{
            this.innerLength -= length;
        }
    }

    toString(){
        if(this.innerLength <= 0 ){
            return '...';
        }

        let result = this.innerString;
        if(this.innerString.length > this.innerLength){
            result = this.innerString.substr(0, this.innerLength) + '...';
        }

        return result;
    }
}

let test = new Stringer("Viktor", 6);
console.log(test.toString()); //Test

test.decrease(3);
console.log(test.toString()); //Te...

test.decrease(5);
console.log(test.toString()); //...

test.increase(4);
console.log(test.toString()); //Test
