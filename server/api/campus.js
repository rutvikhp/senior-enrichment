const router = require('express').Router();
const {Students, Campuses} = require('../db/models');



router.get('/:id', (req, res, next) => {
  Campuses.findOne({
    where: {
      id: req.params.id
    },
    include: [{ all: true }]
  })
  .then(campus => {
    res.json(campus)
  })
  .catch(next)
});

router.get('/', (req, res, next) => {
  Campuses.findAll()
  .then(campuses => res.json(campuses))
  .catch(next)
});

router.post('/', (req, res, next) => {
  Campuses.create(req.body)
  .then(campus => res.json(campus.toJSON()))
  .catch(next)
});

router.delete('/:id', (req, res, next) => {
  Campuses.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => res.status(204).end())
  .catch(next)
})

router.put('/:id', (req, res, next) => {
  Campuses.update({
    name: req.body.name,
    description: req.body.description,
  },{
    where: {
      id: req.params.id,
    },
    returning: true
  })
  .spread((noOfUpdatedRows,campus) => res.json(campus))
})
module.exports = router;
