import { doc, onSnapshot } from "firebase/firestore";

import type { IRatesResponse } from "../../shared/interfaces/rates.interface";
import { db } from "../../shared/config/firebase.config";

import { onMounted, onUnmounted, ref } from "vue";
import { formatRateAdapter } from "../adapter/rate.adapter";
import { useChangeCurrencyStore } from "../../shared/store/useChangeCurrencyStore";

export const useExchangeRates = () => {

  const storeChangeCurrency = useChangeCurrencyStore();

  const rates = storeChangeCurrency.rates;
  const mode = storeChangeCurrency.mode;
  const setMode = storeChangeCurrency.setMode;
  const setRates = storeChangeCurrency.setRates;

  const amountReceive = ref(1);
  const amountSend = ref(0);
  const showOperation = ref(false);

  const lastChanged = ref<"SEND" | "RECEIVE">("RECEIVE");

  const handleOpenOperation = () => {
    showOperation.value = true;
  }

  const calculatePenToUsd = (value: number, rate: number) => {
    return value / rate;
  };

  const calculateUsdToPen = (value: number, rate: number) => {
    return value * rate;
  };

  const onCalculate = () => {
    if (!rates.value) return;
    const rateValue =
      mode.value === "SELL" ? rates.value.salePrice : rates.value.purchasePrice;

    if (lastChanged.value === "SEND") {
      if (mode.value === "BUY") {
        amountReceive.value = parseFloat(
          calculateUsdToPen(amountSend.value, rateValue).toFixed(2)
        );
      } else {
        amountReceive.value = parseFloat(
          calculatePenToUsd(amountSend.value, rateValue).toFixed(2)
        );
      }
    } else {
      if (mode.value === "BUY") {
        amountSend.value = parseFloat(
          calculatePenToUsd(amountReceive.value, rateValue).toFixed(2)
        );
      } else {
        amountSend.value = parseFloat(
          calculateUsdToPen(amountReceive.value, rateValue).toFixed(2)
        );
      }
    }
  };

  const handleChangeMode = (modeType?: "BUY" | "SELL") => {
    const newMode = modeType ?? (mode.value === "BUY" ? "SELL" : "BUY");
    setMode(newMode);
    onCalculate();
  };

  const handleChangeSend = (event: Event) => {
    if (!rates.value) return;

    amountSend.value =
      parseFloat((event.target as HTMLInputElement).value) || 0;
    lastChanged.value = "SEND";
    onCalculate();
  };

  const handleChangeReceive = (event: Event) => {
    if (!rates.value) return;
    amountReceive.value =
      parseFloat((event.target as HTMLInputElement).value) || 0;
    lastChanged.value = "RECEIVE";
    onCalculate();
  };

  const unSub = onSnapshot(
    doc(db, "rates", "TDmXIypgLKKfNggHHSnw"),
    (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as IRatesResponse;
        const formatData = formatRateAdapter(data);
        setRates(formatData);
        onCalculate();
      }
    }
  );

  onMounted(() => storeChangeCurrency.loadModeFromStorage());
  onUnmounted(() => unSub());

  return {
    rates,
    onCalculate,
    handleChangeMode,
    amountReceive,
    amountSend,
    mode,
    calculatePenToUsd,
    calculateUsdToPen,
    handleChangeSend,
    handleChangeReceive,
    handleOpenOperation,
    showOperation
  };
};
