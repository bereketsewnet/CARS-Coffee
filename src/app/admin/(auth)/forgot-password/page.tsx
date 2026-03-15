import { Suspense } from "react";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | CARES Admin",
};

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ForgotPasswordForm />
    </Suspense>
  );
}
