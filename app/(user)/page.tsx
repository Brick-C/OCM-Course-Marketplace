import Hero from "../../components/Hero";
import { CourseCard } from "../../components/CourseCard";
import { getCourses } from "../../sanity/lib/courses/getCourses";
import "./homePage.css";
export const dynamic = "force-static";
export const revalidate = 3600; // revalidate at most every hour

export default async function Home() {
  const courses = await getCourses();

  return (
    <div className="page-container">
      <Hero />

      {/* Courses Grid Section */}
      <div className="courses-grid-section">
        {/* Featured Courses Heading */}
        <div className="featured-courses-heading-container">
          <div className="heading-line"></div>
          <span className="heading-text">Featured Courses</span>
          <div className="heading-line"></div>
        </div>

        {/* Grid for Course Cards */}
        <div className="course-cards-grid">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              href={`/courses/${course.slug}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
