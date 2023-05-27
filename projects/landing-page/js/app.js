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
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const mainHeading = document.querySelector('main');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
 * function with a loop for addding 4 sections of HTML:
 * new sections will be appended starting after section 4, last section to be created is  nr. 7
 * create variable for dynamic section id and data attribute nav
 * set dynamic id and data attribute
 * create new div element and append it as a child to the section
 * add a class to the div element
 * create a new h2 element and append it as a child to the section
 * set dynamic text content of the h2
 * create new paragraph, create new text content and append the paragraph as a child to the div element
 * append the whole section to the main heading part of the document
*/
function addHtmlContent {
    for (let x=4; x<=7; x++) {
        const newSection = document.createElement('section');
        const sectionId = 'section'+ x;
        const sectionNav = 'Section '+ x;

        newSection.setAttribute('id', 'sectionId');
        newSection.dataset.nav = 'SectionNav';

        const divElement = newSection
        .appendChild(document.createElement('div'));
        divElement.classList.add('landing__container');

        const h2 = divElement
        .appendChild(document.createElement('h2'));
        h2.textContent = sectionNav;

        const newParagraph = document.createElement('p')
        newParagraph.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.';
        divElement.appendChild(newParagraph);

        mainHeading.appendChild(newSection);
    }
}

addHtmlContent();

// build the navbar


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


