import { redirect } from "next/navigation";

import { storyblokEditorUrl } from "@/lib/storyblok/env";

export default function StudioPage() {
  redirect(storyblokEditorUrl);
}
