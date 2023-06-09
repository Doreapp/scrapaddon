/**
 * Store of persisted data
 */

class Store {
    constructor(name = "airbnbscraper") {
        this.name = name
    }

    /**
     * Get a value from the store
     * @param {string} key
     * @returns
     */
    async get(key) {
        return await browser.storage.local.get(key)
    }

    /**
     * Set a named value into the store
     * @param {string} key
     * @param {any} value
     */
    async set(key, value) {
        await browser.storage.local.set({ [key]: value })
    }

    /**
     * Add an element (parsed on Airbnb)
     * @param {any} element
     * @returns {number} Updated number of elements
     */
    async addElement(element) {
        const key = `${this.name}-elements`
        let elements = await this.getElements()
        if (elements === null || elements === undefined) {
            elements = [element]
        } else {
            elements.push(element)
        }
        this.set(key, elements)
        return elements.length
    }

    /**
     * Get the saved elements
     * @returns {any[]} List of saved elements
     */
    async getElements() {
        const key = `${this.name}-elements`
        return (await this.get(key))[key]
    }

    /**
     * Remove all the elements stored
     */
    async clearElements() {
        const key = `${this.name}-elements`
        await this.set(key, undefined)
    }
}