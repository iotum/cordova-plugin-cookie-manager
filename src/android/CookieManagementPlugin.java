package cordovaPluginCookieManager;

import android.os.Build.VERSION;
import android.webkit.CookieManager;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

/**
 * This class makes sure cookies are moved to persistent memory.
 */
public class CookieManagementPlugin extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if ("flush".equals(action)) {
            this.flush(callbackContext);
            return true;
        } else if ("remove".equals(action)) {

            /**
             * args[]
             * args[0] - app
             * args[1] - domain
             * args[2] - cookieName
             */

            this.remove(args.getString(1), args.getString(2), callbackContext);
            return true;
        }

        return false;
    }

    private void flush(CallbackContext callbackContext) {
        if (VERSION.SDK_INT >= 21) {
            CookieManager.getInstance().flush();
        }
        callbackContext.success();
    }

    private void remove(String domain, String cookieName, CallbackContext callbackContext) {
        if (domain == null || cookieName == null) {
            callbackContext.error("domain or cookie name is missing");
            return;
        }

        CookieManager.getInstance().setCookie(domain, String.format("%s=''", cookieName));
        callbackContext.success();
    }
}
