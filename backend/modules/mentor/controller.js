const Mentor = require('./model');

const controller = {};
const { NotFoundError } = require('../../common/errors/errors');

controller.createMentor = () => {
  const requestBody = req.body;

  const mentor = new Mentor({
    name: requestBody.name,
    email: requestBody.email,
    phoneNumber: requestBody.phone,
    link: requestBody.link,
  });
    
  return mentor.save();
};

controller.getFullMentors = () => {
  return Mentors.find();
};

module.exports = controller;
