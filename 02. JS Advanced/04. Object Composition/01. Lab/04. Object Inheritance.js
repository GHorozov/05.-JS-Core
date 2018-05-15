function objInheritance(input) {
    let commandExecutor = (function () {
        let master = {};
        function create(args) {
            if (args.length > 2) {
                master[args[0]] = Object.create(master[args[2]]);
            } else {
                master[args[0]] = {};
            }
        }

        function set(args) {
            let name = args[0];
            let key = args[1];
            master[name][key] = args[2];
        }

        function print(args) {
            let result = [];
            let obj = master[args[0]];
            for (let key in obj) {
                result.push(key + ':' + obj[key]);
            }
            console.log(result.join(', '));
        }

        return {create, set, print};
    })();

    for (let item of input) {
        let args = item.split(' ');
        let command = args.shift();
        commandExecutor[command](args);
    }
}

objInheritance(
    [
        'create c1',
        'create c2 inherit c1',
        'set c1 color red',
        'set c2 model new',
        'print c1',
        'print c2'
    ]
);