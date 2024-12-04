import Stripe from "stripe";
import config from "../../config";

export const initiatePayment = async (amount: number) => {
  const stripe = new Stripe(config.stripe_secret as string);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "usd",
    payment_method_types: ["card"],
  });

  const clientSecret = paymentIntent.client_secret;

  return { data: clientSecret };
};
