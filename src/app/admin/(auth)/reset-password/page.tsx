import { Suspense } from "react";
import { ResetPasswordForm } from "./ResetPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | CARES Admin",
};

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
