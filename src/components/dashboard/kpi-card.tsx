import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  changeLabel?: string;
  icon?: React.ReactNode;
}

export function KPICard({ title, value, change, changeLabel, icon }: KPICardProps) {
  const isPositive = change > 0;

  return (
    <Card className="border border-border shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon || (
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-2xl font-bold text-foreground">{value}</h3>
            <div className="flex items-center gap-1 mt-2">
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
              )}
              <span
                className={cn(
                  "text-sm font-medium",
                  isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                )}
              >
                {Math.abs(change)}%
              </span>
              <span className="text-sm text-muted-foreground ml-1">
                {changeLabel || "from last month"}
              </span>
            </div>
          </div>
          {/* Simple wave chart placeholder */}
          <div className="h-12 w-20 opacity-60">
            <svg viewBox="0 0 80 48" className="w-full h-full">
              <path
                d="M0,24 Q20,12 40,24 T80,24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-primary"
              />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
