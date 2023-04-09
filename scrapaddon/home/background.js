browser.browserAction.onClicked.addListener(function () {
    browser.tabs.create({
        'url': browser.extension.getURL('home/index.html')
    });
});
