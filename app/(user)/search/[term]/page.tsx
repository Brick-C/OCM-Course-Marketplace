import { Search } from "lucide-react";
import { CourseCard } from "../../../../components/CourseCard";
import { searchCourses } from "../../../../sanity/lib/courses/searchCourses";
import "./search.css";

interface SearchPageProps {
  params: Promise<{
    term: string;
  }>;
}

export default async function SearchPage({ params }: SearchPageProps) {
  const { term } = await params;
  const decodedTerm = decodeURIComponent(term);
  const courses = await searchCourses(decodedTerm);

  return (
    <div className="search-page-container">
      <div className="search-results-content">
        <div className="search-header">
          <Search className="search-icon" />
          <div>
            <h1 className="search-title">Search Results</h1>
            <p className="search-summary">
              Found {courses.length} result{courses.length === 1 ? "" : "s"} for
              &quot;{decodedTerm}&quot;
            </p>
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="no-results-message">
            <h2 className="no-results-title">No courses found</h2>
            <p className="no-results-text">
              Try searching with different keywords
            </p>
          </div>
        ) : (
          <div className="search-results-grid">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                href={`/courses/${course.slug}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
