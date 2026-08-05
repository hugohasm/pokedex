import {NativeModules} from 'react-native';

interface LocalStorageModule {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

const memoryStorage: Record<string, string> = {};

const fallbackStorage: LocalStorageModule = {
  getItem: async key => memoryStorage[key] || null,
  setItem: async (key, value) => {
    memoryStorage[key] = value;
  },
  removeItem: async key => {
    delete memoryStorage[key];
  },
};

export const localStorage: LocalStorageModule =
  NativeModules.LocalStorage || fallbackStorage;
