export function validateEmail(email) {
    const trimmed = email.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(trimmed);
}