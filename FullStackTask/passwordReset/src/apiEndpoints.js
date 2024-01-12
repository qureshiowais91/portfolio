const baseUrl = 'https://resetpasswordurl.onrender.com';

const headers = {
    'Content-Type': 'application/json',
};

export const sendRequest = async (path, data, method) => {
    try {
        const response = await fetch(`${baseUrl}${path}`, {
            method: method.toUpperCase(),
            headers: headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        console.log("false");
        return true;
    } catch (error) {
        console.log("true");
        console.error(error.message);
        return false
    }
};