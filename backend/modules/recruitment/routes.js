const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const RecruitmentController = require("./controller");
const { Auth } = require("@hackjunction/shared");

const { hasToken } = require("../../common/middleware/token");
const { hasPermission } = require("../../common/middleware/permissions");

const queryUsers = asyncHandler(async (req, res) => {
  const users = await RecruitmentController.queryProfiles(req.body);
  return res.status(200).json(users);
});
const getUserProfileRecruitment = asyncHandler(async (req, res) => {
  const userProfile = await RecruitmentController.getRecruitmentProfile(
    req.params.id
  );
  return res.status(200).json(userProfile);
});
const saveRecruiterAction = asyncHandler(async (req, res) => {
  try {
    await RecruitmentController.saveRecruiterAction(req.body);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(200).json({ success: false, error: error.message });
  }
});

router.get(
  "/search",
   hasToken,
  hasPermission(Auth.Permissions.ACCESS_RECRUITMENT),
  queryUsers
);
router
  .route("/profile/:id")
  .get(
    hasToken,
    hasPermission(Auth.Permissions.ACCESS_RECRUITMENT),
    getUserProfileRecruitment
  );
router
  .route("/action")
  .get(
    hasToken,
    hasPermission(Auth.Permissions.ACCESS_RECRUITMENT),
    saveRecruiterAction
  );

module.exports = router;
