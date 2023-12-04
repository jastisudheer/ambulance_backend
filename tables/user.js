const connection = require('../connection');

const user = `
   CREATE TABLE IF NOT EXISTS user(
    user_id int NOT NULL AUTO_INCREMENT,
    name varchar(20) NOT NULL,
    email_id varchar(50) NOT NULL,
    profession varchar(3) NOT NULL,
    password varchar(20) NOT NULL,
    PRIMARY KEY(user_id ),
    UNIQUE KEY email_id (email_id )
)`;

connection.query(user, (err) => {
    if (err) {
        console.error('Error creating user table:', err);
    } else {
        console.log('user table created successfully');
    }
});

module.exports = user;