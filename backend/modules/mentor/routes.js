const express = require('express');

const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Auth } = require('@hackjunction/shared');
const MentorsController = require('./controller');
const EventController = require('../event/controller');

const { hasToken } = require('../../common/middleware/token');
const { hasRole, hasPermission } = require('../../common/middleware/permissions');
const { isEventOrganiser } = require('../../common/middleware/events');

const getFullMentors = asyncHandler(async (req, res) => {
  const Mentors = await MentorsController.getFullMentors();
  return res.status(200).json(Mentors);
});

// const getHackerpack = asyncHandler(async (req, res) => {
//   const Hackerpack = await HackerpackController.getHackerpackBySlug(
//     req.params.slug,
//   );
//   return res.status(200).json(Hackerpack);
// });

// const deleteHackerpack = asyncHandler(async (req, res) => {
//   const Hackerpack = await HackerpackController.deleteHackerpack(
//     req.params.slug,
//   );
//   return res.status(200).json(Hackerpack);
// });

// TODO implement event specific Hackerpackaa
/*
const getHackerpackByEvent = asyncHandler(async (req, res) => {
    const event = await EventController.getEventMembers(req.params.slug)
    const Hackerpacks = await HackerpackController.getHackerpackByEvent(event)
    return res.status(200).json(Hackerpacks)
})
*/

const createMentor = asyncHandler(async (req, res) => {
  const mentor = await MentorsController.createMentor(req.body);
  return res.status(201).json(mentor);
});

const getMentorsBySlug = asyncHandler(async (req, res) => {
    console.log('Req Params', req.params);
    
    const Mentor = await MentorsController.getMentorsBySlug(
    req.params.slug,
  );
  return res.status(200).json(Mentor);
});

const createMentorBySlug = asyncHandler(async (req, res) => {
  const Mentor = await MentorsController.createMentorBySlug(req.body, req.params.slug);
  return res.status(201).json(Mentor);
});



// const updateHackerpack = asyncHandler(async (req, res) => {
//   const updatedHackerpack = await HackerpackController.updateHackerpack(
//     req.params.slug,
//     req.body,
//   );
//   return res.status(200).json(updatedHackerpack);
// });

router
  .route('/')
  .get(getFullMentors)
  .post(createMentor);
router
  .route('/:slug')
    .get(getMentorsBySlug)
  .post(createMentorBySlug)
//   .delete(hasToken, deleteOrganization)
//   .patch(hasToken, hasRole(Auth.Roles.SUPER_ADMIN), updateOrganization);
// router
//   .route('/:slug')
//   .get(getHackerpack)
//   .delete(hasToken, deleteHackerpack)
//   .patch(hasToken, hasPermission(Auth.Permissions.MANAGE_EVENT),
//         isEventOrganiser, updateHackerpack);
/*
router.route('/event/:slug').get(getHackerpackByEvent)
*/
module.exports = router;
