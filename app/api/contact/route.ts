import { NextResponse } from "next/server";
import { z } from "zod";

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
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // In production: send email via Nodemailer, save to DB
    console.log("Contact form submission:", data);

    return NextResponse.json({ success: true, message: "Message received. We will contact you within 24 hours." });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: "Validation failed", details: err.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
