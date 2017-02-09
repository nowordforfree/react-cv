const express = require('express');
const db      = require('../models');
const router  = express.Router();

router.get('/', (req, res) => {
  db
    .Cv
    .findAll({
      include: [
        { model: db.Project, as: 'projects' },
        { model: db.Experience, as: 'experiences' }
      ]
    })
    .then((cvs) => {
      res.json({ data: cvs });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get('/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({
      error: 'Cv ID is required'
    });
  }
  db
    .Cv
    .findById(req.params.id, {
      include: [
        { model: db.Project, as: 'projects' },
        { model: db.Experience, as: 'experiences' }
      ]
    })
    .then((cv) => {
      res.json({ data: cv });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});

router.post('/', (req, res, next) => {
  db
    .sequelize
    .transaction((t) => {
      return db.Cv.create(req.body, {
        include: [
          { model: db.Project, as: 'projects' },
          { model: db.Experience, as: 'experiences' }
        ],
        transaction: t
      });
    })
    .then((cv) => {
      res.json({ data: cv });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.put('/:id', (req, res) => {
  db
    .Cv
    .findById(req.params.id, {
      include: [
        { model: db.Project, as: 'projects' },
        { model: db.Experience, as: 'experiences' }
      ]
    })
    .then((cv) => {
      if (!cv) {
        return res.status(400).json({
          error: `Cv with ID ${req.params.id} was not found`
        });
      }
      db
        .sequelize
        .transaction((t) => {
          return cv.update(req.body, {
            transaction: t
          })
          .then((cv) => {
            let promises = [];
            if (req.body.projects) {
              req.body.projects.forEach(project => {
                if (!project.CvId) {
                  Object.assign(project, { CvId: cv.get('id') });
                }
                promises.push(db.Project.upsert(project, {
                  transaction: t
                }));
              });
            }
            if (req.body.experiences) {
              req.body.experiences.forEach(experience => {
                if (!experience.CvId) {
                  Object.assign(experience, { CvId: cv.get('id') });
                }
                promises.push(db.Experience.upsert(experience, {
                  transaction: t
                }));
              })
            }
            return Promise.all(promises);
          })
          .then(() => cv);
        })
        .then(cv => res.json({ data: cv }))
        .catch(err => res.status(500).json({ error: err }));
    })
});

router.delete('/:id', (req, res) => {
  db
    .Cv
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then(arg => {
      res.json({ data: arg });
    })
    .catch(err => {
      res.json({ error: err });
    });
});

module.exports = router;