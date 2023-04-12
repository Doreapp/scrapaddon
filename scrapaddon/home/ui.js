/**
 * UI utilities
 */

(function () {
    const UI = {}

    /**
     * Builds a table's content
     * @param {string} query Text query to the table element, e.g. "table.my-classe"
     * @param {string[]} headers List of the table headers
     * @param {string[][]} rows List of rows. A row is a list of value to put in the table. rows[1][2] is the 3rd cell of the 2nd row.
     * @param {string[]} ids Optional list of ids
     */
    UI.buildTable = (query, headers, rows, ids = undefined) => {
        const table = qs(query)
        if (!table) {
            throw new Error(`Unable to find a table from query '${query}'`)
        }
        const headersRows = createElement({
            tagname: "tr",
            parent: table
        })
        for (const header of headers) {
            createElement({
                tagname: "th",
                parent: headersRows,
                text: header
            })
        }
        let index = 0;
        for (const row of rows) {
            const rowElement = createElement({
                tagname: "tr",
                parent: table
            })
            const id = ids ? ids[index++] : undefined
            if (id) {
                rowElement.setAttribute("id", id)
            }
            for (const cell of row) {
                createElement({
                    tagname: "td",
                    parent: rowElement,
                    html: cell
                })
            }
        }
    }

    window.UI = UI
})()
