import { defineField, defineType } from "sanity";

export const instructorTypes = defineType({
  name: "instructor",
  title: "Instructor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Name is required."),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "string",
      validation: (Rule) => Rule.required().error("Bio is required."),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
  ],
});
