function nowPlaying(input) {
    let songName = input[0];
    let artist = input[1];
    let duration = input[2];

    console.log(`Now Playing: ${artist} - ${songName} [${duration}]`);
}

nowPlaying(['Number One', 'Nelly', '4:09']);
