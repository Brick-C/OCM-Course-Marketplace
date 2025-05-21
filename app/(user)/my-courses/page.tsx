import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getEnrolledCourses } from "../../../sanity/lib/student/getEnrolledCourses";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { CourseCard } from "../../../components/CourseCard";
import { getCourseProgress } from "../../../sanity/lib/lessons/getCourseProgress";
import "./myCourse.css";

export default async function MyCoursesPage() {
  const user = await currentUser();

  if (!user?.id) {
    return redirect("/");
  }

  const enrolledCourses = await getEnrolledCourses(user.id);

  // Get progress for each enrolled course
  const coursesWithProgress = await Promise.all(
    enrolledCourses.map(async ({ course }) => {
      if (!course) return null;
      const progress = await getCourseProgress(user.id, course._id);
      return {
        course,
        progress: progress.courseProgress,
      };
    })
  );

  return (
    <div className="my-courses-page-container">
      <div className="my-courses-content-wrapper">
        <div className="my-courses-header">
          <GraduationCap className="my-courses-icon" />
          <h1 className="my-courses-title">My Courses</h1>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="no-courses-message">
            <h2 className="no-courses-title">No courses yet</h2>
            <p className="no-courses-text">
              You haven&apos;t enrolled in any courses yet. Browse our courses
              to get started!
            </p>
            <Link href="/" prefetch={false} className="browse-courses-button">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="enrolled-courses-grid">
            {coursesWithProgress.map((item) => {
              if (!item || !item.course) return null;

              return (
                <CourseCard
                  key={item.course._id}
                  course={item.course}
                  progress={item.progress}
                  href={`/dashboard/courses/${item.course._id}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
