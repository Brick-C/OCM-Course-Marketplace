import Image from "next/image";
import { defineField, defineType } from "sanity";

export const studentTypes = defineType({
  name: "student",
  title: "Student",
  type: "document",
  fields: [
    defineField({
      name: "firstName",
      title: "First Name",
      type: "string",
    }),
    defineField({
      name: "lastName",
      title: "Last Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().error("Email is required"),
    }),
    defineField({
      name: "clerkId",
      title: "Clerk User Id",
      type: "string",
      validation: (Rule) => Rule.required().error("Clerk User Id is required"),
    }),
    defineField({
      name: "imageUrl",
      title: "Profile Image Url",
      type: "url",
    }),
  ],
  preview: {
    select: {
      firstName: "firstName",
      lastName: "lastName",
      imageUrl: "imageUrl",
    },
    prepare({ firstName, lastName, imageUrl }) {
      return {
        title: `${firstName.charAt(0).toUpperCase()}${firstName.slice(1)} ${lastName.charAt(0).toUpperCase()}${lastName.slice(1)}`,
        media: () => {
          return (
            <Image
              src={imageUrl}
              alt={`${firstName} ${lastName}`}
              width={100}
              height={100}
            />
          );
        },
      };
    },
  },
});
