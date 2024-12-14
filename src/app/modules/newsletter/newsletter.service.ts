import httpStatus from "http-status";
import AppError from "../../error/appError";
import { TNewsLetter } from "./newsletter.interface";
import { Newsletter } from "./newsletter.model";
import { newsletterEmailTemplate } from "../../templates/newsLetterEmailTemplate";
import { sendEmail } from "../../utils/sendEmail";
import config from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cancellationEmailTemplate } from "../../templates/newsletterCancelEmailTemplate";

const subscribeToNewsletter = async (payload: TNewsLetter) => {
  const existingSubscriber = await Newsletter.findOne({ email: payload.email });

  if (existingSubscriber) {
    if (existingSubscriber.status === "active") {
      throw new AppError(httpStatus.CONFLICT, "Email already subscribed");
    }

    // If status is 'canceled', send the reactivation email first
    const subject = "FitZone: Welcome back to our Newsletter";
    const token = jwt.sign(
      { email: payload.email },
      config.jwt_access_token_secret as string
    );

    const unsubscribeUrl = `${config.newsletter_unsubscribe_url}/?token=${token}`;
    const year = new Date().getFullYear();
    const template = newsletterEmailTemplate(year, unsubscribeUrl);

    const result = await sendEmail(template, payload.email, subject);
    if (!result.success) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Subscription reactivation email failed. Please try again."
      );
    }

    // After successful email, reactivate the subscription
    existingSubscriber.status = "active";
    await existingSubscriber.save();

    return result; // Return the result directly after reactivation
  }

  // If the user doesn't exist, subscribe them as a new user
  const subject = "FitZone: Welcome to our Newsletter";
  const token = jwt.sign(
    { email: payload.email },
    config.jwt_access_token_secret as string
  );

  const unsubscribeUrl = `${config.newsletter_unsubscribe_url}/?token=${token}`;
  const year = new Date().getFullYear();
  const template = newsletterEmailTemplate(year, unsubscribeUrl);

  const result = await sendEmail(template, payload.email, subject);
  if (result.success) {
    await Newsletter.create(payload);
    return result; // Return the result directly
  } else {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Subscription failed. Please try again."
    );
  }
};

const getSubscribers = async () => {
  const result = await Newsletter.find();
  return result;
};

const unsubscribe = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_access_token_secret as string
  ) as JwtPayload;
  const email = decoded?.email;

  const subscriber = await Newsletter.findOne({ email, status: "active" });
  if (!subscriber) {
    throw new AppError(httpStatus.NOT_FOUND, "Subscriber not found");
  }

  subscriber.status = "canceled";
  const result = await subscriber.save();
  return result;
};

const cancelSubscriptionByAdmin = async (email: string) => {
  const result = await Newsletter.findOneAndUpdate(
    { email },
    {
      $set: { status: "canceled" },
    }
  );

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Subscription not found or already canceled"
    );
  }

  const subject = "FitZone: Your subscription has been canceled";
  const year = new Date().getFullYear();
  const template = cancellationEmailTemplate(year);

  const emailResult = await sendEmail(template, result.email, subject);
  if (!emailResult.success) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to send cancellation email. Please try again."
    );
  }

  return result;
};

export const newsLetterServices = {
  subscribeToNewsletter,
  getSubscribers,
  unsubscribe,
  cancelSubscriptionByAdmin,
};
