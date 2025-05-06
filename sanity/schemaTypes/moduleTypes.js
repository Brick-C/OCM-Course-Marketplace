import { defineField, defineType } from "sanity";

export const moduleTypes = defineType({
  name: "modules",
  title: "Modules",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) =>
        Rule.required().min(5).max(100).error("Title is required."),
    }),
    defineField({
      name: "lessons",
      title: "Lessons",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "lesson" }],
        },
      ],
    }),
  ],
});
