const Mentor = require('./model');
const Slot = require('./model')

const controller = {};
const { NotFoundError } = require('../../common/errors/errors');

controller.createMentor = (
    name,
    email,
    phoneNumber,
    slots,
    createdAt
) => {
  const mentor = new Mentor({
      name,
      email,
      phoneNumber,
      slots,
      createAt
  });

  return mentor.save();
};



controller.getFullMentors = () => {
    return Mentors.find()
}





module.exports = controller;
