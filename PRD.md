# Product Requirements Document (PRD)
## CVM Finance and Credit Corporation — Public Website

**Version:** 2.0
**Date:** 2026-03-11
**Status:** Draft — Frontend Recreation Reference

---

## 1. Overview

The CVM Finance and Credit Corporation (CVMFCC) website is a public-facing web application providing information about financial products, branch locations, contact details, news, a loan calculator, and an online payment flow integrated with Paynamics. This document serves as the complete content and feature reference for recreating the frontend in a modern tech stack.

---

## 2. Current vs. Recommended Tech Stack

| Layer | Current (Legacy) | Modern (Target) |
|---|---|---|
| Framework | React 16 (Class Components) | Next.js 14+ (App Router) |
| Language | JavaScript | TypeScript |
| Styling | Material-UI v4 | Tailwind CSS + shadcn/ui |
| Animations | CSS transitions | Framer Motion |
| State / Data | Component state | TanStack Query + Zustand |
| Forms | Manual validation | React Hook Form + Zod |
| HTTP Client | Axios | Axios + TanStack Query |
| Carousel | react-slick | Embla Carousel |
| Icons | Material Icons | Lucide React |
| Barcode | JsBarcode | react-barcode |
| reCAPTCHA | react-google-recaptcha | react-google-recaptcha |
| Lottie | lottie-react | lottie-react |

---

## 3. Shared Layout

### 3.1 Header / Navigation
- **Logo:** `https://cvmfinancediag.blob.core.windows.net/cvmfcc-website/CVMFCCLogo.webp`
- **Logo click** → navigates to `/`
- **Desktop (> 1024px):** Full nav links inline, right-aligned
- **Mobile/Tablet (≤ 1024px):** Hamburger icon → top-sliding Drawer with same links
- **Nav links:** HOME, PRODUCTS, BRANCHES, LOAN CALCULATOR, CONTACT US, ABOUT US, NEWS
- **Modern redesign ideas:** Sticky transparent-to-solid header on scroll, smooth underline active-link indicator, mobile sheet animation

### 3.2 Footer
Three-column grid (stacks on mobile):

| Column | Content | Data Source |
|---|---|---|
| Contact Us | Landline phone numbers as clickable `tel:` links | `GET /api/information` → type: "Contact No", name: "Landline" |
| Office Hours | Operating schedule text rows | `GET /api/information` → type: "Operating Hours" |
| Follow Us | Social media icon links: Facebook, Instagram, YouTube, TikTok (excludes Messenger & Twitter) | `GET /api/information` → type: "Social Media" |

- Skeleton loaders shown during data fetch
- Copyright: `© [currentYear] CVM Finance and Credit Corporation. All rights reserved.`

### 3.3 Facebook Messenger Chat Widget
- Embedded on all pages (bottom-right bubble)
- PageID: `196748391200637` | AppID: `780971119317321`
- Language: `en_UK`, greetingDialogDisplay: `fade`, greetingDialogDelay: `5s`

---

## 4. Page-by-Page Content Reference

---

### PAGE 1 — HOME (`/`)

#### Section 1: Hero Carousel
- Full-width auto-playing image carousel
- Navigation: left/right arrows + dot indicators
- Each slide: full-width image that is a clickable link to an external URL
- Data: `GET /api/information` → filtered by type "Carousel"
- Skeleton shown while loading
- **Modern redesign:** Full-viewport-height hero, parallax scroll, smooth crossfade transitions

#### Section 2: ISO 9001:2015 Certification Strip
- Yellow gradient horizontal banner
- Left: CVM logo | Right: ISO 9001:2015 certification badge
- Static text confirming ISO certification
- **Modern redesign:** Scroll-triggered animated badge reveal, subtle gradient shimmer

#### Section 3: Inquire / Help CTA
- Two-column layout:
  - **Left:** Feature image with hover zoom effect
  - **Right:** Headline + CTA button
