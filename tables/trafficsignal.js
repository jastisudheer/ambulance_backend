const connection = require('../connection');

const TrafficSignal = `
   CREATE TABLE IF NOT EXISTS trafficsignal(
    sgnal_id int NOT NULL AUTO_INCREMENT,
    f_rom varchar(255) NOT NULL,
    t_o varchar(255) NOT NULL, 
    location varchar(255) NOT NULL,
    name varchar(60) NOT NULL,
    s_s_status int NOT NULL,
    discord_name varchar(100) NOT NULL,
    PRIMARY KEY(sgnal_id )
)`;

connection.query(TrafficSignal, (err) => {
    if (err) {
        console.error('Error creating trafficsignal table:', err);
    } else {
        console.log('trafficsignal table created successfully');
    }
});

module.exports = TrafficSignal;