import { NextResponse } from "next/server";

const DOC_FEE = 500;
const COM_FEE_RATE = 0.01;
const SPF_RATE = 0.005;

export async function POST(request: Request) {
  try {
    const { monthly, terms, rate = 1.8 } = await request.json();

    if (!monthly || monthly < 2000) return NextResponse.json({ error: "Monthly pension must be at least ₱2,000" }, { status: 400 });
    if (!terms || terms <= 0) return NextResponse.json({ error: "Terms must be greater than 0" }, { status: 400 });

    const loanAmount = monthly * terms;
    const grossInterest = loanAmount * (rate / 100) * terms;
    const comFee = loanAmount * COM_FEE_RATE;
    const spf = loanAmount * SPF_RATE;
    const netProceeds = loanAmount - grossInterest - DOC_FEE - comFee - spf;

    return NextResponse.json({ loanAmount, grossInterest, docFee: DOC_FEE, comFee, spf, netProceeds, rate });
  } catch {
    return NextResponse.json({ error: "Calculation failed" }, { status: 500 });
  }
}
