export default class Likes {
    constructor () {
        this.likes = [];
        this.readStorage();
    }

    addLike(id, title, author, img) {
        const like = {
            id,
            title,
            author,
            img
        };
        this.likes.push(like);

        this.persistLikes();

        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
        this.persistLikes();
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistLikes() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        if (storage) this.likes = storage;
    }
}