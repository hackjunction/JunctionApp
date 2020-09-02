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

controller.getFullMentors = () => {
  return Mentor.find();
};

module.exports = controller;
