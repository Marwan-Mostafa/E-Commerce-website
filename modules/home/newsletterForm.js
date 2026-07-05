import { validateEmail } from '../../utils/validateEmail.js';

export function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('newsletter-email');
    const messageEl = document.getElementById('newsletter-msg');

    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = emailInput.value;

        if (!validateEmail(email)) {
            messageEl.textContent = 'Please enter a valid email address.';
            messageEl.classList.add('text-red-600');
            messageEl.classList.remove('text-green-600');
            return;
        }

        messageEl.textContent = 'Thanks for subscribing!';
        messageEl.classList.add('text-green-600');
        messageEl.classList.remove('text-red-600');
        form.reset();
    });
}