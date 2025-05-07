import groq from "groq";
import { sanityFetch } from "../live";

export const searchCourses = async (term) => {
  const searchQuery = groq`
    *[_type == "course" && (title match $term + "*" || description match $term + "*" || category->name match $term + "*")]{
      _id,
      title,
      description,
      "slug": slug.current,
      "category": category->{name},
      "instructor": instructor->{name, image},
      price,
      image
    }
  `;

  const courses = await sanityFetch({
    query: searchQuery,
    params: { term },
  });

  return courses.data;
};
