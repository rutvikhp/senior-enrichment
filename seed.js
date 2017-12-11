const {db} = require('./server/db/models');
const Campuses = require('./server/db/models/Campuses');
const Students = require('./server/db/models/Students');


const campuses = [{
  name: 'Mars',
  description: 'This is Mars'
}, {
  name: 'Saturn',
  description: 'This is Saturn'
}, {
  name: 'Terra',
  description: 'This is Terra'
}, {
  name: 'Luna',
  description: 'This is Luna'
}];


const students = [
  {
    firstName: 'Elliott',
    lastName: 'Estheta',
    email: 'elliot@gmial.com',
    gpa: 3.5,
    campusId: 1
  },
  {
    firstName: 'Rutvik',
    lastName: 'Patel',
    email: 'rutvikhp@gmail.com',
    gpa: 4,
    campusId: 1
  },
  {
    firstName: 'Henry',
    lastName: 'karsaliya',
    email: 'henry@viacom.com',
    gpa: 2.4,
    campusId: 1
  },
  {
    firstName: 'Marcy',
    lastName: 'Pansuriya',
    email: 'mercy@yahoo.com',
    gpa: 3.33,
    campusId: 2
  },
  {
    firstName: 'Milton',
    lastName: 'Vasani',
    email: 'milton1232@hotmail.com',
    gpa: 3.59,
    campusId: 2
  },
  {
    firstName: 'Harry',
    lastName: 'Potter',
    email: 'harrypotter@hogwards.com',
    gpa: 2.45,
    campusId: 3
  },
  {
    firstName: 'Sweetu',
    lastName: 'Patel',
    email: 'sweetupatel@gmail.com',
    gpa: 3.75,
    campusId: 3
  },
  {
    firstName: 'Harnish',
    lastName: 'Shah',
    email: 'harnishshah@gmail.com',
    gpa: 3.00,
    campusId: 4
  },
  {
    firstName: 'Keya',
    lastName: 'Pholes',
    email: 'keya@foles.com',
    gpa: 3.94,
    campusId: 4
  }
];

const seed = () =>
  Promise.all(campuses.map(campus =>
    Campuses.create(campus))
  )
  .then(() =>
  Promise.all(students.map(student =>
    Students.create(student))
  )
);

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
