import { ReactNode, createContext, useEffect, useState } from "react";

type Direction = "ltr" | "rtl";

type LocalSetting = {
  direction: Direction;
};

type SettingsProviderProps = {
  children: ReactNode;
};

const LOCAL_SETTINGS_KEY = "affiliate_settings";

// ============================================================

// ============================================================
// SET "rtl" OR "ltr" HERE
// THEN GOTO BROWSER CONSOLE AND RUN localStorage.clear() TO CLEAR LOCALSTORAGE
const initialSettings: LocalSetting = {
  direction: "ltr",
};
export const SettingsContext = createContext({
  settings: initialSettings,
  updateSettings: (arg: LocalSetting) => {
    console.log("Setting context arg", arg);
  },
}); // ============================================================

// ============================================================
const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settings, setSettings] = useState(initialSettings);

  const updateSettings = (updatedSetting: LocalSetting) => {
    setSettings(updatedSetting);
    window.localStorage.setItem(
      LOCAL_SETTINGS_KEY,
      JSON.stringify(updatedSetting)
    );
  };

  useEffect(() => {
    if (!window) return;
    const getItem = window.localStorage.getItem(LOCAL_SETTINGS_KEY);
    if (getItem) setSettings(JSON.parse(getItem));
  }, []);
  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export type { Direction };
export default SettingsProvider;
