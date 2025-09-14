import type { IRates, IRatesResponse } from "../../shared/interfaces/rates.interface";

export const formatRateAdapter = (data: IRatesResponse): IRates => {
  return {
    purchasePrice: data.purchase_price,
    salePrice: data.sale_price,
  };
};
