import groq from "groq";
import { sanityFetch } from "../live";

export const getStudentByClerkId = async (clerkId) => {
  // GROQ query to fetch the student by Clerk ID
  const getStudentByClerkIdQuery = groq`*[_type == "student" && clerkId == $clerkId][0]`;

  try {
    const student = await sanityFetch({
      query: getStudentByClerkIdQuery,
      params: { clerkId },
    });

    console.log("Student fetched from Sanity:", student);

    return student; // Return the student object directly
  } catch (error) {
    console.error("Error fetching student by Clerk ID:", error);
    throw new Error("Failed to fetch student");
  }
};
