#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface LocalStorage : NSObject <RCTBridgeModule>
@end

@implementation LocalStorage

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(getItem,
                 key:(NSString *)key
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSString *value = [[NSUserDefaults standardUserDefaults] stringForKey:key];
  resolve(value);
}

RCT_REMAP_METHOD(setItem,
                 key:(NSString *)key
                 value:(NSString *)value
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  [[NSUserDefaults standardUserDefaults] setObject:value forKey:key];
  resolve(nil);
}

RCT_REMAP_METHOD(removeItem,
                 key:(NSString *)key
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  [[NSUserDefaults standardUserDefaults] removeObjectForKey:key];
  resolve(nil);
}

@end
