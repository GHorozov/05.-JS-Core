function isPalindrome(word) {
    let first =  word.length % 2 ==0 ?  word.substr(0, word.length / 2) : word.substr(0, word.length /2);
    let second =  word.length % 2 ==0 ?  word.substring(word.length / 2) : word.substring(word.length /2+1);

    let secondReverse = second.split('').reverse().join('');
    if(first === secondReverse){
        return true;
    }

    return false;
}

console.log(isPalindrome('racecar'));