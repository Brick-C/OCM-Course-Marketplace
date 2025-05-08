import Image from "next/image";
import { defineField, defineType } from "sanity";
// Remove the import for Image from "next/image"; as it's not used here
// import Image from "next/image";

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
      type: "url", // This field stores a URL string
    }),
  ],
  preview: {
    select: {
      firstName: "firstName",
      lastName: "lastName",
      imageUrl: "imageUrl", // Select the URL string
    },
    prepare({ firstName, lastName, imageUrl }) {
      // Ensure firstName and lastName are not null or undefined before using charAt/slice
      const safeFirstName = firstName || "";
      const safeLastName = lastName || "";

      return {
        // Capitalize first letter of first and last names for the title
        title: `${safeFirstName.charAt(0).toUpperCase()}${safeFirstName.slice(1)} ${safeLastName.charAt(0).toUpperCase()}${safeLastName.slice(1)}`,
        // Provide the imageUrl string directly to the media property
        media: (
          <Image
            src={imageUrl}
            alt={`${firstName} ${lastName}`}
            width={100}
            height={100}
          />
        ),
      };
    },
  },
});
