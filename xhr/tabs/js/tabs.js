const tabs = document.querySelectorAll('.tabs a');
const content = document.getElementById('content');
const preloader = document.getElementById('preloader');
const emailTab = tabs[0];
const smsTab = tabs[1];

function getTabContent(tab) {
    function onLoad() {
        content.innerHTML = xhr.responseText;
    };

    function toggleLoader() {
        preloader.classList.toggle('hidden');
    };

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLoad);
    xhr.addEventListener('loadstart', toggleLoader);
    xhr.addEventListener('loadend', toggleLoader);

    xhr.open(
        "GET",
        tab.getAttribute('href')
    );

    xhr.send();
};

getTabContent(emailTab);

for (const tab of tabs) {

    tab.addEventListener('click', (event) => {
        event.preventDefault();
        tab.classList.add('active');
        
        switch (event.target.href) {
            case emailTab.href:
                smsTab.classList.remove('active');
                break;
            case smsTab.href:
                emailTab.classList.remove('active');
                break;
        }

        getTabContent(tab);
    });
}