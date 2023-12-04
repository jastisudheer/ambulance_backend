const db = require('../connection')
//const discordWebhookUrl2 = process.env.DISCORD_WEBHOOK_URL_2;

const getHospital = async(req, res) => {
    const sql = 'SELECT hospital_name, accept_patient FROM hospital';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching hospitals');
            return;
        }

        const hospitals = results.map(hospital => ({
            hospital_name: hospital.hospital_name,
            accept_patient: hospital.accept_patient === 1 ? 'Yes' : 'No'
        }));

        res.status(200).json(hospitals);
    });
};

const postHospital = async(req, res) => {
    const hospitalNameGet = req.body.hospital_name_hp;
    const apAcceptPatient = req.body.accept_patient;
    const sqlUpdate = 'UPDATE hospital SET accept_patient = ? WHERE hospital_name = ?';

    db.query(sqlUpdate, [apAcceptPatient, hospitalNameGet], (err, result) => {
        if (err) {
            res.status(500).send('Error updating hospital record');
            return;
        }

        const sqlSelect = 'SELECT hospital_name, accept_patient FROM hospital WHERE hospital_name = ?';
        db.query(sqlSelect, [hospitalNameGet], (err, results) => {
            if (err) {
                res.status(500).send('Error fetching updated hospital record');
                return;
            }

            const updatedHospitals = results.map(hospital => ({
                hospital_name: hospital.hospital_name,
                accept_patient: hospital.accept_patient === 1 ? 'Yes' : 'No'
            }));

            res.status(200).json({
                updatedHospitals,
                message: 'Changes Successfully Made'
            });

            //sendDiscordNotification(discordWebhookUrl2, "A hospital record has been updated.");
        });
    });
};

// Assuming this function is defined elsewhere in your project
// const sendDiscordNotification = (webhookUrl, message) => {
//     // Implementation to send a notification to Discord
// };

module.exports = { getHospital, postHospital };