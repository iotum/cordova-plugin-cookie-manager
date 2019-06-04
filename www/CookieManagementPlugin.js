var exec = require('cordova/exec');

module.exports = {
    flush: function (successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'CookieManagementPlugin', 'flush', []);
    },

    remove: function (successCallback, errorCallback, options) {
        console.log(options);
        exec(successCallback, errorCallback, 'CookieManagementPlugin', 'remove', []);
    }
};