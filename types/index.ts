export interface Information {
  id: number;
  type: string;
  name: string;
  url?: string;
  value?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Branch {
  id: number;
  name: string;
  location: string;
  mobileNo: string;
  telNo: string;
  imagePath: string;
  googleMapUrl?: string;
  faceBookUrl?: string;
}

export interface Product {
  id: number;
  name: string;
  description1?: string;
  description2?: string;
  description3?: string;
  extendedProperties?: Record<string, unknown>;
  imagePath: string;
  isEnabled: boolean;
}

export interface PaymentMethod {
  id: number;
  name: string;
  type: string;
  imgurl: string;
  pChannel: string;
  pMethod: string;
  order: number;
  isEnabled: boolean;
}

export interface StreamlineProduct {
  id: number;
  name: string;
  description?: string;
}

export interface ContactFormData {
  type: string;
  name: string;
  address: string;
  age: number;
  mobileNo: string;
  email: string;
  loanInquiry: string;
  message: string;
  agreeToTerms: boolean;
  recaptchaToken: string;
}

export interface PaymentFormData {
  firstName: string;
  lastName: string;
  email: string;
  product: string;
  loanNumber: string;
  amount: number;
  noEmail: boolean;
}
