import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { newsLetterServices } from "./newsletter.service";

const handleNewsletterSubscription = catchAsync(async (req, res) => {
  const result = await newsLetterServices.subscribeToNewsletter(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subscription successful",
    data: result,
  });
});

const handleGetSubscribers = catchAsync(async (req, res) => {
  const result = await newsLetterServices.getSubscribers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subscribers retrieved successfully",
    data: result,
  });
});

export const newsletterControllers = {
  handleNewsletterSubscription,
  handleGetSubscribers,
};
