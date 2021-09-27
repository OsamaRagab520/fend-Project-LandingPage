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

// My old implementation of managing active sate for the sections
/*
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
*/

// Code review suggested to use APIs instead,
// because they more effective and mostly uniform irrespective of the platform

// New Implementation using IntersectionObserver
function manageActiveState() {

    // Creating an intersection observer that triggers active state for the observed section
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.className = 'your-active-class'
            }
            else {
                entry.target.removeAttribute('class');
            }
        })
    }, { rootMargin: '-100px' });

    // Set the observer to observe all page's sections
    sections.forEach(section => {
        observer.observe(section);
    })

}

function getSectionOffset(sectionName) {

    // Iterate through the section to find the corresponding element with given data
    for (const section of sections) {
        if (section.dataset.nav == sectionName) {
            return section.offsetTop - 100;
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


/**
 * End Main Functions
 * Begin Events
 *
*/

// Scroll to section on link click
navbar.addEventListener('click', e => {

    // To prevent the default action of a tags of redirecting if href attr is set
    e.preventDefault();

    // Navigate the user to the desired section of the page
    scrollTo({
        top: getSectionOffset(e.target.textContent),
        left: 0,
        behavior: 'smooth'
    });
})

// Set sections as active
manageActiveState();

