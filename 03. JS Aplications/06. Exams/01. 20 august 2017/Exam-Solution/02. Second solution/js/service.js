let service = (() => {

    function getAllPosts() {
        const endpoint = 'posts?query={}&sort={"_kmd.ect": -1}';

        return remote.get('appdata', endpoint, 'kinvey');
    }

    function cratePost(author, title, description, url, imageUrl) {
        let data = {author, title, description, url, imageUrl};

        return remote.post('appdata', 'posts', 'Kinvey', data);
    }

    function editPost(postId, author, title, description, url, imageUrl) {
        let data = {author, title, description, url, imageUrl};
        let endPoint = `posts/${postId}`;

        return remote.update('appdata', endPoint, 'Kinvey', data);
    }

    function deletePost(postId) {
        let endPoint = `posts/${postId}`;

        return remote.remove('appdata', endPoint, 'Kinvey');
    }
    
    function myPosts(username) {
        let endPoint = `posts?query={"author":"${username}"}&sort={"_kmd.ect": -1}`;

        return remote.get('appdata', endPoint, 'Kinvey');
    }

    function getPostById(postId) {
        let endPoint = `posts/${postId}`;

        return remote.get('appdata', endPoint, 'Kinvey');
    }

    function postComments(postId) {
        let endPoint = `comments?query={"postId":"${postId}"}&sort={"_kmd.ect": -1}`;

        return remote.get('appdata', endPoint, 'Kinvey');
    }
    
    function createComment(postId, content, author) {
        let data = {postId, content, author};

        return remote.post('appdata', 'comments', 'Kinvey', data);
    }

    function deleteComment(commentId) {
        let endPoint = `comments/${commentId}`;

        return remote.remove('appdata', endPoint, 'Kinvey');
    }


    return {
        getAllPosts,
        cratePost,
        editPost,
        deletePost,
        myPosts,
        getPostById,
        postComments,
        createComment,
        deleteComment
    }
})();