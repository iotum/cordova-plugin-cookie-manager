var exec = require('cordova/exec');

module.exports = {
    flush: function (successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'CookieManagementPlugin', 'flush', []);
    },

    remove: function (domain, cookieName, successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'CookieManagementPlugin', 'remove', [domain, cookieName]);
    }
};