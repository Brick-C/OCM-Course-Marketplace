"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { urlFor } from "../sanity/lib/image";
import {
  GetCoursesQueryResult,
  GetEnrolledCoursesQueryResult,
} from "../sanity.types";
import { CourseProgress } from "./CourseProgress";
import "./styles/courseCard.css";

interface CourseCardProps {
  course:
    | GetCoursesQueryResult[number]
    | NonNullable<
        NonNullable<GetEnrolledCoursesQueryResult>["enrolledCourses"][number]["course"]
      >;
  progress?: number;
  href: string;
}

export function CourseCard({ course, progress, href }: CourseCardProps) {
  return (
    <Link href={href} prefetch={false} className="course-card-link-wrapper">
      <div className="course-card-container">
        <div className="course-card-image-wrapper">
          {course.image ? (
            <Image
              src={urlFor(course.image).url() || ""}
              alt={course.title || "Course Image"}
              fill
              className="course-card-image"
            />
          ) : (
            <div className="course-card-placeholder-image">
              <BookOpen className="course-card-placeholder-icon" />
            </div>
          )}

          <div className="course-card-image-overlay" />

          <div className="course-card-tags-container">
            <span className="course-card-category-tag">
              {course.category?.name || "Uncategorized"}
            </span>

            {"price" in course && typeof course.price === "number" && (
              <span className="course-card-price-tag">
                {course.price === 0
                  ? "Free"
                  : `$${course.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}`}
              </span>
            )}
          </div>
        </div>

        <div className="course-card-body">
          <h3 className="course-card-title">{course.title}</h3>
          <p className="course-card-description">{course.description}</p>

          <div className="course-card-footer-section">
            {course.instructor && (
              <div className="course-card-instructor-info">
                <div className="course-card-instructor-details">
                  {course.instructor.photo ? (
                    <div className="course-card-instructor-photo-wrapper">
                      <Image
                        src={urlFor(course.instructor.photo).url() || ""}
                        alt={course.instructor.name || "Instructor"}
                        fill
                        className="course-card-instructor-photo"
                      />
                    </div>
                  ) : (
                    <div className="course-card-instructor-placeholder">
                      <BookOpen className="course-card-instructor-placeholder-icon" />
                    </div>
                  )}
                  <span className="course-card-instructor-name">
                    by {course.instructor.name}
                  </span>
                </div>
              </div>
            )}
            {typeof progress === "number" && (
              <CourseProgress
                progress={progress}
                variant="default"
                size="sm"
                label="Course Progress"
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
