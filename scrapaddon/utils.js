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
        padding: 1em;
        background-color: ${MAIN_COLOR};
        color: #ffffff;
        font-weight: bold;
        position: fixed;
        right: 1rem;
        bottom: 1rem;
        z-index: 500;
        border: none;
        border-radius: 0.5rem;
    }

    .scrap-icon-button {
        width: 1.5rem;
        fill: white;
    }

    .scrap-icon-button:hover {
        opacity: 0.9;
        cursor: pointer;
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

const addScrapButton = ({
    add,
    exportCsv,
    exportJson
} = {}) => {
    const root = qs("body")

    const container = createElement({
        tagname: "div",
        className: "scrap-button",
        parent: root,
    })

    const jsonButton = createElement({
        tagname: "div",
        className: "scrap-icon-button loading",
        parent: container,
        html: ICONS.file_json
    })
    jsonButton.onclick = exportJson
}

window.Scrap = {
    qs,
    qsa,
    createElement,
    addScrapButton
}
