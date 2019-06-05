var exec = require('cordova/exec');

module.exports = {
    flush: function (successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'CookieManagementPlugin', 'flush', []);
    },

    remove: function (successCallback, errorCallback, domain, cookieName) {
        exec(successCallback, errorCallback, 'CookieManagementPlugin', 'remove', [domain, cookieName]);
    }
};