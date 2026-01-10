import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  value?: string;
  change?: number;
  changeLabel?: string;
  children: React.ReactNode;
  className?: string;
}

export function ChartCard({
  title,
  value,
  change,
  changeLabel,
  children,
  className,
}: ChartCardProps) {
  return (
    <Card className={cn("border border-border shadow-sm", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
          {value && (
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">{value}</p>
              {change !== undefined && (
                <p className="text-sm text-muted-foreground">
                  <span className={cn(change > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
                    {change > 0 ? "+" : ""}
                    {change}%
                  </span>{" "}
                  {changeLabel || "from last week"}
                </p>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
