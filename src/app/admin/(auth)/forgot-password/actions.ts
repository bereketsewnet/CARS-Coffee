"use server";

import crypto from "crypto";
import prisma from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";

export async function requestPasswordReset(
  _prevState: { message: string; success: boolean; resetUrl?: string } | null,
  formData: FormData,
): Promise<{ message: string; success: boolean; resetUrl?: string }> {
  const email = (formData.get("email") as string | null)?.trim().toLowerCase();

  if (!email) {
    return { message: "Please enter your email address.", success: false };
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    // Always return success to avoid leaking which emails are registered
    if (!user) {
      return {
        message: "If that email is registered, you'll receive a reset link shortly.",
        success: true,
      };
    }


    // Invalidate any existing unused tokens for this user
    await prisma.passwordResetToken.updateMany({
      where: { userId: user.id, used: false },
      data: { used: true },
    });

    // Generate a secure token
    const rawToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token: rawToken,
        expiresAt,
      },
    });

    const baseUrl =
      process.env.NEXTAUTH_URL ??
      process.env.NEXT_PUBLIC_BASE_URL ??
      "http://localhost:3000";

    const resetUrl = `${baseUrl}/admin/reset-password?token=${rawToken}`;

    // Send email or fall back to returning the URL directly (when no email provider configured)
    const resendKey = process.env.RESEND_API_KEY ?? "";
    const gmailUser = process.env.GMAIL_USER ?? "";
    const gmailPass = process.env.GMAIL_APP_PASSWORD ?? "";
    const emailConfigured =
      (resendKey.length > 0 && !resendKey.startsWith("re_your")) ||
      (gmailUser.length > 0 && gmailPass.length > 0);

    if (emailConfigured) {
      await sendPasswordResetEmail({
        to: user.email,
        name: user.name ?? undefined,
        resetUrl,
      });
      return {
        message: "Reset link sent! Check your inbox (and spam folder).",
        success: true,
      };
    } else {
      // Dev mode: no email provider — return the URL so the user can use it directly
      console.warn(`\n⚠️  No email provider configured. Reset URL: ${resetUrl}\n`);
      return {
        message: "Email sending is not configured. Use the link below to reset your password:",
        success: true,
        resetUrl,
      };
    }
  } catch (err) {
    console.error("[requestPasswordReset] Error:", err);
    return {
      message: "Something went wrong. Please try again.",
      success: false,
    };
  }
}

