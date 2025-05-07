import groq, { defineQuery } from "groq";
import { sanityFetch } from "../live";

export const getStudentByClerkId = async (clerkId) => {
  //groq or defineQuery
  const getStudentByClerkIdQuery = groq`*[_type == "student" && clerkId == $clerkId[0]]`;

  const student = await sanityFetch({
    query: getStudentByClerkIdQuery,
    params: { clerkId },
  });

  return student.data[0]; //or just student.data
};
