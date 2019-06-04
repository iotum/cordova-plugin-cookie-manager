interface CookieManager {

    /** Ensures all cookies currently accessible through the getCookie API are written to persistent storage. */
    flush(): void;

    /** Removes a cookie for the given domain */
    remove(domain: string, cookieName: string): void;
}