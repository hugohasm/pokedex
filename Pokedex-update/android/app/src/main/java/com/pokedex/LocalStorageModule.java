package com.pokedex;

import android.content.Context;
import android.content.SharedPreferences;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class LocalStorageModule extends ReactContextBaseJavaModule {
  private static final String STORAGE_NAME = "PokedexLocalStorage";
  private final SharedPreferences sharedPreferences;

  LocalStorageModule(ReactApplicationContext context) {
    super(context);
    sharedPreferences = context.getSharedPreferences(STORAGE_NAME, Context.MODE_PRIVATE);
  }

  @Override
  public String getName() {
    return "LocalStorage";
  }

  @ReactMethod
  public void getItem(String key, Promise promise) {
    promise.resolve(sharedPreferences.getString(key, null));
  }

  @ReactMethod
  public void setItem(String key, String value, Promise promise) {
    sharedPreferences.edit().putString(key, value).apply();
    promise.resolve(null);
  }

  @ReactMethod
  public void removeItem(String key, Promise promise) {
    sharedPreferences.edit().remove(key).apply();
    promise.resolve(null);
  }
}
