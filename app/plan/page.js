"use client";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@nextui-org/button";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Chip } from "@nextui-org/chip";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useTheme } from "next-themes";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const plans = [
  {
    id: "price_1PfUlABhv3eVXfrJInBE8lQH",
    name: "Free",
    features: [
      { text: "3 sesiones / mes", available: true },
      { text: "7500 velas por sesión", available: true },
      { text: "20+ símbolos Forex", available: true },
      {
        text: "Multiples temporalidades (Solo mayores a la temporalidad de la sesion)",
        available: false,
      },
      { text: "No trading realista", available: false },
    ],
    price: "$0",
  },
  {
    id: "price_1PfUlQBhv3eVXfrJ7nk4IYMZ",
    name: "Hobby",
    features: [
      { text: "10 sesiones / mes", available: true },
      { text: "30000 velas por sesión", available: true },
      { text: "20+ símbolos Forex", available: true },
      {
        text: "Multiples temporalidades (Solo mayores a la temporalidad de la sesion)",
        available: false,
      },
      { text: "No trading realista", available: false },
    ],
    price: "$7.99",
  },
  {
    id: "price_1PfUlbBhv3eVXfrJulV48Mtb",
    name: "Pro",
    features: [
      { text: "Sesiones básicas ilimitadas", available: true },
      { text: "100000 velas por sesión", available: true },
      { text: "20+ símbolos Forex", available: true },
      {
        text: "Multiples temporalidades (Solo mayores a la temporalidad de la sesion)",
        available: true,
      },
      {
        text: "Trading realista (actualizaciones cada segundo)",
        available: true,
      },
      { text: "15 sesiones por mes", available: true, realistic: true },
      { text: "1 minuto: 50000 velas", available: true, realistic: true },
      { text: "5 minutos: 1000 velas", available: true, realistic: true },
      { text: "15 minutos: 4000 velas", available: true, realistic: true },
      { text: "1 hora: 1000 velas", available: true, realistic: true },
    ],
    price: "$15.99",
  },
];

export default function Plans() {
  const { theme } = useTheme();
  const { isLoaded, userId } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoaded || !userId) {
      setLoading(false);
      return;
    }
    const fetchSubscription = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/stripe/get-user-subscription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const subscription = await res.json();
        setSubscription(subscription);
      } catch (error) {
        console.error("Error fetching subscription:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [isLoaded, userId]);

  const currentPlanId =
    subscription && subscription.items && subscription.items.data
      ? subscription.items.data[0].price.id
      : plans[0].id;

  const handleSubscribe = async (planId) => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/manage-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const response = await res.json();
      if (response.url) {
        window.location.href = response.url;
      } else {
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
          sessionId: response.sessionId,
        });

        if (error) {
          console.error("Error redirecting to checkout", error);
        }
      }
    } catch (error) {
      console.error("Error managing subscription:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-full w-full flex flex-col items-center justify-center p-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Pricing Plans</h1>
        <h2 className="text-lg text-muted-foreground">
          Choose the plan that fits your needs and start your trading journey
          with us.
        </h2>
      </div>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 ">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            isHoverable
            variant="bordered"
            className=" p-6 rounded-lg  bg-opacity-30 flex items-center justify-between flex-col "
          >
            <CardHeader className="flex items-center justify-between gap-2">
              <div className="flex items-center flex-row">
                <h2 className="text-2xl font-semibold">{plan.name}</h2>
                {plan.id === currentPlanId && (
                  <Chip color="success" size="md" className="ml-2">
                    Current
                  </Chip>
                )}
              </div>
              <span className="text-4xl text-bold font-bold">{plan.price}</span>
              <span className="text-xl text-muted-foreground">per month</span>
            </CardHeader>
            <CardContent className="p-4h  flex h-full justify-start flex-col">
              <ul className="list-none pl-0">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className={`mb-2 flex items-center ${
                      feature.realistic ? "pl-8" : ""
                    }`}
                  >
                    {feature.available ? (
                      <CheckIcon className="h-5 w-5 mr-2" />
                    ) : (
                      <XMarkIcon className="h-5 w-5 mr-2" />
                    )}
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            {plan.id !== currentPlanId && (
              <CardFooter className="flex justify-center">
                <Button
                  size="lg"
                  color="primary"
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {`Choose ${plan.name}`}
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
