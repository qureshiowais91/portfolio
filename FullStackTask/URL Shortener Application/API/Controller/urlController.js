const { Errorhandler } = require("../util/ErrorHandle");
const { URL_EVENTS } = require("../Event/EventTypes");
const User = require("../Model/UserModel");
const URL = require("../Model/URLModel");
const { generateRandomCode } = require("../util/genrateRandome")

async function createShortURL(req, res) {
    const { userId, longURL } = req.body;

    // Validate user existence based on userId (you may need to customize this validation)
    const userExists = await User.findById(userId);
    console.log(userExists)
    if (!userExists) {
        throw new Errorhandler(URL_EVENTS.URL_CREATION_FAILED, "User not found", 404);
    }

    const urlId = generateRandomCode();
    const shortURL = `${process.env.FRONTEND_URL}${urlId}`;

    const urlCreatedEvent = {
        eventType: URL_EVENTS.URL_CREATED,
        eventData: { longURL, shortURL, userId }
    };

    // Your URL creation logic here
    const createURL = {
        longURL: urlCreatedEvent["eventData"].longURL,
        shortURL: urlCreatedEvent["eventData"].shortURL,
        creator: urlCreatedEvent["eventData"].userId
    }

    const urlData = await URL.create(createURL);

    if (!urlData) {
        throw new Errorhandler(URL_EVENTS.URL_CREATION_FAILED, "Server Error", 500);
    }

    // Additional logic to handle URL creation
    res.status(201).json({ message: 'URL created successfully', urlData });
}

async function clickShortURL(req, res) {
    const { userId, urlId } = req.query;

    // Validate user existence based on userId (you may need to customize this validation)
    const userExists = await User.findById(userId);
    if (!userExists) {
        throw new Errorhandler(URL_EVENTS.SHORT_URL_CLICKED, "User not found", 404);
    }
    const shortURL = `${process.env.FRONTEND_URL}${urlId}`;

    const filter = { shortURL: shortURL }

    const URLData = await URL.find(filter);

    const update = { clickCount: (URLData[0].clickCount + 1) }

    const updateURLData = await URL.updateOne(filter, update, { new: true })

    // Your URL click logic here
    const urlClickedEvent = {
        eventType: URL_EVENTS.SHORT_URL_CLICKED,
        eventData: { updateURLData }
    };

    // Additional logic to handle URL click
    res.status(200).json({ message: 'URL clicked successfully', urlClickedEvent });
}


async function clickCount(req, res, next) {
    const { userId,urlId } = req.query;

    const userExists = await User.findById(userId);

    if (!userExists) {
        throw new Errorhandler(URL_EVENTS.SHORT_URL_CLICKED, "User not found", 404);
    }

    const shortURL = `${process.env.FRONTEND_URL}${urlId}`;
    const URLData = await URL.find({creator:userId,shortURL:shortURL});

    // const URLData = await URL.find({ creator: userId,shortURL:});
    res.status(200).json({ message: 'URL clicked successfully', URLData });
}


module.exports = {
    createShortURL,
    clickShortURL,
    clickCount
};
