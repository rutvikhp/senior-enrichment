const router = require('express').Router();
const {Students,Campuses} = require('../db/models');

router.get('/:id', (req, res, next) => {
  Students.findOne({
    where: {
      id: req.params.id
    },
    include: [{ all: true }]
  })
  .then(student => res.json(student))
  .catch(next)
});

router.get('/', (req, res, next) => {
  Students.findAll({include: [{all: true}]})
  .then(students => {
    //Somehow returned array is coming sorted by campusId.
    //Help me with that problem
    students.sort(function (a, b) {
      return a.dataValues.id - b.dataValues.id;
    });
    res.json(students)
  })
  .catch(next)
});


router.post('/', (req, res, next) => {
  let {firstName, lastName, email, gpa } = req.body.student
  Campuses.findById(req.body.student.campusId)
  .then(campus =>{
    const student = Students.build({firstName,lastName,email,gpa})
    student.setCampus(campus,{ save: false })
    return student.save()
      .then(student => {
        student = student.toJSON();
        student.campus = campus;
        return student;
      })
  })
  .then(student => {
    res.json(student)
  })
  .catch(next)
});

router.delete('/:id', (req, res, next) => {
  Students.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => res.status(204).end())
  .catch(next);
});

router.put('/:id', (req, res, next) => {
  Students.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    gpa: req.body.gpa,
    campusId: req.body.campusId
  },{
    where: {
      id: req.params.id,
    },
    returning: true
  })
  .spread((noOfUpdatedRows,student) => {
    Campuses.findById(req.body.campusId)
    .then(campus => {
      student[0].setCampus(campus)
      student[0].campus = campus;
      return student
    })
    .then(student => res.json(student))
  })

  .catch(next)
})

module.exports = router;
