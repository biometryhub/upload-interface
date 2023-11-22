export type Constraint = "string" | "number" | "date" | string[];
type Constraints = {
  [key: string]: { [key: string]: Constraint };
};

export const constraints: Constraints = {
  plot: {},
  sowing: {
    date: "date",
    plant: "string",
    depth_mm: "number",
    density: "number",
    plot_id: "number",
  },
  treatment: {
    treatment: "string",
    sowing_id: "number",
  },
  oper_mgmt: {
    product_type: [
      "herbicide",
      "fungicide",
      "molluscicide",
      "fertiliser",
      "insecticide",
    ],
    date: "date",
    stage: "string",
    product: "string",
    amount: "number",
    amount_unit: "string",
    plot_id: "number",
  },
};
