var CookieManagementPlugin = {
    flush: function () {
        console.debug('flushing cookie (browser platform not supported)');
    },
    remove: function (domain, cookieName) {
        console.debug('removing cookie ' + cookieName + ' on domain ' + domain + ' (browser platform not supported)');
    }
};

module.exports = CookieManagementPlugin;

require('cordova/exec/proxy').add('CookieManagementPlugin', CookieManagementPlugin);