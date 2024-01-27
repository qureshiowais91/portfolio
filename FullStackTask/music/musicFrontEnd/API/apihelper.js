const baseUrl = 'https://musicplayerapi.onrender.com';

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
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        console.error(error.message);
        return error
    }
};