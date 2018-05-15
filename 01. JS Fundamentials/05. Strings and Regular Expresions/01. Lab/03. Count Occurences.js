function countOccurrances(word, text) {
    let counter = 0;

    while(true){
        let startIndex = text.indexOf(word);

        if(startIndex < 0 ){
            break;
        }

        text = text.substr(startIndex+1);
        counter++;
    }

    console.log(counter);
}

//countOccurances('the', 'The quick brown fox jumps over the lay dog.');
countOccurrances('ma',
    'Marine mammal training is the training and caring for marine life such as, dolphins, killer whales, sea lions, walruses, and other marine mammals. ' +
    'It is also a duty of the trainer to do mental and physical exercises to keep the animal healthy and happy.');