const { Errorhandler } = require("../util/ErrorHandle");
const { URL_EVENTS } = require("../Event/EventTypes");
const User = require("../Model/UserModel");


async function createURL(req, res) {
    const { userId, url } = req.body;

    // Validate user existence based on userId (you may need to customize this validation)
    const userExists = await User.findById(userId);
    if (!userExists) {
        throw new Errorhandler(URL_EVENTS.URL_CREATED, "User not found", 404);
    }

    // Your URL creation logic here

    const urlCreatedEvent = {
        eventType: URL_EVENTS.URL_CREATED,
        eventData: { userId, url }
    };

    

    // Additional logic to handle URL creation

    res.status(201).json({ message: 'URL created successfully', urlCreatedEvent });
}

async function clickURL(req, res) {
    const { userId, urlId } = req.params;

    // Validate user existence based on userId (you may need to customize this validation)
    const userExists = await User.findById(userId);
    if (!userExists) {
        throw new Errorhandler(URL_EVENTS.SHORT_URL_CLICKED, "User not found", 404);
    }

    // Your URL click logic here

    const urlClickedEvent = {
        eventType: URL_EVENTS.SHORT_URL_CLICKED,
        eventData: { userId, urlId, /* Include other relevant data for URL click */ }
    };

    // Additional logic to handle URL click

    res.status(200).json({ message: 'URL clicked successfully', urlClickedEvent });
}

module.exports = {
    createURL,
    clickURL,
};
