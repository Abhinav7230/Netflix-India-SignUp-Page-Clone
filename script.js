let currentActiveFaq = null;
function toggleFaq(faqContainer) {
    const answerDiv = faqContainer.nextElementSibling;
    const icon = faqContainer.querySelector('.icon');

    if (answerDiv.classList.contains('visible')) {
        answerDiv.classList.remove('visible');
        icon.classList.remove('rotate');
        currentActiveFaq = null;
    } else {
        if (currentActiveFaq && currentActiveFaq !== faqContainer) {
            currentActiveFaq.nextElementSibling.classList.remove('visible');
            currentActiveFaq.querySelector('.icon').classList.remove('rotate');
        }
        answerDiv.classList.add('visible');
        icon.classList.add('rotate');
        currentActiveFaq = faqContainer;
    }
}

document.addEventListener('click', function (event) {
    const faqContainers = document.querySelectorAll('.faq-container');
    let isClickInsideFaq = false;
    faqContainers.forEach(faq => {
        if (faq.contains(event.target)) {
            isClickInsideFaq = true;
        }
    });

    if (!isClickInsideFaq && currentActiveFaq) {
        currentActiveFaq.nextElementSibling.classList.remove('visible');
        currentActiveFaq.querySelector('.icon').classList.remove('rotate');
        currentActiveFaq = null;
    }
});

function updateSpan(event) {
    const dropdown = event.target;
    const span = dropdown.previousElementSibling;
    span.textContent = dropdown.options[dropdown.selectedIndex].text;
}

window.onload = function () {
    const dropdowns = document.querySelectorAll("select");
    dropdowns.forEach(dropdown => {
        const span = dropdown.previousElementSibling;
        span.textContent = dropdown.options[dropdown.selectedIndex].text;
        dropdown.addEventListener("change", updateSpan);
    });
};


const scrollButton = document.querySelector('.scroll-button');
const tabMovies = document.querySelector('.tab-movies');
const buttonScrollDiv = document.querySelector('.button-scroll');

const scrollDuration =1500; // Adjust this value to control scroll speed

// Custom smooth scroll function
function smoothScroll(targetPosition, duration) {
    const startPosition = tabMovies.scrollLeft;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        tabMovies.scrollLeft = startPosition + (distance * easeInOutQuad(progress));

        if (elapsedTime < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Easing function (smooth acceleration and deceleration)
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

// Scroll behavior on button click
scrollButton.addEventListener('click', () => {
    const state = scrollButton.getAttribute('data-state');

    // Fade out button before scrolling
    buttonScrollDiv.classList.add('hidden');

    setTimeout(() => {
        if (state === 'end') {
            // Scroll to the end with custom animation
            smoothScroll(tabMovies.scrollWidth, scrollDuration);

            // Move button to the left
            buttonScrollDiv.style.right = 'auto';
            buttonScrollDiv.style.left = '0';

            scrollButton.setAttribute('data-state', 'start');
            scrollButton.querySelector('img').src = './assets/scrollstart.svg';
        } else {
            // Scroll to the start with custom animation
            smoothScroll(0, scrollDuration);

            // Move button to the right
            buttonScrollDiv.style.left = 'auto';
            buttonScrollDiv.style.right = '0';

            scrollButton.setAttribute('data-state', 'end');
            scrollButton.querySelector('img').src = './assets/scrollend.svg';
        }

        // Fade button back in
        setTimeout(() => {
            buttonScrollDiv.classList.remove('hidden');
        }, 200);  // Fade in delay
    }, 300);  // Matches fade-out duration
});

// Ensure the scroll position is initialized correctly when the page loads
window.addEventListener('load', () => {
    if (tabMovies.scrollLeft === 0) {
        scrollButton.setAttribute('data-state', 'end');
        scrollButton.querySelector('img').src = './assets/scrollend.svg';
    }
});
