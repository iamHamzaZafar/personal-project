"use client";

import { KPICard } from "@/components/dashboard/kpi-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import {
  SimpleLineChart,
  SimpleBarChart,
  StackedBarChart,
} from "@/components/dashboard/simple-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data
const orderRateData = [
  { label: "Jan", value1: 120, value2: 100 },
  { label: "Feb", value1: 150, value2: 130 },
  { label: "Mar", value1: 180, value2: 160 },
  { label: "Apr", value1: 200, value2: 180 },
  { label: "May", value1: 220, value2: 200 },
  { label: "Jun", value1: 250, value2: 230 },
  { label: "Jul", value1: 280, value2: 260 },
  { label: "Aug", value1: 300, value2: 280 },
  { label: "Sep", value1: 320, value2: 300 },
  { label: "Oct", value1: 350, value2: 330 },
];

const carryingCostsData = [
  { label: "Sun", value: 400 },
  { label: "Mon", value: 500 },
  { label: "Tue", value: 450 },
  { label: "Wed", value: 600 },
  { label: "Thu", value: 550 },
  { label: "Fri", value: 700 },
  { label: "Sat", value: 650 },
];

const deliveredData = [
  { label: "Jan", value: 200 },
  { label: "Feb", value: 250 },
  { label: "Mar", value: 300 },
  { label: "Apr", value: 350 },
  { label: "May", value: 400 },
  { label: "Jun", value: 450 },
  { label: "Jul", value: 500 },
];

const onProgressData = [
  { label: "Jan", value: 50 },
  { label: "Feb", value: 60 },
  { label: "Mar", value: 70 },
  { label: "Apr", value: 80 },
  { label: "May", value: 90 },
  { label: "Jun", value: 100 },
  { label: "Jul", value: 110 },
];

const salesData = [
  { label: "Jan", values: [100, 150, 200, 120] },
  { label: "Feb", values: [120, 160, 220, 140] },
  { label: "Mar", values: [140, 180, 240, 160] },
  { label: "Apr", values: [160, 200, 260, 180] },
  { label: "May", values: [180, 220, 280, 200] },
  { label: "Jun", values: [200, 240, 300, 220] },
  { label: "Jul", values: [220, 260, 320, 240] },
  { label: "Aug", values: [240, 280, 340, 260] },
  { label: "Sep", values: [260, 300, 360, 280] },
];

const warehousingCosts = [
  { label: "Cost Per Square Foot of Warehouse Space", value: "$6.53", change: 5 },
  {
    label: "Cost of Warehouse Management Staff Per Year",
    value: "$47,500",
    change: -3,
  },
  { label: "Cost of Warehouse Staff Per Hour", value: "$11.44", change: -4 },
  { label: "Corporate Profit % For Warehouses", value: "8.83%", change: 11 },
  {
    label: "What Percentage Do 3PL Warehouses Increase Pricing",
    value: "2.37%",
    change: 4,
  },
];

const deliveriesByCountry = [
  { country: "America", percentage: 20 },
  { country: "Netherlands", percentage: 25 },
  { country: "France", percentage: 30 },
  { country: "Spain", percentage: 35 },
  { country: "India", percentage: 45 },
  { country: "Indonesia", percentage: 65 },
];

const summaryCards = [
  { label: "Cancelled", value: "32", change: 13 },
  { label: "Delivered", value: "176", change: -7 },
  { label: "Orders", value: "384", change: 25 },
  { label: "Pending", value: "42", change: 2 },
  { label: "Revenue", value: "$982", change: 35 },
  { label: "Refunded", value: "18", change: -8 },
];

const invoices = [
  { id: "#874729", customer: "CD Cahaya Dewi", date: "08/09/23", amount: "$728" },
  { id: "#874730", customer: "SG Samantha Olle", date: "02/11/22", amount: "$182" },
  { id: "#874731", customer: "DG Daniel Gallego", date: "22/08/23", amount: "$456" },
  { id: "#874732", customer: "AD Avery Davis", date: "02/12/22", amount: "$359" },
  { id: "#874733", customer: "TA Taylor Alonso", date: "13/04/23", amount: "$224" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Revenue" value="$12,234" change={25} />
        <KPICard title="Costs" value="$2,495" change={-5} />
        <KPICard title="Profits" value="$9,274" change={15} />
        <KPICard title="Shipments" value="8,472" change={-10} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Yearly Order Rate">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <button className="px-3 py-1 text-sm font-medium text-muted-foreground bg-accent rounded-lg">
                  Week
                </button>
                <button className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-lg">
                  Month
                </button>
              </div>
              <select className="px-3 py-1 text-sm border border-input bg-background text-foreground rounded-lg">
                <option>2023</option>
              </select>
            </div>
            <SimpleLineChart data={orderRateData} color1="#3b82f6" color2="#93c5fd" />
          </div>
        </ChartCard>

        <ChartCard title="Carrying Costs" value="$2,847.90" change={25}>
          <SimpleBarChart data={carryingCostsData} color="#8b5cf6" />
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Delivered" value="2,948" change={25}>
          <SimpleBarChart data={deliveredData} color="#10b981" />
        </ChartCard>

        <ChartCard title="On Progress" value="673" change={25}>
          <SimpleBarChart data={onProgressData} color="#f59e0b" />
        </ChartCard>

        <ChartCard title="Sales by Stores Location">
          <div className="space-y-2">
            <div className="flex gap-2 text-xs text-foreground">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>East</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>West</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span>North</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span>South</span>
              </div>
            </div>
            <StackedBarChart
              data={salesData}
              colors={["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"]}
            />
          </div>
        </ChartCard>
      </div>

      {/* Warehousing and Deliveries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Warehousing Service Costs and Fees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {warehousingCosts.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-bold text-foreground">{item.value}</span>
                      <span
                        className={`text-sm font-medium ${
                          item.change > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {item.change > 0 ? "+" : ""}
                        {item.change}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-2 text-sm text-muted-foreground">
                Showing 5 of 100 data
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Deliveries by Country
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deliveriesByCountry.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {item.country}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards and Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {summaryCards.map((card, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center p-4 bg-accent rounded-lg"
                  >
                    <p className="text-2xl font-bold text-foreground">{card.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{card.label}</p>
                    <p
                      className={`text-xs font-medium mt-1 ${
                        card.change > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {card.change > 0 ? "+" : ""}
                      {card.change}%
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">
                Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                        No
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                        Invoice ID
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                        Customer
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice, index) => (
                      <tr
                        key={index}
                        className="border-b border-border hover:bg-accent transition-colors"
                      >
                        <td className="py-3 px-4 text-sm text-muted-foreground">{index + 1}</td>
                        <td className="py-3 px-4 text-sm font-medium text-foreground">
                          {invoice.id}
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {invoice.customer}
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {invoice.date}
                        </td>
                        <td className="py-3 px-4 text-sm font-semibold text-foreground">
                          {invoice.amount}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center gap-2">
                            <button className="p-1 hover:bg-accent rounded">
                              <svg
                                className="w-4 h-4 text-foreground"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </button>
                            <button className="p-1 hover:bg-accent rounded">
                              <svg
                                className="w-4 h-4 text-foreground"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
