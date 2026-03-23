import { apiPlugin, getStoryblokApi, storyblokInit } from "@storyblok/react/rsc";

import { storyblokAccessToken, storyblokRegion } from "@/lib/storyblok/env";

let initialized = false;

export function initStoryblok() {
  if (initialized) {
    return;
  }

  storyblokInit({
    accessToken: storyblokAccessToken || "missing-storyblok-token",
    use: [apiPlugin],
    apiOptions: {
      region: storyblokRegion,
    },
    components: {},
  });

  initialized = true;
}

export function getConfiguredStoryblokApi() {
  initStoryblok();
  return getStoryblokApi();
}
