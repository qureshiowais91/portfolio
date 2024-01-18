const baseUrl = '127.0.0.1:3000';

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
        return response;
    } catch (error) {
        console.log("true");
        console.error(error.message);
        return true
    }
};