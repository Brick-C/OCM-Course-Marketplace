import { defineField, defineType } from "sanity";

export const lessonTypes = defineType({
  name: "lesson",
  title: "Lesson",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(10).max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      ttile: "Description",
      type: "text",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "URL of the video for the lesson",
      validation: (Rule) => Rule.required().uri({ allowRelative: true }),
    }),
    defineField({
      name: "loomUrl",
      title: "Loom Share URL",
      type: "url",
      description: "URL of the loom share for the lesson",
      validation: (Rule) => {
        Rule.custom((value) => {
          if (!value) return true;
          try {
            const url = new URL(value);
            if (!url.hostname.endsWith("loom.com")) {
              return "URL must be a loom share URL";
            }
            if (!url.pathname.startsWith("/share/")) {
              return "URL must be a loom share URL";
            }
            const videoId = url.pathname.split("/share/")[1];
            if (!/^[a-zA-Z0-9]+$/.test(videoId)) {
              return "URL must be a loom share URL";
            }
            return true;
          } catch (e) {
            return "Invalid URL format";
          }
        });
      },
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
