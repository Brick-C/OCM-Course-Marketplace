import { defineField, defineType } from "sanity";

export const courseTypes = defineType({
  name: "course",
  title: "Course",
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
      name: "price",
      title: "Price",
      type: "number",
      description: "Price of the course",
      validation: (Rule) => Rule.required().min(0).error("Price is required."),
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
      validation: (Rule) => Rule.required().error("Slug is required."),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) =>
        Rule.required().min(10).max(200).error("Description is required."),
    }),
    defineField({
      name: "image",
      title: "Course Image",
      type: "image",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required().error("Category is required."),
    }),
    defineField({
      name: "modules",
      title: "Modules",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "modules" }],
        },
      ],
    }),
    defineField({
      name: "instructor",
      title: "Instructor",
      type: "reference",
      to: [{ type: "instructor" }],
    }),
  ],
});
