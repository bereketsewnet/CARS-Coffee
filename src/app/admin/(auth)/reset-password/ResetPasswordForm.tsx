"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "./actions";
import { Lock, Eye, EyeOff, CheckCircle, AlertTriangle } from "lucide-react";
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
      {pending ? "Resetting…" : "Reset password"}
    </button>
  );
}

export function ResetPasswordForm() {
  const [state, formAction] = useActionState(resetPassword, null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const tokenMissing = !token;

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
          {tokenMissing ? (
            <div className="text-center space-y-4">
              <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto" />
              <h2 className="font-serif text-xl font-semibold text-foreground">
                Invalid link
              </h2>
              <p className="text-muted-foreground text-sm">
                This reset link is missing or invalid. Please request a new one.
              </p>
              <Link
                href="/admin/forgot-password"
                className="inline-block mt-2 text-sm text-leaf-bright hover:underline"
              >
                Request a new link →
              </Link>
            </div>
          ) : state?.success ? (
            <div className="text-center space-y-4">
              <CheckCircle className="w-12 h-12 text-leaf-bright mx-auto" />
              <h2 className="font-serif text-xl font-semibold text-foreground">
                Password updated!
              </h2>
              <p className="text-muted-foreground text-sm">{state.message}</p>
              <Link
                href="/admin/login"
                className="inline-block mt-2 text-sm font-semibold text-leaf-bright hover:underline"
              >
                Sign in →
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-1">
                  Set new password
                </h2>
                <p className="text-muted-foreground text-sm">
                  Choose a strong password for your admin account.
                </p>
              </div>

              <form action={formAction} className="space-y-4">
                <input type="hidden" name="token" value={token} />

                {/* New password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    New password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      minLength={8}
                      className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-leaf-bright/50 focus:border-leaf-bright transition-colors text-sm"
                      placeholder="At least 8 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-leaf-bright/50 focus:border-leaf-bright transition-colors text-sm"
                      placeholder="Repeat your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                    >
                      {showConfirm ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
