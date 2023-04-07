/**
 * Utils scripts, shared by every scraping extensions
 *
 * Create a `Scrap` object, usable to:
 * - create a Download button
 * - easily scrap website
 */

const MAIN_COLOR = "#6C0026"
const MAIN_LIGHT_COLOR = "#7A193B"

const styleSheet = `
    .scrap-button {
        background-color: ${MAIN_COLOR};
        color: #ffffff;
        font-weight: bold;
        position: fixed;
        right: 1rem;
        bottom: 1rem;
        z-index: 500;
        border: none;
        border-radius: 1em;
    }

    .scrap-button:before {
        content: "";
        position: absolute;
        border : 1px solid transparent;
        top: -15%;
        left: 10%;
        width: 0;
        border-radius: 40%;
        transform: translate3d(-50%, 0, 0);
    }

    @keyframes backforth {
        0% {
            left: 10%;
            width: 0;
        }
        25% {
            width: 50%;
        }
        50% {
            left: 90%;
            width: 0;
        }
        75% {
            width: 50%;
        }
        100% {
            left: 10%;
            width: 0;
        }
    }

    .scrap-button.loading:before {
        border: 1px solid #34495e;
        animation: backforth 1s ease-in-out;
        animation-iteration-count: infinite;
    }

    .scrap-icon-button {
        display: inline-block;
        width: 4em;
        padding: 1em;
        fill: white;
        border-radius: 1em;

        transition : all .3s;
        -wekit-transition : all .3s;
        -moz-transition : all .3s;
    }

    .scrap-icon-button:hover {
        background-color: rgba(255, 255, 255, 0.2);
        cursor: pointer;
    }

    #scrap-toast-container {
        position: fixed;
        left: 0;
        width: 100%;
        bottom: 0;
        z-index: 500;
        text-align: center;
    }

    @keyframes fadein {
        from {opacity: 0;}
        to {opacity: 1;}
    }

    #scrap-toast {
        display: inline-block;

        margin: 2em;
        width: fit-content;
        padding: 0.8em 1.5em;

        font-weight: bold;
        color: white;
        background-color: #444444;

        border-radius: 3px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

        animation-name: fadein;
        animation-duration: 0.3s;
    }

    #scrap-toast.success {
        background-color: #2e7d32;
    }

    #scrap-toast.error {
        background-color: #d32f2f;
    }

    #scrap-toast.warning {
        background-color: #ed6c02;
    }
`
const style = document.createElement('style');
if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(styleSheet));
}
document.querySelector("head").append(style)

const qs = (any) => document.querySelector(any)
const qsa = (any) => document.querySelectorAll(any)

/**
 * Create an HTML element
 * @param {object} options
 * @returns {HTMLElement}
 */
const createElement = ({
    tagname = "div",
    id = undefined,
    className = undefined,
    parent = undefined,
    text = undefined,
    html = undefined
} = {}) => {
    element = document.createElement(tagname)
    if (id) {
        element.id = id
    }
    if (className) {
        for (const aClass of className.split(" ")) {
            element.classList.add(aClass.trim())
        }
    }
    if (text) {
        element.innerText = text
    }
    if (html) {
        element.innerHTML = html
    }
    if (parent) {
        parent.appendChild(element)
    }
    return element
}

const mainButton = createElement({
    tagname: "div",
    className: "scrap-button",
    parent: qs("body"),
})

const addScrapButton = ({
    add,
    exportCsv,
    exportJson
} = {}) => {
    if (exportJson) {
        const jsonButton = createElement({
            tagname: "div",
            className: "scrap-icon-button",
            parent: mainButton,
            html: ICONS.file_json
        })
        jsonButton.setAttribute("title", "Export to JSON")
        jsonButton.onclick = exportJson
    }

    if (exportCsv) {
        const csvButton = createElement({
            tagname: "div",
            className: "scrap-icon-button",
            parent: mainButton,
            html: ICONS.file_csv
        })
        csvButton.setAttribute("title", "Export to CSV")
        csvButton.onclick = exportCsv
    }
}

const toastContainer = createElement({
    tagname: "div",
    id: "scrap-toast-container",
    parent: qs("body"),
})
const toastElement = createElement({
    tagname: "div",
    id: "scrap-toast"
})
const toast = (message, type = undefined) => {
    console.log("TOAST", message)
    toastElement.innerText = message
    toastContainer.appendChild(toastElement)
    if (type === "success" || type === "error" || type === "warning") {
        toastElement.classList.add(type)
    }
    setTimeout(() => {
        toastElement.animate({
            opacity: "-1"
        }, 300);
        setTimeout(() => {
            toastElement.remove()
            toastElement.classList.remove("success", "error", "warning")
        }, 300)
    }, 3000)
}

const setLoading = (loading = true) => {
    if (loading) {
        mainButton.classList.add("loading")
    } else {
        mainButton.classList.remove("loading")
    }
}

window.Scrap = {
    qs,
    qsa,
    createElement,
    addScrapButton,
    toast,
    setLoading
}
