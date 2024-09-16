# Router

Router is a simple JavaScript library to manage section navigation.

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Options](#options)
-   [License](#license)
-   [Repository](#repository)
-   [Author](#author)

## Installation

Clone the repository or download the files directly:

```
git clone https://github.com/CRISvsGAME/router.git
```

Include the CSS and JS files in your project:

```
<link rel="stylesheet" href="assets/css/router.css">
<script src="assets/js/router.js"></script>
```

## Usage

-   Add the HTML structure with as many sections and buttons as required:

```
<div id="router">
    <div id="section1" class="router-section">Section 1 Content</div>
    <div id="section2" class="router-section">Section 2 Content</div>
    <div id="section3" class="router-section">Section 3 Content</div>
    <button class="router-button" data-section="section1">Go to Section 1</button>
    <button class="router-button" data-section="section2">Go to Section 2</button>
    <button class="router-button" data-section="section3">Go to Section 3</button>
</div>
```

-   Initialize the Router:

Accepting Defaults:

```
const router = new Router('router', {
    sectionIds: ['section1', 'section2', 'section3'],
    defaultSection: 'section1'
});
```

Passing Options:

```
const router = new Router('router', {
    sectionIds: ['section1', 'section2', 'section3'],
    defaultSection: 'section1',
    initialDelay: 0,
    sectionDelay: 0,
    saveState: true,
    pageLoadCallback: (props) => {
        console.log(`Default Section: ${props.defaultSection}`);
        console.log(`Active Section: ${props.activeSection}`);
        console.log(`Saved Section: ${props.savedSection}`);
    },
    buttonClickCallback: (props) => {
        console.log(`Current Section: ${props.event.currentTarget.dataset.section}`);
        console.log(`Default Section: ${props.defaultSection}`);
        console.log(`Active Section: ${props.activeSection}`);
        console.log(`Saved Section: ${props.savedSection}`);
    }
});
```

-   Configure the section properties through CSS (example):

```
#section1 {
    background-color: red;
}

#section2 {
    background-color: green;
}

#section3 {
    background-color: blue;
}

.router-section {
    margin-bottom: 2rem;
    padding: 2rem;
    display: none;
}

.router-section.active {
    display: block;
}

.router-button {
    padding: 1rem;
    background-color: black;
    color: white;
    cursor: pointer;
}

.router-button.active {
    background-color: white;
    color: black;
}
```

## Options

You can configure Router with the following options:

-   **sectionIds**: Array of section IDs.
-   **defaultSection**: Default section ID to display initially.
-   **initialDelay**: Initial delay in milliseconds before starting.
-   **sectionDelay**: Delay in milliseconds before changing the section.
-   **saveState**: Save the active section to local storage.
-   **pageLoadCallback**: Callback function for page loads, containing the default, active, saved section IDs.
-   **buttonClickCallback**: Callback function for button clicks, containing the event and the default, active, saved section IDs.

## License

This project is licensed under the MIT License - see the [License](https://crisvsgame.com/license) file for details.

## Repository

[GitHub](https://github.com/CRISvsGAME/router)

## Author

[@CRISvsGAME](https://crisvsgame.com)
