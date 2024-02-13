const { Errorhandler } = require("../util/ErrorHandle");
const { URL_EVENTS } = require("../Event/EventTypes");
const User = require("../Model/UserModel");
const URL = require("../Model/URLModel");
const { generateRandomCode } = require("../util/genrateRandome")

async function createShortURL(req, res) {
    const { longURL } = req.body;
    const userId = req.body.id;
    // console.log(req)

    if (!longURL) {
        throw new Errorhandler(URL_EVENTS.URL_CREATION_FAILED, "Long URL not found", 404);
    }

    // Validate user existence based on userId (you may need to customize this validation)
    const userExists = await User.findById(userId);
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
    // console.log(req)
    const { urlId } = req.query;
    console.log(urlId)
    const shortURL = `${process.env.FRONTEND_URL}${urlId}`;
    console.log(shortURL)
    const filter = { shortURL: shortURL }
    console.log(filter);
    const URLData = await URL.findOne(filter);
    console.log(URLData)
    if (!URLData) {
        throw new Errorhandler(URL_EVENTS.SHORT_URL_CLICKED, "Server Error", 500);
    }
    const update = { clickCount: (URLData.clickCount + 1) }

    const updateURLData = await URL.updateOne(filter, update, { new: true })

    // Your URL click logic here
    const urlClickedEvent = {
        eventType: URL_EVENTS.SHORT_URL_CLICKED,
        eventData: { URLData, updateURLData }
    };

    // Additional logic to handle URL click
    res.status(200).json({ message: 'URL clicked successfully', urlClickedEvent });
}


async function clickCount(req, res, next) {
    const { userId, urlId } = req.query;

    const userExists = await User.findById(userId);

    if (!userExists) {
        throw new Errorhandler(URL_EVENTS.SHORT_URL_CLICKED, "User not found", 404);
    }

    const shortURL = `${process.env.FRONTEND_URL}${urlId}`;
    const URLData = await URL.find({ creator: userId, shortURL: shortURL });

    // const URLData = await URL.find({ creator: userId,shortURL:});
    res.status(200).json({ message: 'URL clicked successfully', URLData });
}


module.exports = {
    createShortURL,
    clickShortURL,
    clickCount
};
