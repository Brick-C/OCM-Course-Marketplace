import Image from "next/image";
import { defineField, defineType } from "sanity";
import { urlFor } from "../lib/image";

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
      to: [{ type: "modules" }],
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
      courseImage: "course.image",
    },
    prepare({ courseTitle, lessonTitle, completedAt, courseImage }) {
      return {
        title: `${courseTitle || "Course"}: ${lessonTitle || "Lesson"}`,
        subtitle: completedAt
          ? `Completed on ${new Date(completedAt).toLocaleDateString()}`
          : "Not completed",
        media: (
          <Image
            src={urlFor(courseImage).url()}
            alt={courseTitle}
            width={100}
            height={100}
          />
        ),
      };
    },
  },
});
