"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Library, PlayCircle, X, Check } from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { usePathname } from "next/navigation";
import {
  GetCourseByIdQueryResult,
  GetCompletionsQueryResult,
  Module,
} from "../../sanity.types";
import { useSidebar } from "../../components/providers/sidebar-provider";
import { useEffect, useState } from "react";

import DarkModeToggle from "../DarkModeToggle";
import { CourseProgress } from "../../components/CourseProgress";
import { calculateCourseProgress } from "../../lib/courseProgress";
import "./sidebar.css";

interface SidebarProps {
  course: GetCourseByIdQueryResult;
  completedLessons?: GetCompletionsQueryResult["completedLessons"];
}

interface SidebarContentProps {
  course: NonNullable<GetCourseByIdQueryResult>;
  progress: number;
  completedLessons: GetCompletionsQueryResult["completedLessons"];
  close: () => void;
}

export function Sidebar({ course, completedLessons = [] }: SidebarProps) {
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();
  const [isMounted, setIsMounted] = useState(false);
  const [openModules, setOpenModules] = useState<string[]>([]);

  useEffect(() => {
    if (pathname && course?.modules) {
      const currentModuleId = course.modules.find((module) =>
        module.lessons?.some(
          (lesson) =>
            pathname ===
            `/dashboard/courses/${course._id}/lessons/${lesson._id}`
        )
      )?._id;

      if (currentModuleId && !openModules.includes(currentModuleId)) {
        setOpenModules((prev) => [...prev, currentModuleId]);
      }
    }
  }, [pathname, course, openModules]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!course || !isMounted) {
    return null;
  }

  const progress = calculateCourseProgress(
    course.modules as unknown as Module[],
    completedLessons
  );

  const SidebarContent = ({
    course,
    progress,
    completedLessons,
    close,
  }: SidebarContentProps) => (
    <div className="sidebar-content-container">
      <div className="sidebar-header">
        <div className="sidebar-header-top">
          <Link href="/my-courses" className="course-library-link">
            <ArrowLeft className="course-library-icon" />
            <div className="course-library-link-content">
              <Library className="course-library-icon" />
              <span>Course Library</span>
            </div>
          </Link>
          <div className="header-actions">
            <DarkModeToggle />

            <Button
              onClick={close}
              variant="ghost"
              className="mobile-close-button"
              size="icon"
            >
              <X className="mobile-close-icon" />
            </Button>
          </div>
        </div>
        <div className="course-info-section">
          <h1 className="course-title-sidebar">{course.title}</h1>
          <CourseProgress
            progress={progress}
            variant="success"
            label="Course Progress"
          />
        </div>
      </div>
      <ScrollArea className="scroll-area-wrapper">
        <div className="accordion-padding-wrapper">
          <Accordion
            type="multiple"
            className="modules-accordion"
            value={openModules}
            onValueChange={setOpenModules}
          >
            {course.modules?.map((module, moduleIndex) => (
              <AccordionItem
                key={module._id}
                value={module._id}
                className={cn(
                  "module-accordion-item",
                  moduleIndex % 2 === 0
                    ? "module-accordion-item-even"
                    : "module-accordion-item-odd"
                )}
              >
                <AccordionTrigger className="module-accordion-trigger">
                  <div className="module-trigger-content">
                    <span className="module-number">
                      {String(moduleIndex + 1).padStart(2, "0")}
                    </span>
                    <div className="module-title-wrapper">
                      <p className="module-title-text">{module.title}</p>
                      <p className="module-lesson-count">
                        {module.lessons?.length || 0} lessons
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="accordion-content-padding">
                  <div className="lessons-list-container">
                    {module.lessons?.map((lesson, lessonIndex) => {
                      const isActive =
                        pathname ===
                        `/dashboard/courses/${course._id}/lessons/${lesson._id}`;
                      const isCompleted = completedLessons.some(
                        (completion) => completion.lesson?._id === lesson._id
                      );

                      return (
                        <Link
                          key={lesson._id}
                          prefetch={false}
                          href={`/dashboard/courses/${course._id}/lessons/${lesson._id}`}
                          onClick={close}
                          className={cn(
                            "lesson-link",
                            isActive && "lesson-link-active",
                            isCompleted && "lesson-link-completed"
                          )}
                        >
                          <span className="lesson-number-inner">
                            {String(lessonIndex + 1).padStart(2, "0")}
                          </span>
                          {isCompleted ? (
                            <Check className="lesson-check-icon" />
                          ) : (
                            <PlayCircle
                              className={cn(
                                "lesson-play-icon",
                                isActive
                                  ? "lesson-play-icon-active"
                                  : "lesson-play-icon-inactive"
                              )}
                            />
                          )}
                          <span
                            className={cn(
                              "lesson-title-link",
                              isCompleted && "lesson-title-link-completed"
                            )}
                          >
                            {lesson.title}
                          </span>
                          {isActive && (
                            <div className="lesson-active-indicator" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <>
      {/* Main Sidebar - Desktop & Mobile */}
      <aside
        className={cn(
          "main-sidebar",
          "lg:z-50 lg:block lg:w-96 lg:border-r", // Keep these for desktop-specific behavior if not handled by custom CSS
          isOpen ? "main-sidebar-open" : "main-sidebar-closed"
        )}
      >
        <div className="main-sidebar-inner-wrapper">
          <SidebarContent
            course={course}
            progress={progress}
            completedLessons={completedLessons}
            close={close}
          />
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && <div className="mobile-overlay" onClick={close} />}
    </>
  );
}
