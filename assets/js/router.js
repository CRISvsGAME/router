/*!
 * Router 1.0.0 by @CRISvsGAME - https://crisvsgame.com
 * Repository - https://github.com/CRISvsGAME/router.git
 * License - https://crisvsgame.com/license (MIT License)
 * Copyright 2024 @CRISvsGAME
 */

/**
 * Options for configuring the Router.
 * @typedef {Object} RouterOptions
 * @property {string[]} [sectionIds=[]] - Array of section IDs.
 * @property {string} [defaultSection=''] - Default section ID to display initially.
 * @property {number} [initialDelay=0] - Initial delay in milliseconds before starting.
 * @property {number} [sectionDelay=0] - Delay in milliseconds before changing the section.
 * @property {boolean} [saveState=true] - Save the active section to local storage.
 * @property {function} [refreshPageCallback=null] - Callback function for page refreshes,
 * containing the saved section ID.
 * @property {function} [buttonClickCallback=null] - Callback function for button clicks,
 * containing the event and the current section ID.
 */

class Router {
    /**
     * Creates a new Router instance.
     * @param {string} [containerId='router'] - The ID of the container element.
     * @param {RouterOptions} [options={}] - Configuration options for the Router.
     */
    constructor(containerId = 'router', options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error(`Container element with ID "${containerId}" not found`);
        }
        this.activeSection = '';
        this.savedSection = localStorage.getItem('savedSection') || '';
        this.sectionTimeout = null;
        this.options = {
            sectionIds: [],
            defaultSection: '',
            initialDelay: 0,
            sectionDelay: 0,
            saveState: true,
            refreshPageCallback: null,
            buttonClickCallback: null,
            ...options,
        };
        this.sections = {};
        this.options.sectionIds.forEach((id) => {
            this.sections[id] = document.getElementById(id);
        });
        this.buttons = {};
        Array.from(this.container.querySelectorAll('.router-button')).forEach((button) => {
            if (!this.buttons[button.dataset.section]) {
                this.buttons[button.dataset.section] = [];
            }
            this.buttons[button.dataset.section].push(button);
            button.addEventListener('click', (event) => {
                if (typeof this.options.buttonClickCallback === 'function') {
                    this.options.buttonClickCallback(event, this.activeSection);
                }
                this.#changeSection(button.dataset.section, this.options.sectionDelay);
            });
        });
        if (this.options.saveState && this.savedSection) {
            this.#changeSection(this.savedSection, this.options.initialDelay);
            if (typeof this.options.refreshPageCallback === 'function') {
                this.options.refreshPageCallback(this.savedSection);
            }
        } else {
            this.#changeSection(this.options.defaultSection, this.options.initialDelay);
        }
    }

    /**
     * Changes the active section with delay if specified.
     * @param {string} section - The section to activate.
     * @param {number} [delay=0] - Delay in milliseconds before changing the section.
     * @private
     */
    #changeSection(section, delay = 0) {
        if (section === this.activeSection) {
            return;
        }
        clearTimeout(this.sectionTimeout);
        if (!delay) {
            this.#handleSection(section);
        } else {
            this.sectionTimeout = setTimeout(() => {
                this.#handleSection(section);
            }, delay);
        }
    }

    /**
     * Handles the actual change of sections.
     * @param {string} section - The section to activate.
     * @private
     */
    #handleSection(section) {
        const oldSection = this.sections[this.activeSection];
        const newSection = this.sections[section];
        const oldButtons = this.buttons[this.activeSection];
        const newButtons = this.buttons[section];
        if (oldSection) oldSection.classList.remove('active');
        if (newSection) newSection.classList.add('active');
        if (oldButtons) oldButtons.forEach((button) => button.classList.remove('active'));
        if (newButtons) newButtons.forEach((button) => button.classList.add('active'));
        if (this.options.saveState) localStorage.setItem('savedSection', section);
        this.activeSection = section;
    }
}
