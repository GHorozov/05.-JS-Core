function solution(command) {
    //console.log(this); // take all properties on call object(post);
    let balance = this.upvotes - this.downvotes;
    let totalVotes = this.upvotes + this.downvotes;

    let obj = {
        upvote: () => { this.upvotes++;},
        downvote: () => {this.downvotes++},
        score: () => {
            let upVotesInScore = this.upvotes;
            let downVotesInScore = this.downvotes;

            if (totalVotes > 50) {
                let addVal = totalVotes > 50 ? Math.ceil(Math.max(upVotesInScore, downVotesInScore) * 0.25) : 0;
                upVotesInScore += addVal;
                downVotesInScore += addVal;
            }

            function getRaiting() {
                if(totalVotes < 10){
                    return 'new';
                }
                if(this.upvotes > (this.upvotes + this.downvotes) * 0.66){
                    return 'hot';
                } else if(balance >= 0 && (this.upvotes > 100 || this.downvotes > 100)){
                    return 'controversial';
                }else if(this.upvotes < this.downvotes){
                    return 'unpopular';
                }else{
                    return 'new';
                }
            }

            return [upVotesInScore, downVotesInScore, balance, getRaiting.call(this)]; // getRaiting.call(this) - call  method getRaiting in obj object
        }
    };

    return obj[command](); // return executed command method;
}

let post = {
    id: '3',
    author: 'emil',
    content: 'wazaaaaa',
    upvotes: 100,
    downvotes: 100
};
solution.call(post, 'upvote');
solution.call(post, 'downvote');
let score = solution.call(post, 'score'); // [127, 127, 0, 'controversial']
console.log(score);
//
// for (let i = 0; i < 50; i++) {
//     solution().call(post, 'downvote');
// }
//
// console.log(solution().call(post, 'score')); // [139, 189, -50, 'unpopular']
