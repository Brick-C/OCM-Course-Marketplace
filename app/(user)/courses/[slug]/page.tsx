import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import getCourseBySlug from "../../../../sanity/lib/courses/getCourseBySlug";
import { isEnrolledInCourse } from "../../../../sanity/lib/student/isEnrolledInCourse";
import { urlFor } from "../../../../sanity/lib/image";
import EnrollButton from "../../../../components/EnrollButton";
import "./singleCourse.css";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  const { userId } = await auth();

  const isEnrolled =
    userId && course?._id
      ? await isEnrolledInCourse(userId, course._id)
      : false;

  if (!course) {
    return (
      <div className="course-not-found-container">
        <h1 className="course-not-found-title">Course not found</h1>
      </div>
    );
  }

  return (
    <div className="course-page-container">
      <div className="hero-section">
        {course.image && (
          <Image
            src={urlFor(course.image).url() || ""}
            alt={course.title || "Course Title"}
            fill
            className="hero-image"
            priority
          />
        )}

        <div className="hero-gradient-overlay" />
        <div className="hero-content-wrapper">
          <Link href="/" prefetch={false} className="back-link-container">
            <ArrowLeft className="back-arrow-icon" />
            <span className="back-link-text">Back to Courses</span>
          </Link>

          <div className="course-details-main">
            <div className="course-details-left">
              <div className="course-category-tag-container">
                <span className="course-category-tag">
                  {course.category?.name || "Uncategorized"}
                </span>
              </div>

              <h1 className="course-title-hero">{course.title}</h1>

              <p className="course-description-hero">{course.description}</p>
            </div>

            <div className="price-enroll-container">
              <div className="course-price-display">
                {course.price === 0 ? "Free" : `$${course.price}`}
              </div>

              <EnrollButton courseId={course._id} isEnrolled={isEnrolled} />
            </div>
          </div>
        </div>
      </div>

      <div className="content-section-wrapper">
        <div className="content-grid">
          <div className="course-modules-main">
            <div className="course-content-card">
              <h2 className="course-content-heading">Course Content</h2>
              <div className="modules-list">
                {course.modules?.map((module, index) => (
                  <div key={module._id} className="module-item">
                    <div className="module-header">
                      <h3 className="module-title">
                        Module {index + 1}: {module.title}
                      </h3>
                    </div>
                    <div className="lessons-list">
                      {module.lessons?.map((lesson, lessonIndex) => (
                        <div key={lesson._id} className="lesson-item">
                          <div className="lesson-details">
                            <div className="lesson-number-circle">
                              {lessonIndex + 1}
                            </div>

                            <div className="lesson-title-container">
                              <BookOpen className="lesson-icon" />
                              <span className="lesson-title-text">
                                {lesson.title}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="instructor-sidebar-wrapper">
            <div className="instructor-card">
              <h2 className="instructor-heading">Instructor</h2>
              {course.instructor && (
                <div>
                  <div className="instructor-details">
                    {course.instructor.photo && (
                      <div className="instructor-photo-container">
                        <Image
                          src={urlFor(course.instructor.photo).url() || ""}
                          alt={course.instructor.name || "Course Instructor"}
                          fill
                          className="instructor-photo"
                        />
                      </div>
                    )}
                    <div>
                      <div className="instructor-name">
                        {course.instructor.name}
                      </div>
                      <div className="instructor-role">Instructor</div>
                    </div>
                  </div>
                  {course.instructor.bio && (
                    <p className="instructor-bio">{course.instructor.bio}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
