/********* CookieManagementPlugin.m Cordova Plugin Implementation *******/

#import <WebKit/WebKit.h>
#import <Cordova/CDV.h>

@interface CookieManagementPlugin : CDVPlugin {
  // Member variables go here.
}

- (void)flush:(CDVInvokedUrlCommand*)command;
- (void)remove:(CDVInvokedUrlCommand*)command;
@end

@implementation CookieManagementPlugin

/**
 * WKWebView has his own cookie storage, flush ensure that this storage is copy in sharedHTTPCookieStorage
 */
- (void)flush:(CDVInvokedUrlCommand*)command
{

    WKWebView* wkWebView = (WKWebView*) self.webView;

    // cookie storage of WebView
    WKHTTPCookieStore *httpCookieStore = wkWebView.configuration.websiteDataStore.httpCookieStore;

    // shared cookie storage
    NSHTTPCookieStorage *cookieJar = [NSHTTPCookieStorage sharedHTTPCookieStorage];

    [httpCookieStore getAllCookies:^(NSArray<NSHTTPCookie *>* cookies) {
        NSHTTPCookie *cookieFromHttpStore;
        for (cookieFromHttpStore in cookies) {
            // NSLog(@"Copy cookie domain=%@ name=%@", cookieFromHttpStore.domain, cookieFromHttpStore.name);
            [cookieJar setCookie:cookieFromHttpStore];
        }
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

/**
 * Remove the cookie from NSHTTPCookieStorage
 */
- (void)remove:(CDVInvokedUrlCommand*)command
{
    NSString *cookieDomain = command.arguments[0];
    NSString *cookieName = command.arguments[1];

    NSHTTPCookie *cookie;
    NSHTTPCookieStorage *cookieJar = [NSHTTPCookieStorage sharedHTTPCookieStorage];

    // protocol is not in the cookie domain
    if ([cookieDomain hasPrefix:@"https://"]) {
        cookieDomain = [cookieDomain substringFromIndex:8];
    } else if ([cookieDomain hasPrefix:@"http://"]) {
        cookieDomain = [cookieDomain substringFromIndex:7];
    }

    // NSLog(@"Comparing with domain=%@ name=%@", cookieDomain, cookieName);
    for (cookie in [cookieJar cookies]) {
        if ([cookieName isEqualToString:cookie.name] && [cookieDomain isEqualToString:cookie.domain]) {
            // NSLog(@"Delete cookie domain=%@ name=%@", cookie.domain, cookie.name);
            [cookieJar deleteCookie:cookie];
            break;
        }
    }

    CDVPluginResult* pluginResult = pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
