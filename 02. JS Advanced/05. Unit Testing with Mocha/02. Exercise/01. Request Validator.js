function validateRequest(obj) {
    let inputMethod = obj.method;
    let inputUrl = obj.uri;
    let inputVersion = obj.version;
    let inputMessage = obj.message;

    let validMethods = ["GET", "POST", "DELETE", "CONNECT"];

    if(! (obj.method && validMethods.includes(obj.method))){
        throw new Error("Invalid request header: Invalid Method");
    }

    let uriRegex = /^[\w.]+$/;
    if(! (obj.uri && ( uriRegex.test(obj.uri) || obj.uri === "*"))){
        throw new Error("Invalid request header: Invalid URI");
    }

    let isValidVersion =(inputVersion  === 'HTTP/0.9' || inputVersion  === 'HTTP/1.0' || inputVersion  === 'HTTP/1.1' || inputVersion === 'HTTP/2.0' );
    if(!isValidVersion){
        throw new Error('Invalid request header: Invalid Version');
    }

    let messageRegex = /^[^<>\\&'"]*$/;
    if(! ( obj.hasOwnProperty("message") && (messageRegex.test(obj.message) || obj.message == ""))) {
        throw new Error("Invalid request header: Invalid Message");
    }

    return obj;
}

validateRequest({
    method: 'GET',
    uri: 'kkk jjjj',
    version: 'HTTP/0.8',
    message: ''
});

// validateRequest({
//     method: 'POST',
//     uri: 'home.bash',
//     version: 'HTTP/2.0'
// });

//
// validateRequest({
//     method: 'GET',
//     version: 'HTTP/1.1',
//     uri: 'svn.public.catalog',
//     message: ''
// });
//
// validateRequest({
//     method: 'OPTIONS',
//     uri: 'git.master',
//     version: 'HTTP/1.1',
//     message: '-recursive'
// });
