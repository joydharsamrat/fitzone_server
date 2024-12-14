import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const handleNewsletterSubscription = catchAsync(async (req, res) => {
  const result = await req.body.amount;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subscription successful",
    data: result,
  });
});

export const newsletterControllers = {
  handleNewsletterSubscription,
};
