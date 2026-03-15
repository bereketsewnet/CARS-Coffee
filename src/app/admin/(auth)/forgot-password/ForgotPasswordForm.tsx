"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { requestPasswordReset } from "./actions";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-2.5 px-4 rounded-lg font-semibold text-sm bg-secondary text-secondary-foreground hover:bg-leaf-bright disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-glow mt-2"
    >
      {pending ? "Sending…" : "Send reset link"}
    </button>
  );
}

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState(requestPasswordReset, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-16">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-leaf/5 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-coffee/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/assets/CARES LOGO.png"
            alt="CARES Logo"
            width={72}
            height={72}
            className="w-18 h-18 rounded-full object-cover shadow-glow mb-4"
            priority
          />
          <h1 className="font-serif text-xl font-bold text-foreground text-center leading-snug">
            CARES
          </h1>
          <span className="text-leaf-bright text-xs font-medium mt-2 tracking-wide uppercase">
            Admin Portal
          </span>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl border border-border p-8 shadow-elevated">
          {state?.success ? (
            /* Success state */
            <div className="text-center space-y-4">
              <CheckCircle className="w-12 h-12 text-leaf-bright mx-auto" />
              <h2 className="font-serif text-xl font-semibold text-foreground">
                {state.resetUrl ? "Reset link ready" : "Check your inbox"}
              </h2>
              <p className="text-muted-foreground text-sm">
                {state.message}
              </p>
              {state.resetUrl && (
                <div className="mt-2">
                  <a
                    href={state.resetUrl}
                    className="inline-block w-full py-2.5 px-4 rounded-lg font-semibold text-sm bg-secondary text-secondary-foreground hover:bg-leaf-bright transition-all duration-200 shadow-glow text-center"
                  >
                    Click here to reset your password →
                  </a>
                  <p className="text-xs text-muted-foreground mt-2">
                    This link expires in 1 hour.
                  </p>
                </div>
              )}
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-2 text-sm text-leaf-bright hover:underline mt-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to sign in
              </Link>
            </div>
          ) : (
            /* Form state */
            <>
              <div className="mb-6">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-1">
                  Forgot password?
                </h2>
                <p className="text-muted-foreground text-sm">
                  Enter the email address associated with your admin account and
                  we&apos;ll send you a reset link.
                </p>
              </div>

              <form action={formAction} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-leaf-bright/50 focus:border-leaf-bright transition-colors text-sm"
                      placeholder="admin@circularcoffee.org"
                    />
                  </div>
                </div>

                {state && !state.success && (
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                    <span>⚠</span>
                    {state.message}
                  </div>
                )}

                <SubmitButton />
              </form>

              <div className="mt-4 text-center">
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
