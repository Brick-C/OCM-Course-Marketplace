import { searchCourses } from "@/sanity/lib/courses/searchCourses";
import { redirect } from "next/navigation";
import React from "react";

export default async function SearchPage({ searchParams }) {
  const term = await (await searchParams).term;

  if (!term || typeof term !== "string") {
    redirect("/");
  }

  const decodedTerm = decodeURIComponent(term);

  const courses = await searchCourses(decodedTerm);

  return <div>Search page: {decodedTerm}</div>;
}
