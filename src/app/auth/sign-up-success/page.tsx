import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 gradient-purple-light relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
      <div className="relative w-full max-w-md z-10">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-3xl font-semibold tracking-tight text-foreground text-gray-900">
              Thank you for signing up!
            </CardTitle>
            <CardDescription className="text-muted-foreground text-gray-600">
              Check your email to confirm your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You&apos;ve successfully signed up. Please check your email to
              confirm your account before signing in.
            </p>
            <div className="pt-2">
              <Link
                href="/auth/login"
                className="text-purple-600 font-medium hover:underline underline-offset-4 text-sm"
              >
                Back to sign in →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
