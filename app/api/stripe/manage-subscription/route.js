// app/api/stripe/manage-subscription/route.js
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const host = process.env.NEXT_PUBLIC_URL;

export async function POST(req) {
  const user = await currentUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const email = user.emailAddresses[0].emailAddress;
  const { planId } = await req.json();

  try {
    const customers = await stripe.customers.list({
      email: email,
    });

    let customer;
    if (customers.data.length === 0) {
      // Si no se encuentra el cliente, creamos uno nuevo
      customer = await stripe.customers.create({
        email: email,
      });
    } else {
      customer = customers.data[0];
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: "active",
      expand: ["data.items"],
    });

    let session;
    if (subscriptions.data.length === 0) {
      // Si no se encuentra ninguna suscripción, creamos una nueva
      session = await stripe.checkout.sessions.create({
        customer: customer.id,
        line_items: [
          {
            price: planId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${host}/plan`,
        cancel_url: `${host}/plan`,
      });
    } else {
      // Si se encuentra una suscripción, redirigimos al portal de facturación
      session = await stripe.billingPortal.sessions.create({
        customer: customer.id,
        return_url: `${host}/success`,
      });
    }

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error("Error managing subscription:", err);
    return new NextResponse(err.message, { status: 500 });
  }
}
