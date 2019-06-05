var CookieManagementPlugin = {
    flush: function (successCallback, errorCallback) {
        console.debug('flushing cookie (browser platform not supported)');
        successCallback();
    },
    remove: function (successCallback, errorCallback, options) {
        /**
         * options[0] - domain
         * options[1] - cookieName
         */

        console.debug('removing cookie ' + options[1] + ' on domain ' + options[0] + ' (browser platform not supported)');

        successCallback();
    }
};

module.exports = CookieManagementPlugin;

require('cordova/exec/proxy').add('CookieManagementPlugin', CookieManagementPlugin);