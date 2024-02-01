const USER_EVENTS = {
    USER_REGISTERED: 'UserRegistered',
    ACCOUNT_ACTIVATED: 'AccountActivated',
    USER_LOGGED_IN: 'UserLoggedIn',
    ACCOUNT_ACTIVATION_FAILED: 'AccountActivationFailed',
    LOGIN_ATTEMPT_FAILED: 'LoginAttemptFailed',
    PASSWORD_RESET: 'PasswordReset',
};

const URL_EVENTS = {
    URL_CREATED: 'URLCreated',
    URL_CREATION_FAILED:'URLCreationFailed',
    SHORT_URL_CLICKED: 'ShortURLClicked',
};


module.exports={USER_EVENTS,URL_EVENTS}