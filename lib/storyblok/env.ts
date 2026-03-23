const accessToken = process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN;
const region = process.env.NEXT_PUBLIC_STORYBLOK_REGION || "eu";
const previewSecret = process.env.STORYBLOK_PREVIEW_SECRET;
const revalidateSecret = process.env.STORYBLOK_REVALIDATE_SECRET;
const spaceId = process.env.STORYBLOK_SPACE_ID;
const editorUrl =
  process.env.STORYBLOK_EDITOR_URL ||
  (spaceId ? `https://app.storyblok.com/#/me/spaces/${spaceId}/dashboard` : "https://app.storyblok.com/");

export const storyblokAccessToken = accessToken;
export const storyblokRegion = region;
export const storyblokEnabled = Boolean(accessToken);
export const storyblokPreviewSecret = previewSecret;
export const storyblokRevalidateSecret = revalidateSecret;
export const storyblokEditorUrl = editorUrl;

export function getStoryblokVersion(isDraftMode: boolean) {
  return isDraftMode ? "draft" : "published";
}
