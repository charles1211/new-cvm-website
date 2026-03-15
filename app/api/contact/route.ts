import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyRecaptcha } from "@/lib/recaptcha";

const contactSchema = z.object({
  type: z.string().min(1),
  name: z.string().min(2),
  address: z.string().min(5),
  age: z.number().positive().max(120),
  mobileNo: z.string().length(11),
  email: z.string().email(),
  loanInquiry: z.string().min(10),
  message: z.string().min(10),
  agreeToTerms: z.boolean().refine((v) => v === true),
  recaptchaToken: z.string().min(1, "reCAPTCHA token is required"),
});

// Minimum score threshold — 0.5 is Google's recommended default
const RECAPTCHA_SCORE_THRESHOLD = 0.5;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { recaptchaToken, ...fields } = contactSchema.parse(body);

    // Verify reCAPTCHA v3 token
    const captcha = await verifyRecaptcha(recaptchaToken);
    if (!captcha.success || captcha.score < RECAPTCHA_SCORE_THRESHOLD) {
      return NextResponse.json(
        { success: false, error: "reCAPTCHA verification failed. Please try again." },
        { status: 400 }
      );
    }

    // In production: send email via Nodemailer / save to DB
    console.log("Contact form submission (score:", captcha.score, "):", fields);

    return NextResponse.json({
      success: true,
      message: "Message received. We will contact you within 24 hours.",
    });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: err.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
