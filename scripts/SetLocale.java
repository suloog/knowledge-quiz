// The device's language changed in the running system, as the Settings app changes it: through the
// activity manager's persistent configuration, without restarting the Android framework, so a
// Maestro flow keeps its connection to the device across the change (TC-03-22). Every Android class
// is reached by reflection, so this compiles with the JDK alone. scripts/test-acceptance.sh compiles
// it to a dex (javac, d8) and scripts/illustration-server.js runs it on the device, as the shell:
//
//   CLASSPATH=/data/local/tmp/kq-set-locale.dex app_process / SetLocale en-US
import java.util.Locale;

public class SetLocale {
  public static void main(String[] args) throws Exception {
    Locale locale = Locale.forLanguageTag(args[0]);
    Object activityManager =
        Class.forName("android.app.ActivityManager").getMethod("getService").invoke(null);
    Class<?> configurationClass = Class.forName("android.content.res.Configuration");
    Object configuration =
        activityManager.getClass().getMethod("getConfiguration").invoke(activityManager);
    Class<?> localeListClass = Class.forName("android.os.LocaleList");
    Object locales =
        localeListClass
            .getConstructor(Locale[].class)
            .newInstance((Object) new Locale[] {locale});
    configurationClass.getMethod("setLocales", localeListClass).invoke(configuration, locales);
    configurationClass.getField("userSetLocale").setBoolean(configuration, true);
    activityManager
        .getClass()
        .getMethod("updatePersistentConfiguration", configurationClass)
        .invoke(activityManager, configuration);
  }
}
