var CookieManagementPlugin = {
    flush: function (successCallback, errorCallback) {
        console.debug('flushing cookie (browser platform not supported)');
    },
    remove: function (successCallback, errorCallback, options) {
        console.log(options);
        // console.debug('removing cookie ' + cookieName + ' on domain ' + domain + ' (browser platform not supported)');
    }
};

module.exports = CookieManagementPlugin;

require('cordova/exec/proxy').add('CookieManagementPlugin', CookieManagementPlugin);