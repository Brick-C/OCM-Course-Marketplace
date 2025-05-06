import { blockContent } from "./blockContent";
import { categoryTypes } from "./categoryTypes";
import { courseTypes } from "./courseTypes";
import { enrollmentTypes } from "./enrollmentTypes";
import { instructorTypes } from "./instructorTypes";
import { lessonCompletionTypes } from "./lessonCompletionTypes";
import { lessonTypes } from "./lessonTypes";
import { moduleTypes } from "./moduleTypes";
import { studentTypes } from "./studentTypes";

export const schema = {
  types: [
    studentTypes,
    courseTypes,
    lessonTypes,
    moduleTypes,
    instructorTypes,
    blockContent,
    enrollmentTypes,
    categoryTypes,
    lessonCompletionTypes,
  ],
};
