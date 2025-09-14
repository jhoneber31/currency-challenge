<script setup lang="ts">
import SyncIcon from "../../shared/icons/SyncIcon.vue";
import { useExchangeRates } from "../composables/useExchangeRates";

const {
  rates,
  handleChangeMode,
  amountReceive,
  amountSend,
  mode,
  handleChangeSend,
  handleChangeReceive,
  handleOpenOperation,
  showOperation,
} = useExchangeRates();
</script>

<template>
  <div class="min-h-screen home-background flex items-center justify-center">
    <div
      class="flex flex-col items-center justify-center md:flex-row md:px-5 w-full lg:max-w-4xl lg:justify-between"
    >
      <div
        class="text-white flex flex-col items-center mb-10 text-center gap-y-2 md:items-start md:mb-0 md:max-w-80"
      >
        <h1 class="font-medium text-2xl md:text-3xl md:text-start lg:text-4xl">
          El mejor <br />
          tipo de cambio
        </h1>
        <p class="font-normal text-sm md:text-xl md:text-start lg:text-2xl">
          para cambiar dólares y soles online en Perú
        </p>
      </div>
      <div class="bg-white shadow w-full sm:rounded-2xl sm:w-[26.25rem]">
        <div v-if="!rates" class="p-5 space-y-10">
          <div class="flex gap-x-8">
            <div class="animate-pulse bg-gray-60 h-12 w-40"></div>
            <div class="animate-pulse bg-gray-60 h-12 w-40"></div>
          </div>
          <div class="animate-pulse bg-gray-60 h-12 w-full"></div>
          <div class="animate-pulse bg-gray-60 h-12 w-full"></div>
        </div>
        <div v-else>
          <div
            class="border-b border-[#E7E7ED] flex justify-center gap-x-24 pt-5"
          >
            <div
              class="flex flex-col items-center pb-2 text-base cursor-pointer border-b"
              :class="
                mode === 'BUY'
                  ? 'text-blue-AB border-blue-AB'
                  : 'border-transparent text-gray-60'
              "
              @click="handleChangeMode('BUY')"
            >
              <span class="font-normal">Dólar compra</span>
              <strong class="font-medium">{{ rates?.purchasePrice }}</strong>
            </div>
            <div
              class="flex flex-col items-center pb-2 text-base cursor-pointer border-b"
              :class="
                mode === 'SELL'
                  ? 'text-blue-AB border-blue-AB'
                  : 'border-transparent text-gray-60'
              "
              @click="handleChangeMode('SELL')"
            >
              <span class="font-normal">Dólar venta</span>
              <strong class="font-medium">{{ rates?.salePrice }}</strong>
            </div>
          </div>

          <div class="pt-10 px-14 pb-7">
            <div class="relative flex flex-col gap-y-6">
              <div
                class="w-full flex rounded-md ring-1 ring-blue-AB items-stretch"
              >
                <span
                  class="px-4 py-2.5 bg-[#F3F3F6] text-blue-AB font-normal text-sm rounded-l-md w-1/3 flex items-center justify-center"
                >
                  {{ mode === "SELL" ? "Dólares" : "Soles" }}
                </span>
                <div class="flex flex-col w-2/3 px-2 py-1 items-end">
                  <label
                    for="receive-input"
                    class="text-xs text-gray-60 font-normal"
                    >Recibes</label
                  >
                  <div class="flex items-center">
                    <span>{{ mode === "SELL" ? "$" : "S/" }}</span>
                    <input
                      id="receive-input"
                      type="number"
                      v-model="amountReceive"
                      placeholder="Monto"
                      class="text-right outline-none text-gray-80 text-base font-medium"
                      :style="{
                        width: `${
                          (amountReceive?.toString().length || 1) + 1
                        }ch`,
                      }"
                      @input="handleChangeReceive"
                      @keydown.up.prevent
                      @keydown.down.prevent
                    />
                  </div>
                </div>
              </div>

              <div
                class="w-full flex rounded-md ring-1 ring-blue-AB items-stretch"
              >
                <span
                  class="px-4 py-2.5 bg-[#F3F3F6] text-blue-AB font-normal text-sm rounded-l-md w-1/3 flex items-center justify-center"
                >
                  {{ mode === "SELL" ? "Soles" : "Dólares" }}
                </span>
                <div class="flex flex-col w-2/3 px-2 py-1 items-end">
                  <label
                    for="send-input"
                    class="text-xs text-gray-60 font-normal"
                    >Envías</label
                  >
                  <div class="flex items-center">
                    <span>{{ mode === "SELL" ? "S/" : "$" }}</span>
                    <input
                      id="send-input"
                      type="number"
                      v-model="amountSend"
                      placeholder="Monto"
                      class="text-right outline-none text-gray-80 text-base font-medium"
                      :style="{
                        width: `${(amountSend?.toString().length || 1) + 1}ch`,
                      }"
                      @input="handleChangeSend"
                      @keydown.up.prevent
                      @keydown.down.prevent
                    />
                  </div>
                </div>
              </div>

              <div
                class="w-11 h-11 rounded-full bg-blue-AB text-white flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
                :class="mode === 'BUY' ? 'rotate-90' : 'rotate-270'"
                @click="handleChangeMode()"
              >
                <SyncIcon />
              </div>
            </div>
            <button
              class="w-full bg-bright-purple text-white rounded-2xl font-medium text-base hover:bg-deep-violet transition-colors duration-300 cursor-pointer py-4 mt-10 ring ring-deep-violet"
              @click="handleOpenOperation"
            >
              Iniciar operación
            </button>
            <p
              v-if="showOperation"
              class="mt-4 text-center text-sm text-gray-60"
            >
              Operación iniciada. Tu envias
              <strong
                >{{ mode === "SELL" ? "S/" : "$" }} {{ amountSend }}</strong
              >
              y recibes
              <strong
                >{{ mode === "SELL" ? "$" : "S/" }} {{ amountReceive }}</strong
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
