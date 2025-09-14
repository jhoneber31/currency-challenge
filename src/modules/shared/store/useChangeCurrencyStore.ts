import { ref } from "vue";
import type { ModeChangeType } from "../type/mode-change.type";
import type { IRates } from "../interfaces/rates.interface";

export const useChangeCurrencyStore = () => {
  const mode = ref<ModeChangeType>("BUY");
  const rates = ref<IRates | null>(null);

  const setMode = (newMode: ModeChangeType) => {
    mode.value = newMode;
    localStorage.setItem("mode", newMode);
  };
  const setRates = (newRates: IRates) => {
    rates.value = newRates;
  };

  const loadModeFromStorage = () => {
    const storeMode = localStorage.getItem("mode") as ModeChangeType | null;
    if (storeMode) {
      mode.value = storeMode;
    }
  };

  return {
    mode,
    rates,
    setMode,
    setRates,
    loadModeFromStorage,
  };
};
