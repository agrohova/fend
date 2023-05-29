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
 * This section was suggested by this template.
 * Other variables needed to be placed below the Add HTML content function, otherwise the code wouldn't work properly on the newly added sections.
*/
const mainHeading = document.querySelector('main');

/**
 * End Global Variables
*/

/**
 * Begin Main Functions
 * 
*/

/**
 function to add HTML content 
 * for loop used for addding 4 sections of HTML:
 * new sections will be appended starting after section 3, last section to be created is  nr. 7
 * uses global variable mainheading
 * uses a for loop instead of for-each, as this is the one I'm most confident in
 * appends a class landing__container, that was already provided in the CSS file of the project
*/
function addHtmlContent() {
    for (let x=4; x<=7; x++) {
        const newSection = document.createElement('section');
        const sectionId = 'section'+ x;
        const sectionNav = 'Section '+ x;

        newSection.setAttribute('id', sectionId);
        newSection.dataset.nav = sectionNav;

        const divElement = newSection
        .appendChild(document.createElement('div'));
        divElement.classList.add('landing__container');

        const h2 = divElement
        .appendChild(document.createElement('h2'));
        h2.textContent = sectionNav;

        const newParagraph = document.createElement('p')
        newParagraph.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.';
        divElement.appendChild(newParagraph);

        mainHeading.append(newSection);
    }
}

addHtmlContent();

/**
 function to build the navbar
 * function with a for loop builds navbar dynamically for every added section
 * variables for these function need to be declared after the page sections are created dynamically, that's why they're declarad here and not in the global variables section
 * (if they would be declared at the top, we'd only worked with the original sections)
 * using classes already provided in the CSS document
 * creates li and a elements to populate the navbar
*/
const navbarList = document.querySelector('ul');
const sections = document.querySelectorAll('section');
const sectionTitle = document.querySelectorAll('h2');

function buildNavbar() {
    for (let x = 0; x < sections.length; x++) {
    const section = sections[x];
    const menuElement = document.createElement('li');
    const anchorLink = document.createElement('a'); 
    
    const menuItem = sectionTitle[x].innerHTML;

    anchorLink.textContent = menuItem;
    anchorLink.href = `#${section.id}`; 
    
    menuElement.appendChild(anchorLink); 
    menuElement.classList.add('menu__link');
    
    navbarList.append(menuElement);
    }
}

buildNavbar();

/**
 function to add class 'active' to section when near top of viewport
 * using a for loop to iterate through document sections and find which one is active 
 * the getBoundingclientRect() and the box top and bottom dimensions were recommended in a Udacity Knowledge post
 * the your-active-class was provided in the CSS file
 * the active class was created new
*/
const navLinks = document.querySelectorAll('.menu__link');

function makeActive() {
    for (let x = 0; x < sections.length; x++) {
        const section = sections[x];
        const navLink = navLinks[x];
        const box = section.getBoundingClientRect();
        
        if (box.top <= 150 && box.bottom >= 150) {
            section.classList.add('your-active-class');
            navLink.classList.add('active');
        } else {
            section.classList.remove('your-active-class');
            navLink.classList.remove('active');
        }
    }
}

makeActive();

/**
 Function to scroll slowly to the viewport
 * using a for loop to add an event listener to the dynamically created menu links (a elements)
 * using preventDefault() to stop the expected behavior of quick scrolling
 * my code didn't work when I placed the event listeners somewhere else in the code, that's why they're here
 * the event listener for this function is in the Events section suggested by this template
*/
const menuLinks = document.querySelectorAll('a');

function slowScrollToViewport() {
    for (let x = 0; x < sections.length; x++) {
        const menuLink = menuLinks[x];

        menuLink.addEventListener("click", function (eve) {
            eve.preventDefault();

            const targetAnchor = document.querySelector(menuLink.getAttribute('href'));
            if (targetAnchor) {
                targetAnchor.scrollIntoView({behavior: 'smooth'});
                makeActive();
            } 
        });
    }
}

slowScrollToViewport();


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Set sections as active
document.addEventListener("scroll", makeActive);

