import { redirect } from "next/navigation";

export const metadata = {
  title: "GoExports Payment | Razorpay Secure Checkout",
  description: "Secure online payment portal for GoExports subscriptions, memberships, and trade services via Razorpay.",
};

export default function PayPage() {
  redirect("https://pages.razorpay.com/goexports");
}
