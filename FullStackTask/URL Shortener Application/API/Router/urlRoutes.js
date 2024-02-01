const express = require('express');
const router = express.Router();
const { asyncHandler } = require("../util/asyncHandler");

// Import controllers or functions handling URL-related events
const {
    createShortURL,
    clickShortURL,
    clickCount
} = require("../Controller/urlController");

// URL Creation Endpoint
router.post('/create-url', asyncHandler(createShortURL));

// URL Clicked Endpoint
router.get('/click', asyncHandler(clickShortURL));
router.get('/analytics', asyncHandler(clickCount));

module.exports = router;
