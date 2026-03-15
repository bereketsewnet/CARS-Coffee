"use server";

import * as bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function resetPassword(
  _prevState: { message: string; success: boolean } | null,
  formData: FormData,
): Promise<{ message: string; success: boolean }> {
  const token = (formData.get("token") as string | null)?.trim();
  const password = formData.get("password") as string | null;
  const confirmPassword = formData.get("confirmPassword") as string | null;

  if (!token) {
    return { message: "Missing reset token. Please request a new link.", success: false };
  }

  if (!password || password.length < 8) {
    return { message: "Password must be at least 8 characters.", success: false };
  }

  if (password !== confirmPassword) {
    return { message: "Passwords do not match.", success: false };
  }

  try {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!resetToken) {
      return { message: "Invalid or expired reset link. Please request a new one.", success: false };
    }

    if (resetToken.used) {
      return { message: "This reset link has already been used. Please request a new one.", success: false };
    }

    if (resetToken.expiresAt < new Date()) {
      return { message: "This reset link has expired. Please request a new one.", success: false };
    }

    const passwordHash = await bcrypt.hash(password, 12);

    // Update password and mark token as used in a transaction
    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetToken.userId },
        data: { passwordHash },
      }),
      prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { used: true },
      }),
    ]);

    return { message: "Your password has been reset. You can now sign in.", success: true };
  } catch (err) {
    console.error("[resetPassword]", err);
    return { message: "Something went wrong. Please try again.", success: false };
  }
}
