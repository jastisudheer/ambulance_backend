const db = require('../connection');
const axios = require('axios');

// Directly embedded Discord webhook URLs
const discordWebhookUrl1 = 'https://discord.com/api/webhooks/1170027166919053322/RB3cjaTmHQzXgxG3C3udSYUxT2c_DvTrcg8tOgwPZi09D9oZgyBb8wTX_1zQlK-jx1Hb';
const discordWebhookUrl2 = 'https://discordapp.com/api/webhooks/1170026638793252904/9Qjr-mkukJffWDBtpuCuyaSF4Alu9I0fQtUJ1TbtnYqbhwTiWenN7eaGVfYm1FdpNELV';

const getAmbulancedrive = async (req, res) => {
    db.query('SELECT f_rom, t_o FROM trafficsignal', (err, results) => {
        if (err) {
            console.error('Error fetching route list:', err);
            return res.status(500).send('Error fetching route list');
        }
        res.status(200).json(results);
    });
};

const postAmbulancedrive = async (req, res) => {
    const { from: routeFrom, to: routeTo } = req.body;

    db.beginTransaction(err => {
        if (err) {
            console.error('Error starting transaction:', err);
            return res.status(500).send('Error starting transaction');
        }

        const sqlTrafficSignal = 'SELECT location, name, s_s_status FROM trafficsignal WHERE f_rom = ? AND t_o = ?';
        const sqlHospital = 'SELECT hospital_name, accept_patient FROM hospital WHERE location = ?';

        db.query(sqlTrafficSignal, [routeFrom, routeTo], async (err, signalDetails) => {
            if (err) {
                console.error('Error querying traffic signals:', err);
                db.rollback(() => {
                    return res.status(500).send('Error querying traffic signals');
                });
                return;
            }

            db.query(sqlHospital, [routeTo], async (err, hospitalDetails) => {
                if (err) {
                    console.error('Error querying hospitals:', err);
                    db.rollback(() => {
                        return res.status(500).send('Error querying hospitals');
                    });
                    return;
                }

                try {
                    await sendDiscordNotifications(signalDetails, hospitalDetails, routeTo);
                    db.commit(() => res.status(200).json({ signalDetails, hospitalDetails }));
                } catch (error) {
                    console.error('Error sending Discord notifications:', error);
                    db.rollback(() => {
                        return res.status(500).send('Error during notification');
                    });
                }
            });
        });
    });
};

async function sendDiscordNotifications(signalDetails, hospitalDetails, routeTo) {
    try {
        let textHospitalNames = hospitalDetails.map(h => h.hospital_name).join(', ');
        await axios.post(discordWebhookUrl2, {
            content: `Alert: A patient is headed to ${routeTo}. Hospitals ${textHospitalNames} cover this location. Prepare accordingly.`
        });
    } catch (error) {
        console.error('Error sending hospital notification:', error.response ? error.response.data : error);
        throw error;
    }

    try {
        for (const signal of signalDetails) {
            let discordNotification = `Alert: Ambulance is en route to ${signal.location}, ${signal.name}. Please ensure the road is clear.`;
            await axios.post(discordWebhookUrl1, { content: discordNotification });
        }
    } catch (error) {
        console.error('Error sending traffic signal notification:', error.response ? error.response.data : error);
        throw error;
    }
}

module.exports = { getAmbulancedrive, postAmbulancedrive };