- Headline: "We are here to help you and your business grow"
- CTA: "Inquire Now" → `/contacts`
- Scroll-reveal entry animation
- **Modern redesign:** Glassmorphism card overlay, gradient headline text, animated button

#### Section 4: Featured Products (4 Cards)
- Dark blue (#031D33) background section
- 4 product cards sourced from `GET /api/product`:
  1. **Pension Loan** — featured card with yellow header accent
  2. **Private Teacher's Loan** — "NEW" badge
  3. **Sangla ORCR** — "NEW" badge
  4. **Sangla Titulo** — "NEW" badge
- Each card contains:
  - Product name + subtitle
  - Feature list with checkmark icons
  - "Who are qualified" button → opens **Qualification Modal** (see Section 9)
  - "Inquire Now" button → `/contacts`
- Hover: card lifts with drop shadow
- **Modern redesign:** Glassmorphism dark cards, staggered entrance animation, smooth modal

#### Section 5: Business Loan Feature
- Alternating image + text layout (content on right, image on left)
- CTA: "How to Loan" → `/loan`
- **Modern redesign:** Split-screen layout, floating card over image

#### Section 6: Branches Feature
- Image on left + text content on right
- CTA: "View Branches" → `/branches`

#### Section 7: Payment Outlet Partners
- Dark overlay background section
- Title/label text
- Grid of ~6 partner logos: BDO, Bayad Center, 7-Eleven, GCash, PayMaya, etc.
- Hover zoom animation per logo
- **Modern redesign:** Infinite scrolling marquee strip of logos

#### Section 8: Testimonials Carousel
- Auto-rotating carousel with fade transition
- 3 static (hardcoded) testimonials:
  - Circular avatar image with border
  - Quote text in italics
  - Client name + metadata (static)
- Dot navigation
- **Modern redesign:** Card-based layout with star ratings, slide animation

#### Section 9: Product Qualification Modal
- Triggered by "Who are qualified" on product cards
- Displays `extendedProperties` JSON from product API
- Rendered as hierarchical nested list of requirements/qualifications
- Close/dismiss button

---

### PAGE 2 — PRODUCTS (`/products`)

#### Section 1: Page Banner
- Full-width background image with yellow color overlay
- Title: "Our Products"
- Subtitle: "CVM Finance is the partner you can trust..."

#### Section 2: Product Grid
- Responsive: 3–4 columns desktop, 1–2 mobile
- Data: `GET /api/product` (enabled only)
- Product schema: `{ id, name, description1, description2, description3, extendedProperties (JSON), imagePath, isEnabled }`
- Each card:
  | Element | Notes |
  |---|---|
  | Product image | Hosted on Azure Blob Storage |
  | Product name | Card heading |
  | Loanable Amount | `description1` |
  | Terms | `description2` |
  | Interest Rate | `description3` |
  | "Inquire Now" | → `/contacts` |
  | "More Info..." | → opens Product Detail Modal |
- Skeleton loading cards during fetch

#### Section 3: Product Detail Modal
- Triggered by "More Info..." button
- Displays `extendedProperties` JSON as hierarchical list of requirements
- **Modern redesign:** Bottom sheet on mobile, centered modal on desktop with slide-up animation

---

### PAGE 3 — LOAN CALCULATOR (`/loan-calculator`)

#### Section 1: Page Banner
- Full-width background image

#### Section 2: Page Title
- "Loan Calculator" in large yellow text

#### Section 3: Pension Loan Calculator Form
Two-panel layout:

**Left Panel (yellow background):**
- Product name heading
- Description text about the pension loan

**Right Panel (white form):**

| Field | Type | Validation |
|---|---|---|
| Monthly Pension | Number (masked currency) | Required, min: 2000 |
| Terms (months) | Number | Required, must be > 0 |
| Interest Rate | Read-only display | Default: 1.8% |

**Outputs (displayed after Calculate):**

| Output | Formula |
|---|---|
| Loan Amount | `terms × monthly` |
| Net Proceeds | `loanAmount − (loanAmount × (intRate/100) × terms) − DocFee − ComFee − SPF` |

- Errors displayed below each field; cleared on valid input
- **Modern redesign:** Real-time live calculation as user types (no button needed), animated result card reveal

---

### PAGE 4 — BRANCHES (`/branches`)

#### Section 1: Page Banner
- Full-width background image
- Title: "Our Branches" | Subtitle: "Over 50 branches"

#### Section 2: Search Bar
- Full-width text input with search icon
- Real-time filter: narrows branch card display by branch name as user types

#### Section 3: Branch Cards Grid
- Responsive: 3 columns desktop, 1–2 mobile
- Data: `GET /api/branch`
- Branch schema: `{ id, name, location, mobileNo, telNo, imagePath, googleMapUrl, faceBookUrl }`

Each card:

| Element | Behavior |
|---|---|
| Branch image | Clickable → opens `googleMapUrl` |
| Branch name | Displayed as "CVM FINANCE [NAME]" |
| Location/Address | Static text |
| Mobile number | Clickable `tel:` link |
| Telephone number | Clickable `tel:` link |
| "View Map" button | Opens `googleMapUrl` |
| "Facebook" button | Opens `faceBookUrl` (disabled/greyed if null) |

- Skeleton cards during fetch
- **Modern redesign:** Toggle between list view and interactive map view, region/area filter chips

---

### PAGE 5 — CONTACT US (`/contacts`)

#### Section 1: Page Banner
- Full-width banner image with dark overlay
- Title: "We're here to help"

#### Section 2: Two-Column Layout

**LEFT — Contact Details Card:**
- Heading: "Contact Details"
- Messenger link: icon + username (clickable)
- Phone list (Smart, Globe, Sun mobile, Landline) — all `tel:` links
- Social media: Facebook icon (clickable link to FB page)
- Helper text: "For all questions, please use the form to the right"
- Data: `GET /api/information` → filtered by type "Contact No" and "Social Media"

**RIGHT — Contact Form Card:**
- Heading: "Get in touch with us"

| Field | Type | Validation |
|---|---|---|
| Type | Select/Dropdown | Required; options: New Loan Inquiry, Existing Client Support, Payment Assistance, Other Concern |
| Full Name | Text | Required |
| Address | Text | Required |
| Age | Number | Required, must be > 0 |
| Mobile Number | Number | Required, exactly 11 digits |
| Email Address | Email | Required, valid email format |
| Loan Inquiry | Multiline text | Required |
| Message | Multiline text | Required |
| Agree to T&C | Checkbox | Must be checked; label links to `/terms-and-condition` |
| reCAPTCHA v2 | Widget | Must pass verification |

- Submit: "Send Message" button
- Loading: full-screen backdrop overlay during submission
- Success: snackbar notification + form reset
- Error: snackbar error notification
- API: `POST /api/contactus` (backend validates with Yup + reCAPTCHA, sends email via Nodemailer to `CUSTOMER_SERVICE_EMAIL`)
- **Modern redesign:** Floating label inputs, animated submit button with loading spinner, toast notifications

---

### PAGE 6 — ABOUT US (`/about`)

All content is static (hardcoded).

#### Section 1: Page Banner
- Full-width banner image

#### Section 2: Company History
- Heading: "OUR HISTORY"
- 2 paragraphs covering:
  - Founded: 1994 by current owner
  - Services: lending to government employees, pensioners, private sector
  - Location: Laguna, Philippines
  - Business focus and growth overview

#### Section 3: Mission, Vision, Core Values (3 Cards)
| Card | Content |
|---|---|
| Our Mission | Mission statement paragraph |
| Our Vision | Vision statement paragraph |
| Our Core Values | 4 values: WE CHOOSE LOVE, WE BREATHE INTEGRITY, WE RUN AS ONE, BIDA BEST |
- Background image style cards, hover scale animation

#### Section 4: Quality Policy Statement
- Full-width card on yellow background
- Subheadings and paragraphs:
  - Introduction (founder & company values)
  - Service offerings & partner network
  - Compliance & quality management systems
  - Continuous improvement commitment
  - **OUR CORE FOCUS:** Financing Filipino dreams
  - **OUR NICHE:** Customized loan facilities for target markets

#### Section 5: History Timeline (5 Milestones)
| Year | Milestone Details |
|---|---|
| 1994 | Company establishment — 2 employees, 1 product, 100 clients |
| 1999 | First branch expansion — 1 branch, 6 employees, 2 products, 300 clients |
| 2003 | Name changed to CVMFCC — 2 branches, 10 employees, 2 products, 1,000 clients |
| 2013 | Expansion phase — 12 branches, 115 employees, 5 products, 4,000 clients, LAS system implemented |
| 2019 | Major growth — 56 branches, 288 employees, 16 products, 30,000 clients, ISO 9001:2015 certified |

- **Modern redesign:** Scroll-triggered animated vertical timeline, counter number animations

#### Section 6: Rise Above the Rest
- Styled background section
- Heading: "RISE ABOVE THE REST"
- 3 paragraphs about company goals and future vision

#### Section 7: Mother Company & Sister Companies
- Background image with dark overlay
- Heading: "OUR MOTHER COMPANY"
- Subheading: "St. Joseph Group Inc"
- 13 affiliated companies listed:
  1. CVM Finance and Credit Corporation
  2. CVM Pawnshop and Money Changer
  3. WPM Resources Development Corp.
  4. Omnivet Corporation
  5. Cameo Fishing Corporation
  6. Seven Eleven Fishing Corporation
  7. CVM Orchard and Eco Park
  8. CVM Land Inc.
  9. Kai-Anya Foods Inc.
  10. Info Alchemy Corporation
  11. We Select Inc.
  12. St. Joseph Fish Brokerage
  13. Crystal Cold Storage

---

### PAGE 7 — NEWS (`/news`)

- Single article layout: white container, box shadow, responsive width (80% desktop, 100% mobile)
- **Current article:** "ISO 9001:2015 Standard Recertification Success for CVM Finance and Credit Corporation – November 2023"
- Article sections:
  1. Introduction — overview of recertification achievement
  2. Background — ISO standards context, initial 2019 certification
  3. Recertification Process — audit methodology used
  4. Key Highlights (A–D):
     - A. Documentation Review
     - B. Management System Evaluation
     - C. Process Performance
     - D. Customer Satisfaction
  5. Results and Achievements
  6. Conclusion — commitment to excellence statement
- 3 embedded images (image1.jpg, image2.jpg, image3.jpg): bordered, shadow-styled, repositioned on mobile
- All content is static/hardcoded (no CMS)
- **Modern redesign:** News listing cards page + individual dynamic article pages driven by a CMS or database

---

### PAGE 8 — HOW TO LOAN (`/loan`)

All content is static. Some text is in Filipino (Tagalog).

#### Section 1: Yellow Header
- Yellow background with pattern image
- Title: "Paano mag-loan?" *(How to get a loan?)*
- Subtitle: "Mag loan na sa pinaka malapit na CVM Finance Branches!" *(Get a loan at the nearest CVM Finance branch!)*

#### Section 2: Branch Process — 9 Steps
Numbered step cards (auto-responsive grid):

| Step | Description (Tagalog) |
|---|---|
| 1 | Magtanong sa pinakamalapit na sangay *(Inquire at nearest branch)* |
| 2 | Pumili ng gustong produkto/serbisyo *(Choose preferred product/service)* |
| 3 | Kumpletuhin ang mga kinakailangan *(Complete requirements)* |
| 4 | Isumite ang mga kinakailangan sa sangay *(Submit requirements to branch)* |
| 5 | Maghintay ng schedule ng Credit Investigation *(Wait for CI schedule)* |
| 6 | Maghintay ng resulta ng pag-apruba/pagtanggi *(Wait for approval/rejection)* |
| 7 | Mag-apply ulit pagkatapos ng 3 buwan kung tinanggihan *(Reapply after 3 months if rejected)* |
| 8 | Kunin ang aprubadong loan *(Retrieve approved loan)* |
| 9 | I-renew ang loan pagkatapos ng unang termino *(Renew loan after first term)* |

Each card: large number badge + step icon + text description

#### Section 3: Online Process — 6 Steps

| Step | Description |
|---|---|
| 1 | Visit CVM Facebook page (clickable link → opens in new window) |
| 2 | Provide loan details for renewal or extension |
| 3 | Provide GCash/Bank account details for cash refund |
| 4 | Wait for branch message on schedule |
| 5 | Prepare required documents |
| 6 | Visit official website for additional information (clickable link) |

- **Modern redesign:** Animated step flow with connecting arrows/lines, progress indicator

---

### PAGE 9 — PAYMENT OPTION (`/payment-option`)

- Header text: "Choose a payment method"
- Sub-instruction: "(Click one of the option below)"
- 5 payment category sections separated by dividers:
  1. **E-Wallet** (GCash, PayMaya, etc.)
  2. **Non-bank Over the Counter** (7-Eleven, Bayad Center, etc.)
  3. **Online Bank Transfer** (BDO, BPI, etc.)
  4. **Online Bills Payment** (special: BDO id=26 shows instruction dialog before proceeding)
  5. **Installment**

Payment method cards:
- Logo image centered, rounded box, elevated shadow
- **Disabled state:** opacity 0.3, "Under Maintenance" text overlay
- Hover: zoom animation
- **On click:** navigates to `/payment-summary` with:
  - Query params: `id`, `type`, `pname` (+ existing params from payment form)
  - Location state: `pMethod`, `pChannel`

Data: `GET /api/paymentmethod`
Schema: `{ id, name, type, imgurl, pChannel, pMethod, order, isEnabled }`

---

### PAGE 10 — PAYMENT FORM (`/payment-form`)

- Centered card with blue header: "Payment Form"
- 6 form fields:

| Field | Type | Notes |
|---|---|---|
| First Name | Text | Pre-filled from query param `fname` |
| Last Name | Text | Pre-filled from query param `lname` |
| Email Address | Email | Can be skipped via "No Email Address" checkbox |
| Product | Autocomplete dropdown | Options from `GET /api/streamlineproduct` |
| Loan Number | Text | Typewriter placeholder cycles through format examples: SBL-10XXX00, LR-101XXX0 |
| Amount | Number (currency masked) | Must be > 0 |

- Validation: all fields required (email skippable); email format; amount > 0; errors shown as alert
- "Next" button → navigates to `/payment-option` passing all data as query params

---

### PAGE 11 — PAYMENT SUMMARY (`/payment-summary`)

- Centered card with blue header: "Payment Summary"
- Read-only summary display:

| Display Field | Data Source |
|---|---|
| Payment Type | Location state (e.g., "e-wallet", "Online Bank Transfer") |
| Payment Method Name | Query param `pname` |
| Full Name | Query params `fname` + `lname` combined |
| Product Name | Query param `product` |
| Loan Number | Query param `loanno` |
| Amount | Query param `amount` (formatted as PHP currency) |
| Total Amount | Same as Amount (with divider separator) |

- Full-width "PAY" button
- **On PAY click:**
  1. Shows full-screen Lottie please-wait animation overlay
  2. Calls `POST /api/payment` with all transaction data
  3. Routes by payment type:
     - **Wallet / Online Bank Transfer:** Opens external Paynamics payment URL in window
     - **OTC (Over the Counter):** Navigates to `/payment-instruction` with `pInstructions`, `pReference`, `expiryLimit`
     - **Error:** Shows ErrorDialog ("Reference amount not valid" message) with "Pay again" + "Close", or routes to `/payment-error`

---

### PAGE 12 — PAYMENT INSTRUCTION (`/payment-instruction`)

- White card, shadow, rounded corners
- Status header: "TRANSACTION PENDING"
- HTML payment instructions block (from `location.state.pInstructions`, rendered via `dangerouslySetInnerHTML`)
- CODE128 barcode generated from `location.state.pReference` via JsBarcode
- Reference number displayed as text below barcode
- Expiry text: "Payment slip valid until: [location.state.expiryLimit]"
- "Print" button → `window.print()`

---

### PAGE 13 — PAYMENT SUCCESSFUL (`/payment-successful`)

- Centered layout
- Lottie success animation (loops continuously)
- Heading: "Payment Successful"
- On component mount: calls `PUT /api/payment/:id` to update transaction status to "Success"
- Payment `id` taken from query param

---

### PAGE 14 — PAYMENT CANCEL (`/payment-cancel`)

- Centered layout
- Lottie cancel/canceled animation (loops)
- Message: "Your Transaction has been canceled."
- No interactions

---

### PAGE 15 — PAYMENT ERROR (`/payment-error`)

- Centered layout
- Lottie error animation
- Line 1: "Sorry, our third party for this transaction is currently unavailable or under maintenance."
- Line 2: "Please try again later."
- No interactions

---

### PAGE 16 — TERMS AND CONDITIONS (`/terms-and-condition`)

- Yellow header banner with pattern: Title "Terms and Condition"
- 3 static legal/consent paragraphs:

**Paragraph 1 — Consent to Data Collection:**
> "I confirm that I freely and voluntarily give consent to the collection and processing of my data, which may include personal information and/or sensitive information set out in this registration and application possessed by CVM Finance and Credit Corporation."

**Paragraph 2 — Personal Data Processing Consent:**
> "I also confirm that I have read the 'Loan Contract' and give my full consent to CVM Finance and Credit Corporation to collect, store, access and/or process any personal data I may provide herein, such as but not limited to my name, address, telephone number and e-mail address etc. I also acknowledge that the collection and processing of my personal data is necessary for such purpose."

**Paragraph 3 — Data Rights Acknowledgment (Data Privacy Act of 2012):**
> "I am aware of my right to be informed, to access, to object, to erasure or blocking, to damages, to file a complaint, to rectify and to data portability, and I understand that there are procedures, conditions and exceptions to be complied with in order to exercise or invoke such rights in accordance with Data Privacy act of 2012."

---

### PAGE 17 — NOT FOUND (`/not-found`)

- Centered container
- Lottie 404 error animation
- Heading: "404 not found"
- Subtitle: "Oops, Looks like this page is missing. If you still need help,"
- Button: "GO TO HOMEPAGE" → navigates to `/`

---

## 5. API Contract Summary

| Endpoint | Method | Used By | Notes |
|---|---|---|---|
| `/api/information` | GET | Header/Footer, Home carousel, Contact page | Multipurpose — filter by `type` field |
| `/api/product` | GET | Home (featured cards), Products page | Backend filters `isEnabled: true` |
| `/api/branch` | GET | Branches page | All branches |
| `/api/paymentmethod` | GET | Payment Option page | Ordered by `order` field |
| `/api/streamlineproduct` | GET | Payment Form dropdown | Simple name list |
| `/api/contactus` | POST | Contact form | Yup + reCAPTCHA validation; Nodemailer email |
| `/api/payment` | POST | Payment Summary | Paynamics integration; creates PaymentTransaction |
| `/api/payment/:id` | PUT | Payment Success page | Updates status to "Success" |

### Information Type Filter Reference
| `type` value | Used For |
|---|---|
| `"Contact No"` | Footer phone numbers, Contact page phone list |
| `"Operating Hours"` | Footer office hours |
| `"Social Media"` | Footer follow icons, Contact page social links |
| *(Carousel type)* | Home hero carousel images |

---

## 6. Data Models (Database Schema)

### Information
```
id: Int (PK)
type: VarChar(100)       — "Contact No", "Operating Hours", "Social Media"
name: VarChar(200)       — "Landline", "Facebook", "TikTok", etc.
url: Text (optional)     — phone number, social URL, or image URL
value: Text (optional)
createdAt / updatedAt: DateTime
```

### Branch
```
id: Int (PK)
name: VarChar(100)
location: VarChar(1000)
mobileNo: VarChar(20)
telNo: VarChar(30)
imagePath: Text
googleMapUrl: Text (optional)
faceBookUrl: Text (optional)
createdAt / updatedAt: DateTime
```

### Product
```
id: Int (PK)
name: VarChar(100)
description1: Text (optional)   — Loanable Amount
description2: Text (optional)   — Terms
description3: Text (optional)   — Interest Rate
extendedProperties: JSON (optional) — requirements/qualifications
imagePath: Text
isEnabled: Boolean
createdAt / updatedAt: DateTime
```

### PaymentMethod
```
id: Int (PK)
name: VarChar(100)
type: VarChar(100)              — payment category
imgurl: Text
pChannel: VarChar(100)          — Paynamics channel
pMethod: VarChar(100)           — Paynamics method
order: Int
isEnabled: Boolean
createdAt / updatedAt: DateTime
```

### PaymentTransaction
```
id: String CUID (PK)
payMentOptionId: Int
fName / lName: VarChar(100)
loanNo: VarChar(100)
loanProduct: VarChar(100)
amount: Decimal(10,2)
email: VarChar(100) (optional)
status: VarChar(100)            — null → "Pending" → "Success" / "Error"
paynamicsStatusCode: Int (optional)
paynamicsResponse: JSON (optional)
createdAt / updatedAt: DateTime
```

### ContactUs
```
id: String CUID (PK)
type: VarChar(100)
name: VarChar(200)
mobileNo: VarChar(11)
email: String
address: LongText
loanInquiry: LongText
message: LongText
age: Int
createdAt / updatedAt: DateTime
```

### StreamLineProduct
```
id: Int (PK)
name: VarChar(100)
description: Text (optional)
createdAt / updatedAt: DateTime
```

---

## 7. Payment Flow Diagram

```
/payment-form
     │
     ▼
/payment-option
     │
     ▼
/payment-summary ──── POST /api/payment ────┬── Wallet/Online Bank ──► External Paynamics URL
                                            │                              │
                                            │                         ┌───┴────────────┐
                                            │                         │ /payment-successful │
                                            │                         │ /payment-cancel     │
                                            │                         │ /payment-error      │
                                            │                         └────────────────┘
                                            │
                                            └── OTC ──► /payment-instruction (barcode + print)
                                            │
                                            └── Error ──► /payment-error
```

---

## 8. Disabled / Future Features (Currently Commented Out)

| Feature | Route | Notes |
|---|---|---|
| Loan Application Form | `/loan-application-form` | Complex multi-step form: civil status, business info, savings accounts |
| Online Payment Page | `/online-payment` | Old payment entry component |
| "Pay Now" AppBar button | — | Was a shortcut to `/payment-form` |
| "Pay Now" mobile FAB | — | Yellow floating action button (bottom-right on mobile) |
| "Apply Loan" nav button | — | Linked to external VM signup portal |
| Twitter / X social link | — | Excluded from Follow Us section |

---

## 9. External Integrations

| Integration | Purpose |
|---|---|
| **Paynamics** | Payment gateway — handles all online transactions; returns payment URL or OTC instructions |
| **Google reCAPTCHA v2** | Protects contact form from bots |
| **Nodemailer** | Sends contact inquiry emails to internal customer service email |
| **Facebook Messenger Chat** | Embedded customer support chat widget |
| **Azure Blob Storage** | CDN for all images (logos, product images, branch images) |

---

## 10. Non-Functional Requirements

| Requirement | Detail |
|---|---|
| Responsiveness | Mobile-first; key breakpoints at 600px (sm) and 1024px (md/lg) |
| Loading States | Skeleton loaders for all API-driven sections |
| Accessibility | ARIA labels on icon buttons, tooltips on social icons, semantic HTML |
| SEO | Meta tags per page (Next.js Metadata API) |
| Performance | Image optimization (Next.js Image), route-level code splitting |
| Security | reCAPTCHA on contact form; input validation on both client and server |
| Print Support | Payment instruction page has print-friendly CSS styles |
