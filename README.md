### Cookie Manager for Android ###

This plugins allows you to flush cookies in Android, moving them to persistent memory. 

### Supported platforms

* Android
* iOS
* Browser

Works on iOS and browser but does nothing (calling any methods won't raise an error).

### Why this is needed?

Android uses `CookieManager` to synchronize cookies between Webview and its native layer. Internal storage is used (SQLite)
 to persist cookies (located within `/data/data/com.your.package/app_webview/Cookies`).
 
However, there are two pitfall this plugins try to fix by adding:
* A `flush` method: cookies are not written immediately by the `CookieManager` which may lead to unwanted state (= cookies not up-to-date) if you leave your app before sync. https://developer.android.com/reference/android/webkit/CookieManager.html#flush() 
* A `remove` method: `CookieManager#setCookie` ignores cookie that has already expired. This is inconsistent with how webviews and browsers work: a cookie with a past expiry date should be removed.
 
 
### Installation ###

* From cli, run `cordova plugin add https://github.com/4sh/cordova-plugin-cookie-manager`.

### Using this plugin ###

```
document.addEventListener('deviceready', () => {
    cookieManager.remove(successCallback, errorCallback, domain, cookieName);
    cookieManager.flush();
});
```