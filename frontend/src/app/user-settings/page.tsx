import { createClient } from "@/lib/supabase/server";
import UserSettingsForm from "./UserSettingsForm";
import { updateUserProfile } from "./actions";

export default async function UserSetting() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", user.id)
      .single();
    profile = data;
  }

  return (
    <main className="p-4">
      <h2 className="text-2xl font-bold mb-4">ユーザー設定</h2>
      <UserSettingsForm
        user={user}
        profile={profile}
        updateAction={updateUserProfile}
      />
    </main>
  );
}
