//https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/write


(function () {
    const DEBUG = true

    const log = (...data) => {
        if (DEBUG) {
            console.log("[Malt scrap]", ...data)
        }
    }

    button = Scrap.addScrapButton()

    button.onclick = () => {
        log("Scrapping starts")
    }
    log("Ok")
})()


