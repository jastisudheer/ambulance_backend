const connection = require('../connection');

const HospitalTable = `
   CREATE TABLE IF NOT EXISTS hospital(
    h_id int NOT NULL AUTO_INCREMENT,
    h_discord_name varchar(100) NOT NULL,
    hospital_name   varchar(100) NOT NULL,
    accept_patient int NOT NULL,
    location varchar(200) NOT NULL,
    PRIMARY KEY(h_id)
)`;

connection.query(HospitalTable, (err) => {
    if (err) {
        console.error('Error creating Hospital table:', err);
    } else {
        console.log('Hospital table created successfully');
    }
});

module.exports = HospitalTable;