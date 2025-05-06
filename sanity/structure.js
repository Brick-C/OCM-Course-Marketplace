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
            .child((courseId) => {
              return S.list()
                .title("Course Options")
                .items([
                  //Edit course
                  S.listItem()
                    .title("Edit Course Content")
                    .child(
                      S.document().schemaType("course").documentId(courseId)
                    ),
                  //option to view course enrollments
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
                ]);
            })
        ),

      S.divider(),

      //User Management
      S.listItem()
        .title("User Management")
        .child(S.list().title("Select User Type")),
    ]);
