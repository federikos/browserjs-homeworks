const articles = Array.from(document.querySelector('.tabs-content').children);
const tabList = document.querySelector('.tabs-nav');
const oldTab = tabList.firstElementChild;
const tabTemplate = tabList.removeChild(oldTab);

function changeClasses(arr, method, nameOfClass) {
    Array.from(arr).forEach(el => el.classList[method](nameOfClass));
}

function toggleTab(article, tab) {
    const currentArticle = article;
    changeClasses(tab.parentElement.children, 'remove', 'ui-tabs-active');
    tab.classList.add('ui-tabs-active');
    changeClasses(articles, 'add', 'hidden');
    currentArticle.classList.remove('hidden');
}

for (article of articles) {
    
    function createTab() {
        const currentArticle = article;
        const tab = tabTemplate.cloneNode(true);
        tab.firstElementChild.innerText = article.dataset.tabTitle;
        tab.firstElementChild.classList.add(article.dataset.tabIcon);
    
        tab.addEventListener('click', () => {
            toggleTab(currentArticle, tab);
        });

        tabList.appendChild(tab);
    };

    createTab();
};

function init() {
    const newTabList = document.querySelector('.tabs-nav');
    toggleTab(articles[0], newTabList.firstElementChild);
}

init();