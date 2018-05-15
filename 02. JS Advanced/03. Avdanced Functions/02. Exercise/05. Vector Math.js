(() => {
    let result;
    let add = function add(v1, v2) {
        result = [v1[0] + v2[0], v1[1] + v2[1]];
        return result;
    };

    let multiply = function multiply(v1, scalar) {
        result = [v1[0] * scalar, v1[1] * scalar];
            return result;
        };

    let length = function length(v1) {
        result = Math.sqrt(Math.pow(v1[0], 2) + Math.pow(v1[1], 2));
        return result;
    };

    let dot = function dot(v1, v2) {
        result = (v1[0] * v2[0]) + (v1[1] * v2[1]);
        return result;
    };

    let cross = function cross(v1, v2) {
        result = v1[0] * v2[1] - v1[1] * v2[0];
        return result;
    };

    return {add, multiply, length, dot, cross};
})();

//sgorter way
// (() => {
//     let add = (vec1, vec2) => [vec1[0]+vec2[0], vec1[1]+vec2[1]];
//     let multiply = (vec1, scalar) => [vec1[0] * scalar, vec1[1] * scalar];
//     let length = (vec1) => Math.sqrt(Math.pow(vec1[0], 2) + Math.pow(vec1[1], 2));
//     let dot = (vec1, vec2) => vec1[0] * vec2[0] + vec1[1] * vec2[1];
//     let cross = (vec1, vec2) => vec1[0] * vec2[1] - vec1[1] * vec2[0];
//
//     return {add, multiply, length, dot, cross};
// })();


// solution.add([1, 1], [1, 0]);
// solution.multiply([3.5, -2], 2);
// solution.length([3, -4]);
// solution.dot([1, 0], [0, -1]);
// solution.cross([3, 7], [1, 0]);