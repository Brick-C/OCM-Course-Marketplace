import Image from "next/image";
import { defineField, defineType } from "sanity";

export const enrollmentTypes = defineType({
  name: "enrollment",
  title: "Enrollment",
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
      name: "course",
      title: "Course",
      type: "reference",
      to: [{ type: "course" }],
      validation: (Rule) => Rule.required().error("Course is required"),
    }),
    defineField({
      name: "amount",
      title: "Amount",
      type: "number",
      validation: (Rule) => Rule.required().error("Amount is required"),
      description: "Amount paid for the course",
    }),
    defineField({
      name: "paymentId",
      title: "Payment ID",
      type: "string",
      validation: (Rule) => Rule.required().error("Payment ID is required"),
      description: "Unique identifier for the payment transaction",
    }),
    defineField({
      name: "enrolledAt",
      title: "Enrolled At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm",
        calendarTodayLabel: "Today",
      },
    }),
  ],
  preview: {
    select: {
      courseTitle: "course.title",
      studentFirstName: "student.firstName",
      studentLastName: "student.lastName",
      studentImage: "student.imageUrl",
    },
    prepare({ courseTitle, studentFirstName, studentLastName, studentImage }) {
      return {
        title: `${studentFirstName} ${studentLastName}`,
        subtitle: courseTitle,
        media: (
          <Image
            src={studentImage}
            alt={`${studentFirstName} ${studentLastName}`}
            width={100}
            height={100}
          />
        ),
      };
    },
  },
});
