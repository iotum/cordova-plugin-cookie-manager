### Cookie Manager for Android and iOS ###

This plugins allows you to flush cookies in Android and iOS, moving them to persistent memory. 

### Supported platforms

* Android
* iOS
* Browser

Works on browser but does nothing (calling any methods won't raise an error).

### Why this is needed?

Android uses `CookieManager` to synchronize cookies between Webview and its native layer. Internal storage is used (SQLite)
 to persist cookies (located within `/data/data/com.your.package/app_webview/Cookies`).
 
However, there are two pitfall this plugins try to fix by adding:
* A `flush` method: cookies are not written immediately by the `CookieManager` which may lead to unwanted state (= cookies not up-to-date) if you leave your app before sync. https://developer.android.com/reference/android/webkit/CookieManager.html#flush() 
* A `remove` method: `CookieManager#setCookie` ignores cookie that has already expired. This is inconsistent with how webviews and browsers work: a cookie with a past expiry date should be removed.

The same thing happen on iOS, the WkWebView use his own storage : `httpCookieStore`.
This storage is sync to the `sharedHTTPCookieStorage` in `NSHTTPCookieStorage` (but not immediately).
The implementation is slightly different :
* The `flush` method: copy all cookies from the `httpCookieStore` to the `sharedHTTPCookieStorage`
* The `remove` method remove the cookie on the `sharedHTTPCookieStorage`
 
 
### Installation ###

* From cli, run `cordova plugin add https://github.com/4sh/cordova-plugin-cookie-manager`.

### Using this plugin ###

```
document.addEventListener('deviceready', () => {
    window.cordova.plugins.CookieManagementPlugin.remove(successCallback, errorCallback, domain, cookieName);
    window.cordova.plugins.CookieManagementPlugin.flush();
});
```
