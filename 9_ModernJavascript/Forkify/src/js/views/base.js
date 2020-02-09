export const elements = {
    searchButton: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    result: document.querySelector('.results'),
    resultList: document.querySelector('.results__list'),
    resultPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shoppingList: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')
};

export const elementsStrings = {
    loader: 'loader',
    pageButton: 'btn-inline'
};

export const renderLoader = parent => {
    const loader = `
        <div class="loader">
            <svg><use href='img/icons.svg#icon-cw'></use></svg>
        </div>
    `;
    parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementsStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};