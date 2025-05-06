import { defineField, defineType } from "sanity";

export const categoryTypes = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(1).max(100),
      options: {
        list: [
          { title: "Web Development", value: "web-development" },
          { title: "Data Science", value: "data-science" },
          { title: "Machine Learning", value: "machine-learning" },
          { title: "Mobile Development", value: "mobile-development" },
          { title: "Game Development", value: "game-development" },
          { title: "Cloud Computing", value: "cloud-computing" },
          { title: "Cyber Security", value: "cyber-security" },
          { title: "DevOps", value: "devops" },
          { title: "Blockchain", value: "blockchain" },
        ],
      },
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
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description:
        "Icon identifier from lucide-react. For example: book-open, book-marked, etc.",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "courses",
      title: "Courses",
      type: "array",
      of: [{ type: "reference", to: [{ type: "course" }] }],
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm:ss",
        calendarTodayLabel: "Today",
      },
    }),
    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm:ss",
        calendarTodayLabel: "Today",
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm:ss",
        calendarTodayLabel: "Today",
      },
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
          { title: "Archived", value: "archived" },
        ],
      },
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "user" }],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
