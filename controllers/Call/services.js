const CallRequest = require("../../models/CallRequest");
const User = require("../../models/User");
const { GENDERS, GENDERSKEY } = require("../../utils/AppConstants");

module.exports.callCreateInitiate = async (req) => {
  const userDetails = await User.findById(req.userId, { credits: 1 });
  if (!userDetails || userDetails.credits < 1) {
    throw new Error("Your credits are over.");
  }
  const searchForExistingRequest = await CallRequest.find(
    {
      callToGender: req.gender,
      isResponded: false,
    },
    { callBy: 1, callByGender: 1 }
  ).sort({ createdAt: -1 });
  if (searchForExistingRequest?.length) {
    searchForExistingRequest[0].isAnswered = true;
    searchForExistingRequest[0].isResponded = true;
    const promiseRequest = [];
    if (req.gender != GENDERSKEY.Female) {
      userDetails.credits = userDetails.credits - 1;
      promiseRequest.push(userDetails.save());
    }
    promiseRequest.push(searchForExistingRequest[0].save());
    await Promise.all(promiseRequest);
    return { message: "Call Initiated" };
  }
  await CallRequest.create({
    callBy: req.userId,
    callByGender: req.gender,
    callToGender: req.body.callToGender,
    isResponded: false,
    createdAt: new Date(),
  });
  return { message: "Calling ...." };
};
