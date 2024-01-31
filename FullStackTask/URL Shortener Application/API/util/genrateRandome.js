function generateRandomCode() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomCode = '';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        randomCode += letters.charAt(randomIndex);
    }

    return randomCode;
}

module.exports = { generateRandomCode }