const db = require('../connection')

const getTraffic = async(req, res) => {
    const sqlSelect = 'SELECT DISTINCT location, s_s_status FROM trafficsignal';
    db.query(sqlSelect, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching traffic signals');
            return;
        }

        const trafficSignals = results.map(signal => [
            signal.location,
            signal.s_s_status === 1 ? 'Free' : 'Busy'
        ]);

        res.status(200).json(trafficSignals)
    });
};

const postTraffic = async(req, res) => {
    const trafficLocationTp = req.body.traffic_name_tp;
    const signalStatusTp = req.body.Signal_Status;

    const sqlUpdate = 'UPDATE trafficsignal SET s_s_status = ? WHERE location = ?';
    db.query(sqlUpdate, [signalStatusTp, trafficLocationTp], (err, result) => {
        if (err) {
            // If there's an error, respond and stop further execution.
            res.status(500).send('Error updating traffic signal status');
            return;
        }

        const sqlSelect = 'SELECT DISTINCT location, s_s_status FROM trafficsignal WHERE location = ?';
        db.query(sqlSelect, [trafficLocationTp], (err, results) => {
            if (err) {
                // If there's an error, respond and stop further execution.
                res.status(500).send('Error fetching updated traffic signal');
                return;
            }

            const trafficSignals = results.map(signal => ({
                location: signal.location,
                status: signal.s_s_status === 1 ? 'Free' : 'Busy'
            }));

            // Send the final response. No other response should be sent after this point.
            res.status(200).json({
                traffic_list: trafficSignals,
                record_updated: "Changed successfully"
            });
        });
    });
};

module.exports = { getTraffic, postTraffic };
