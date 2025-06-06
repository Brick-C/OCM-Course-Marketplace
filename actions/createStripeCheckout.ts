"use server";

import stripe from "../lib/stripe";
import baseUrl from "../lib/baseUrl";

import { urlFor } from "../sanity/lib/image";
import getCourseById from "../sanity/lib/courses/getCourseById";
import { createStudentIfNotExists } from "../sanity/lib/student/createStudentIfNotExists";
import { clerkClient } from "@clerk/nextjs/server";
import { createEnrollment } from "../sanity/lib/student/createEnrollment";

export async function createStripeCheckout(courseId: string, userId: string) {
  try {
    const course = await getCourseById(courseId);
    const clerkUser = await (await clerkClient()).users.getUser(userId);
    const { emailAddresses, firstName, lastName, imageUrl } = clerkUser;
    const email = emailAddresses[0]?.emailAddress;

    if (!emailAddresses || !email) {
      throw new Error("User details not found");
    }

    if (!course) {
      throw new Error("Course not found");
    }

    //studetn does not exist
    const user = await createStudentIfNotExists({
      clerkId: userId,
      email: email || "",
      firstName: firstName || email,
      lastName: lastName || "",
      imageUrl: imageUrl || "",
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (!course.price && course.price !== 0) {
      throw new Error("Course price is not set");
    }
    const priceInCents = Math.round(course.price * 100);

    // free courses
    if (priceInCents === 0) {
      await createEnrollment({
        studentId: user._id,
        courseId: course._id,
        paymentId: "free",
        amount: 0,
      });

      return { url: `/courses/${course.slug?.current}` };
    }

    const { title, description, image, slug } = course;

    if (!title || !description || !image || !slug) {
      throw new Error("Course data is incomplete");
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: title,
              description: description,
              images: [urlFor(image).url() || ""],
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/courses/${slug.current}`,
      cancel_url: `${baseUrl}/courses/${slug.current}?canceled=true`,
      metadata: {
        courseId: course._id,
        userId: userId,
      },
    });

    return { url: session.url };
  } catch (error) {
    console.error("Error in createStripeCheckout:", error);
    throw new Error("Failed to create checkout session");
  }
}
