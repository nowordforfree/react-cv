const express = require('express');
const db      = require('../models');
const router  = express.Router();

function getMissingIds(source, target) {
  const existing = target.filter(obj => obj.id && obj.CvId);
  const result = source.map((a) => {
    if (existing.some(b => a.id === b.id)) {
      return;
    } else {
      return a.id;
    }
  }).filter(obj => obj);
  return result;
}

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

router.post('/', (req, res) => {
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
          let result;
          const experiencesToDelete = getMissingIds(
            cv.experiences, (req.body.experiences || [])
          );
          if (experiencesToDelete.length) {
            result = db.Experience.destroy({
              where: { id: experiencesToDelete },
              transaction: t
            });
          } else {
            result = Promise.resolve();
          }
          return result.then(() => {
            const projectsToDelete = getMissingIds(
              cv.projects,
              (req.body.projects || [])
            );
            if (projectsToDelete.length) {
              return db.Project.destroy({
                where: { id: projectsToDelete },
                transaction: t
              });
            } else {
              return Promise.resolve();
            }
          })
          .then(() => {
            let projectsToAdd = [];
            if (req.body.projects &&
                req.body.projects.length) {
              req.body.projects.forEach(project => {
                if (!project.CvId) {
                  Object.assign(project, { CvId: cv.get('id') });
                }
                projectsToAdd.push(db.Project.upsert(project, {
                  transaction: t
                }));
              });
            }
            return Promise.all(projectsToAdd);
          })
          .then(() => {
            let experiencesToAdd = [];
            if (req.body.experiences &&
                req.body.experiences.length) {
              req.body.experiences.forEach(experience => {
                if (!experience.CvId) {
                  Object.assign(experience, { CvId: cv.get('id') });
                }
                experiencesToAdd.push(db.Experience.upsert(experience, {
                  transaction: t
                }));
              })
            }
            return Promise.all(experiencesToAdd);
          })
          .then(() => cv.update(req.body, { transaction: t }))
          .then(cv => cv)
        })
        .then(cv => res.json({ data: cv }))
        .catch(err => res.status(500).json({ error: err }));
    })
});

router.delete('/:id?', (req, res) => {
  if (!req.params.id && !req.body.length) {
    return res.status(400).json({ error: 'CV id(s) are required for DELETE' });
  }
  db
    .Cv
    .destroy({
      where: {
        id: (req.params.id || req.body)
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