import groq from "groq";
import { client } from "../adminClient";
import { sanityFetch } from "../live";

export async function createStudentIfNotExists({
  clerkId,
  email,
  firstName,
  lastName,
  imageUrl,
}) {
  try {
    // First check if student exists
    const existingStudentQuery = await sanityFetch({
      query: groq`*[_type == "student" && clerkId == $clerkId][0]`,
      params: { clerkId },
    });

    if (existingStudentQuery.data) {
      console.log("Student already exists", existingStudentQuery.data);
      return existingStudentQuery.data;
    }

    // If no student exists, create a new one
    const newStudent = await client.create({
      _type: "student",
      clerkId,
      email,
      firstName,
      lastName,
      imageUrl,
    });

    console.log("New student created", newStudent);

    return newStudent;
  } catch (error) {
    console.error("Error in createStudentIfNotExists:", error);
    throw new Error("Failed to create or fetch student");
  }
}
