function generateRandomCode() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let randomCode = '';

    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        randomCode += letters.charAt(randomIndex);
    }

    return randomCode;
}

module.exports = { generateRandomCode }