import groq, { defineQuery } from "groq";
import { sanityFetch } from "../live";

export const getCourses = async () => {
  const getCoursesQuery = groq(`*[_type == "course"]{
    ..., "slug": slug.current, 
    "category":category->{...},
    "instructor":instructor->{...}
        }`);

  const courses = await sanityFetch({ query: getCoursesQuery });
  return courses.data;
};
