const con = require('../connection')

const postHome = async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const sql = "SELECT profession FROM user WHERE email_id = ? AND password = ?;";
    const values = [email, password];

    con.query(sql, values, (err, result) => {
        if (err) throw err;

        if (result.length !== 0) {
            if (result[0].profession === "hpt") {
                res.status(200).json({ page: "hospital" })
            } else if (result[0].profession === "trp") {
                res.status(200).json({ page: "traffic-police" })
            } else {
                res.status(200).json({ page: "ambulance-driver" })
            }
        }
    });
};

module.exports = { postHome };