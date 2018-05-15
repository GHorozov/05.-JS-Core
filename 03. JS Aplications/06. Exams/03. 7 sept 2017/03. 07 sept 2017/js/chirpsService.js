let chirpsService = ( () =>{

    function getChirps() {
        return remote.get('appdata', `chirps`, 'Kinvey');
    }

    function getFollowing() {
        let username = sessionStorage.getItem('username');
        return remote.get('user', `?query={"username":"${username}"}`, 'Kinvey');
    }

    function getFollowers() {
        let username = sessionStorage.getItem('username');
        return remote.get('user', `?query={"subscriptions":"${username}"}`, 'Kinvey');
    }

    function createChirp(text) {
        let data = {
            text: text,
            author: sessionStorage.getItem('username')
        };
        return remote.post('appdata', 'chirps', 'Kinvey', data);
    }

    function getMyChirps() {
        let username = sessionStorage.getItem('username');
        return remote.get('appdata', `chirps?query={"author":"${username}"}&sort={"_kmd.ect": 1}`, 'Kinvey');
    }

    function deleteChirp(id) {
        return remote.remove('appdata', 'chirps/'+ id, 'Kinvey');
    }

    function getDiscover() {
        return remote.get('user', '', 'Kinvey');
    }

    function getChirpsByUsername(username) {
        return remote.get('appdata', `chirps?query={"author":"${username}"}&sort={"_kmd.ect": 1}`, 'Kinvey');
    }
    
    async function followUser(username) {
        let arr = await remote.get('user', `?query={"subscriptions":"${username}"}`, 'Kinvey').subscriptions;
        console.log(arr);
        // let data = {
        //     subscriptions: ["testuser", "vako", "Tacito"]
        // };
        //
        // return remote.update('user', id, 'Kinvey');
    }

    return {
        getChirps,
        getFollowing,
        getFollowers,
        createChirp,
        getMyChirps,
        deleteChirp,
        getDiscover,
        getChirpsByUsername,
        followUser

    }
})();