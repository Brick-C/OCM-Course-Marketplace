import { client } from "../adminClient";

export async function createEnrollment({
  studentId,
  courseId,
  paymentId,
  amount,
}) {
  try {
    const enrollment = await client.create({
      _type: "enrollment",
      student: {
        _type: "reference",
        _ref: studentId,
      },
      course: {
        _type: "reference",
        _ref: courseId,
      },
      paymentId,
      amount,
      enrolledAt: new Date().toISOString(),
    });

    console.log("Enrollment created:", enrollment);
    return enrollment;
  } catch (error) {
    console.error("Error creating enrollment:", error);
    throw new Error("Failed to create enrollment");
  }
}
