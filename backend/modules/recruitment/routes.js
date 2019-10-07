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

module.exports = router;
