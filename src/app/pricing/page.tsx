"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { plans, type Plan } from "@/mockdata/pricing";

export default function PricingPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/auth/login");
        return;
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const getSavings = (plan: Plan) => {
    if (plan.billingPeriod === "monthly") return 0;
    const monthlyPrice = 29.99; // Base monthly price
    const monthlyTotal = monthlyPrice * (plan.billingPeriod === "annually" ? 12 : 24);
    const savings = monthlyTotal - plan.price;
    return savings > 0 ? savings : 0;
  };

  const getSavingsPercentage = (plan: Plan) => {
    if (plan.billingPeriod === "monthly") return 0;
    return plan.billingPeriod === "annually" ? 17 : 25;
  };

  const handleSelectPlan = async (planId: string) => {
    setSelectedPlan(planId);
    setIsProcessing(true);
    
    // TODO: Integrate with payment provider (Stripe, etc.)
    // For now, simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      // Redirect to payment processing or dashboard
      window.location.href = `/dashboard?plan=${planId}`;
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 md:p-10 gradient-purple-light relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl"></div>
      
      <div className="relative w-full max-w-7xl z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Choose Your Plan
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the billing period that works best for you. All plans include the same features and a 14-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            const savings = getSavings(plan);
            const savingsPercentage = getSavingsPercentage(plan);
            const isPopular = plan.billingPeriod === "annually";

            return (
              <Card
                key={plan.id}
                className={cn(
                  "relative border-2 shadow-lg transition-all duration-300",
                  isPopular
                    ? "border-primary scale-105"
                    : "border-border hover:border-primary/50",
                  isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                )}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                {savingsPercentage > 0 && (
                  <div className="absolute -top-4 right-4">
                    <span className="bg-green-500 dark:bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                      Save {savingsPercentage}%
                    </span>
                  </div>
                )}

                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mt-2">
                    {plan.billingPeriod === "monthly" 
                      ? "Billed monthly" 
                      : plan.billingPeriod === "annually"
                      ? "Billed annually"
                      : "Billed every 2 years"}
                  </CardDescription>
                  <div className="mt-6">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                      <span className="text-muted-foreground">
                        /{plan.billingPeriod === "monthly" ? "month" : plan.billingPeriod === "annually" ? "year" : "2 years"}
                      </span>
                    </div>
                    {savings > 0 && (
                      <p className="text-sm text-green-600 dark:text-green-400 mt-2 font-medium">
                        Save ${savings.toFixed(2)} compared to monthly
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Button
                    onClick={() => handleSelectPlan(plan.id)}
                    disabled={isProcessing && selectedPlan === plan.id}
                    className={cn(
                      "w-full h-12 text-base font-semibold",
                      isPopular
                        ? "gradient-purple hover:opacity-90 text-white"
                        : "bg-primary hover:bg-primary/90 text-primary-foreground"
                    )}
                  >
                    {isProcessing && selectedPlan === plan.id
                      ? "Processing..."
                      : "Get Started"}
                  </Button>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <p className="text-sm font-semibold text-foreground mb-2">
                      What&apos;s included:
                    </p>
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-sm text-muted-foreground">
            Cancel anytime.{" "}
            <a href="#" className="text-primary hover:underline">
              Learn more about our plans
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
