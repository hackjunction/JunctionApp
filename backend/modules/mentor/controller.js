const Mentor = require('./model');

const controller = {};
const { NotFoundError } = require('../../common/errors/errors');

controller.createMentor = (req) => {
  const requestBody = req;

  const mentor = new Mentor({
    name: requestBody.name,
    email: requestBody.email,
    phoneNumber: requestBody.phoneNumber,
    link: requestBody.link,
    createdAd: new Date(),
  });

  return mentor.save();
};

controller.createMentorBySlug = (req) => {
  const requestBody = req;

  const mentor = new Mentor({
    name: requestBody.name,
    email: requestBody.email,
    phoneNumber: requestBody.phoneNumber,
    link: requestBody.link,
      createdAd: new Date(),
    slug: requestBody.slug
  });

  return mentor.save();
};

controller.getMentorsBySlug = (slug) => {
    console.log('Slug in controllers', slug)
  return Mentor.find({ slug });
};



controller.getFullMentors = () => {
  return Mentor.find();
};

module.exports = controller;
