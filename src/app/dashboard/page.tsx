import { createClient } from "@/lib/supabase/supabaseServer";
import React from "react";

const page = async () => {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  console.log(user);

  return <div>page</div>;
};

export default page;
