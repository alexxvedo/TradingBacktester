// app/api/stripe/get-user-subscription/route.js
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const user = await currentUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const email = user.emailAddresses[0].emailAddress;

  try {
    const customers = await stripe.customers.list({
      email: email,
    });

    if (customers.data.length === 0) {
      return new NextResponse("Customer not found", { status: 404 });
    }

    const customer = customers.data[0];

    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: "all",
      expand: ["data.default_payment_method", "data.items"],
    });

    if (subscriptions.data.length === 0) {
      return new NextResponse("No subscriptions found", { status: 404 });
    }

    const userSubscription = subscriptions.data[0];

    return NextResponse.json(userSubscription);
  } catch (err) {
    console.error("Error fetching user subscription:", err);
    return new NextResponse(err.message, { status: 500 });
  }
}
