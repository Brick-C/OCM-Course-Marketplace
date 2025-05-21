import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { getLessonById } from "../../../../../../../sanity/lib/lessons/getLessonById";
import { PortableText } from "@portabletext/react";
import { VideoPlayer } from "../../../../../../../components/VideoPlayer";
import { LessonCompleteButton } from "../../../../../../../components/LessonCompleteButton";
import "./lessons.css";

interface LessonPageProps {
  params: Promise<{
    courseId: string;
    lessonId: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const user = await currentUser();
  const { courseId, lessonId } = await params;

  const lesson = await getLessonById(lessonId);

  if (!lesson) {
    return redirect(`/dashboard/courses/${courseId}`);
  }

  return (
    <div className="lesson-page-container">
      <div className="lesson-content-scroll-area">
        <div className="lesson-content-wrapper">
          <h1 className="lesson-title">{lesson.title}</h1>

          {lesson.description && (
            <p className="lesson-description">{lesson.description}</p>
          )}

          <div className="lesson-sections-container">
            {lesson.videoUrl && <VideoPlayer url={lesson.videoUrl} />}

            {lesson.content && (
              <div>
                <h2 className="lesson-notes-heading">Lesson Notes</h2>
                <div className="lesson-portable-text-content">
                  <PortableText value={lesson.content} />
                </div>
              </div>
            )}

            <div className="lesson-actions">
              <LessonCompleteButton lessonId={lesson._id} clerkId={user!.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
