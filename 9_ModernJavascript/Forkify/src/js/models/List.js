import uniqid from 'uniqid';
export default class List {
    constructor () {
        this.items = [];
    }

    addIngredient(ingredient) {
        const item = {
            id: uniqid(),
            ...ingredient
        };
        this.items = [...this.items, item];
        return item;
    }

    removeIngredient(id) {
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1);
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }
}