"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateUserProfile(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // このアクションはログインユーザー専用なので、通常このエラーは発生しない
    return { success: false, message: "ユーザー認証に失敗しました。" };
  }

  const name = formData.get("name") as string;

  const { error } = await supabase
    .from("users")
    .update({ name })
    .eq("user_id", user.id);

  if (error) {
    console.error("Error updating user profile:", error);
    return { success: false, message: "プロフィールの更新に失敗しました。" };
  }

  revalidatePath("/user-settings");
  return { success: true, message: "プロフィールを更新しました。" };
}
