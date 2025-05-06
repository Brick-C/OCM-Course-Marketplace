// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title("Admin Dashboard")
    .items([
      S.listItem()
        .title("Course Content")
        .child(
          S.documentTypeList("course")
            .title("Courses")
            .child((courseId) =>
              S.list()
                .title("Course Options")
                .items([
                  // Edit course
                  S.listItem()
                    .title("Edit Course Content")
                    .child(
                      S.document().schemaType("course").documentId(courseId)
                    ),
                  // Option to view course enrollments
                  S.listItem()
                    .title("View Enrollments")
                    .child(
                      S.documentList()
                        .title("Enrollments")
                        .filter(
                          "_type == 'enrollment' && course._ref == $courseId"
                        )
                        .params({ courseId })
                    ),
                ])
            )
        ),

      S.divider(),

      // User Management
      S.listItem()
        .title("User Management")
        .child(
          S.list()
            .title("Select User Type")
            .items([
              // Instructor with options
              S.listItem()
                .title("Instructors")
                .schemaType("instructor")
                .child(
                  S.documentTypeList("instructor")
                    .title("Instructors")
                    .child((instructorId) =>
                      S.list()
                        .title("Instructor Options")
                        .items([
                          // Edit instructor
                          S.listItem()
                            .title("Edit Instructor Details")
                            .child(
                              S.document()
                                .schemaType("instructor")
                                .documentId(instructorId)
                            ),
                          // Option to view instructor courses
                          S.listItem()
                            .title("View Courses")
                            .child(
                              S.documentList()
                                .title("Instructor Courses")
                                .filter(
                                  `_type == "course" && instructor._ref == $instructorId`
                                )
                                .params({ instructorId })
                            ),
                        ])
                    )
                ),

              // Student with options
              S.listItem()
                .title("Students")
                .schemaType("student")
                .child(
                  S.documentTypeList("student")
                    .title("Students")
                    .child((studentId) =>
                      S.list()
                        .title("Student Options")
                        .items([
                          S.listItem()
                            .title("Edit Student Details")
                            .child(
                              S.document()
                                .schemaType("student")
                                .documentId(studentId)
                            ),

                          // Option to view student enrollments
                          S.listItem()
                            .title("View Enrollments")
                            .child(
                              S.documentList()
                                .title("Student Enrollments")
                                .filter(
                                  `_type == "enrollment" && studentId._ref == $studentId`
                                )
                                .params({ studentId })
                            ),

                          // Option to view completed courses
                          S.listItem()
                            .title("View Completed Courses")
                            .child(
                              S.documentList()
                                .title("Completed Courses")
                                .schemaType("lessonCompletion")
                                .filter(
                                  `_type == "lessonCompletion" && studentId._ref == $studentId`
                                )
                                .params({ studentId })
                                .defaultOrdering([
                                  { field: "completedAt", direction: "desc" },
                                ])
                            ),
                        ])
                    )
                ),
            ])
        ),

      S.divider(),

      // System Management
      S.listItem()
        .title("System Management")
        .child(
          S.list()
            .title("System Management")
            .items([S.documentTypeListItem("category").title("Categories")])
        ),
    ]);
