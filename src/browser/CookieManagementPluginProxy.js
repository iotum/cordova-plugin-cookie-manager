var CookieManagementPlugin = {
    flush: function (successCallback, errorCallback) {
        console.debug('flushing cookie (browser platform not supported)');
        successCallback();
    },
    remove: function (successCallback, errorCallback, options) {
        console.log(options);
        // console.debug('removing cookie ' + cookieName + ' on domain ' + domain + ' (browser platform not supported)');
        successCallback();
    }
};

module.exports = CookieManagementPlugin;

require('cordova/exec/proxy').add('CookieManagementPlugin', CookieManagementPlugin);