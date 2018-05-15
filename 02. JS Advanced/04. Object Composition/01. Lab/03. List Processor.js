function listProccessor(input) {
    let commandExecutor = (function () {
        let arr = [];
        function add(str) {
            arr.push(str);
        }
        function remove(str) {
            arr = arr.filter(x => x !== str);
        }
        function print() {
            console.log(arr.join(','));
        }
        return {add, remove, print};
    })();

    for (let item of input) {
        let parts = item.split(' ');
        let command = parts[0];
        let value = parts[1];
        commandExecutor[command](value);
    }
}

listProccessor(['add hello', 'add again', 'remove hello', 'add again', 'print']);
//listProccessor(['add pesho', 'add gosho', 'add pesho', 'remove pesho','print']);
