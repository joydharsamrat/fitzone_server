import httpStatus from "http-status";
import AppError from "../../error/appError";
import { TNewsLetter } from "./newsletter.interface";
import { Newsletter } from "./newsletter.model";
import { newsletterEmailTemplate } from "../../templates/newsLetterEmailTemplate";
import { sendEmail } from "../../utils/sendEmail";
import bcrypt from "bcrypt";
import config from "../../config";

const subscribeToNewsletter = async (payload: TNewsLetter) => {
  const existingSubscriber = await Newsletter.findOne({ email: payload.email });
  if (existingSubscriber) {
    throw new AppError(httpStatus.CONFLICT, "Email already subscribed");
  }

  const subject = "FitZone: Welcome to our Newsletter";

  const hashedEmail = await bcrypt.hash(
    payload.email,
    Number(config.bcrypt_salts)
  );

  const unsubscribeUrl = `${config.newsletter_unsubscribe_url}/?token=${hashedEmail}`;

  const year = new Date().getFullYear();
  const template = newsletterEmailTemplate(year, unsubscribeUrl);

  // Attempt to send the email
  const result = await sendEmail(template, payload.email, subject);
  if (result.success) {
    // Save to database if email is sent successfully
    await Newsletter.create(payload);
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

export const newsLetterServices = {
  subscribeToNewsletter,
  getSubscribers,
};
