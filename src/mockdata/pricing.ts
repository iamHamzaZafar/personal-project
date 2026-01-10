export interface Plan {
  id: string;
  name: string;
  billingPeriod: "monthly" | "annually" | "bi-annually";
  price: number;
  features: string[];
}

export const plans: Plan[] = [
  {
    id: "monthly",
    name: "Monthly",
    billingPeriod: "monthly",
    price: 29.99,
    features: [
      "Unlimited projects",
      "100GB storage",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Team collaboration",
      "Custom integrations",
      "Mobile app access",
      "24/7 customer support",
    ],
  },
  {
    id: "annually",
    name: "Annual",
    billingPeriod: "annually",
    price: 299.99,
    features: [
      "Unlimited projects",
      "100GB storage",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Team collaboration",
      "Custom integrations",
      "Mobile app access",
      "24/7 customer support",
    ],
  },
  {
    id: "bi-annually",
    name: "Bi-Annual",
    billingPeriod: "bi-annually",
    price: 539.99,
    features: [
      "Unlimited projects",
      "100GB storage",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Team collaboration",
      "Custom integrations",
      "Mobile app access",
      "24/7 customer support",
    ],
  },
];
