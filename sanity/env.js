export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-05-04";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET;
("Missing dataset. Set the NEXT_PUBLIC_SANITY_DATASET environment variable.");
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID;
("Missing projectId. Set the NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.");
