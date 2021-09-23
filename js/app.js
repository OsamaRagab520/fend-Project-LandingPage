/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navbar = document.querySelector('#navbar__list');
/**
 * End Global Variables
 * Start Helper Functions
 *
*/

const fragment = document.createDocumentFragment();

function bulidNav() {
    for (const section of sections) {

        // Create required elements
        const navItem = document.createElement('li');
        const navlink = document.createElement('a');

        // Set a tag attributes
        navlink.className = 'menu__link';
        navlink.textContent = section.getAttribute('data-nav');

        // Embed the newly create a tag element to the list item then append it the fragment to append at the end to the DOM
        navItem.appendChild(navlink);
        fragment.appendChild(navItem);
    }
    // Append the navitems at the end to avoid necessary overhead for brower to repaint each time we append item
    navbar.appendChild(fragment);
}

function isInView(element) {

    // Check whether the section on view or not
    if (element.offsetTop >= window.scrollY && element.offsetTop <= window.scrollY + window.innerHeight) {
        return true
    }
    else {
        return false
    }
}

function manageSectionActiveState() {

    // Sets the class name of current viewed section/s to your-active-class and deactivate otherwise
    for (const section of sections) {
        if (isInView(section)) {
            section.className = 'your-active-class';
        }
        else {
            section.removeAttribute('class');
        }
    }
}

function getSectionOffset(sectionName) {

    // Itrate through the section to find the corresponding element with given data  
    for (const section of sections) {
        if (section.dataset.nav == sectionName) {
            return section.offsetTop;
        }
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
bulidNav();

// Add class 'active' to section when near top of viewport
document.querySelector('section').className = 'your-active-class';


/**
 * End Main Functions
 * Begin Events
 *
*/

// Scroll to section on link click
navbar.addEventListener('click', e => {
    scrollTo({
        top: getSectionOffset(e.target.textContent),
        left: 0,
        behavior: 'smooth'
    });
})
// Set sections as active
document.addEventListener('scroll', manageSectionActiveState)


