import { elements, elementsStrings, renderLoader, clearLoader } from './views/base';
import Search from './models/Search';
import * as searchView from './views/searchView';
import Recipe from './models/Recipe';
import * as recipeView from './views/recipeView';
import List from './models/List';
import * as listView from './views/listView';
import Likes from './models/Likes';
import * as likesView from './views/likesView';

/**
 * Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/* Search Controller */
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();

    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.result);

        // 4) Search for recipes
        try {
            await state.search.getResults();

            // 5) Render results on UI
            searchView.renderResults(state.search.result);
            clearLoader();
        } catch (error) {
            alert(`Error receiving results for query '${query}'`);
            clearLoader();
        }

    }
};

elements.searchButton.addEventListener('submit', event => {
    event.preventDefault();
    controlSearch();
});

elements.resultPages.addEventListener('click', event => {
    const btn = event.target.closest(`.${elementsStrings.pageButton}`);
    if (btn) {
        const goTo = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goTo);
    }
});

/* Recipe Controller */
const controlRecipe = async () => {
    // 1) Get ID from URL
    const id = window.location.hash.replace('#', '');
    if (id) {
        // 2) New recipe object
        state.recipe = new Recipe(id);

        // 3) Prepare UI for recipe
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // 4) Highlight selected search item
        searchView.hightlightSelected(id);

        try {
            // 4) Get recipe data
            await state.recipe.getRecipe();

            // 5) Parse ingredients
            state.recipe.parseIngredients();

            // 6) Calculate servings and time
            state.recipe.calcServings();
            state.recipe.calcTime();

            // 7) Render recipe
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
            clearLoader();
        } catch (error) {
            alert(`Error processing recipe with ID ${id}`);
        }

    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/* List Controller */
const controlList = () => {
    if (!state.list) {
        state.list = new List();
    }

    state.recipe.ingredients.forEach(ingredient => {
        const ing = state.list.addIngredient(ingredient);
        listView.renderIngredient(ing);
    });
};

elements.shoppingList.addEventListener('click', event => {
    const id = event.target.closest('.shopping__item').dataset.itemid;
    if (event.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.removeIngredient(id);
        listView.deleteIngredient(id);
    } else if (event.target.matches('.shopping__count-value')) {
        const val = parseFloat(event.target.value, 10);
        state.list.updateCount(id, val);
    }
});

/* Likes Controller */
const controlLike = () => {
    if (!state.likes) state.likes = new Likes();

    const currentID = state.recipe.id;

    if (!state.likes.isLiked(currentID)) {
        // add like to state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        // toggle like button
        likesView.toggleLikeBtn(true);

        // add to ui list
        likesView.renderLike(newLike);
    } else {
        // delete like
        state.likes.deleteLike(currentID);

        // toggle like button
        likesView.toggleLikeBtn(false);

        // remove from ui list
        likesView.removeLike(currentID);
    }

    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// Restore liked recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();
    state.likes.readStorage();
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    state.likes.likes.forEach(like => likesView.renderLike(like));
});

elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('decrease');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('increase');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }
});



