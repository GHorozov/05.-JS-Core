function dataClass() {
    class Request{
        constructor(method, uri, version, message ){
            this.method = method;
            this.uri = uri;
            this.version = version;
            this.message = message;
            this.response = undefined;
            this.fulfilled = false;
        }
    }

    return {Request};
}

let obj = dataClass();
let Request = obj.Request;
let myData = new Request('GET', 'http://google.com', 'HTTP/1.1', '');
console.log(myData);