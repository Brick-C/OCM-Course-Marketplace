// Remove the import for Image from "next/image"; as it's not used here
// import Image from "next/image";
import { defineField, defineType } from "sanity";
// Keep urlFor import if you use it elsewhere in the studio, but it's not needed for the preview media property directly
// import { urlFor } from "../lib/image";

export const lessonCompletionTypes = defineType({
  name: "lessonCompletion",
  title: "Lesson Completion",
  type: "document",
  fields: [
    defineField({
      name: "student",
      title: "Student",
      type: "reference",
      to: [{ type: "student" }],
      validation: (Rule) => Rule.required().error("Student is required"),
    }),
    defineField({
      name: "lesson",
      title: "Lesson",
      type: "reference",
      to: [{ type: "lesson" }],
      validation: (Rule) => Rule.required().error("Lesson is required"),
    }),
    defineField({
      name: "module",
      title: "Module",
      type: "reference",
      to: [{ type: "modules" }], // Assuming 'modules' is the correct type name
      validation: (Rule) => Rule.required().error("Module is required"),
    }),
    defineField({
      name: "course",
      title: "Course",
      type: "reference",
      to: [{ type: "course" }],
      validation: (Rule) => Rule.required().error("Course is required"),
    }),
    defineField({
      name: "completedAt",
      title: "Completed At",
      type: "datetime",
      validation: (Rule) =>
        Rule.required().error("Completion date is required"),
    }),
  ],
  preview: {
    select: {
      courseTitle: "course.title",
      lessonTitle: "lesson.title",
      completedAt: "completedAt",
      // Select the actual image asset field from the course document
      courseImage: "course.image",
    },
    prepare({ courseTitle, lessonTitle, completedAt, courseImage }) {
      // Handle potential null/undefined titles gracefully
      const displayTitle = `${courseTitle || "Untitled Course"}: ${lessonTitle || "Untitled Lesson"}`;

      return {
        title: displayTitle,
        subtitle: completedAt
          ? `Completed on ${new Date(completedAt).toLocaleDateString()}`
          : "Not completed",
        // Provide the selected image asset object directly to the media property
        // Sanity Studio knows how to render this as a thumbnail.
        media: courseImage,
      };
    },
  },
});
