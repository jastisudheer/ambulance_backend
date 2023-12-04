const db = require("../connection");

const postAdmin = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const proffession = req.body.profession;
  const password = req.body.password;

  console.log(name, email, password, proffession);
  // Insert the user into the database
  const sqlUser =
    "INSERT INTO user(name, email_id, profession, password) VALUES(?, ?, ?, ?)";
  const valuesUser = [name, email, proffession, password];

  db.query(sqlUser, valuesUser, (err, result) => {
    if (err) {
      res.status(500).send("Error while inserting user");
      throw err; 
    }

    // Handle additional information based on profession
    if (proffession === "trp") {
      const { location, d_name, from1, to1, from2, to2 } = req.body;
      const sqlTraffic =
        "INSERT INTO trafficsignal(f_rom, t_o, location, name, s_s_status, discord_name) VALUES ?";
      const valuesTraffic = [[from1, to1, location, name, 1, d_name]];
      if (from2 && to2) {
        valuesTraffic.push([from2, to2, location, name, 1, d_name]);
      }
      db.query(sqlTraffic, [valuesTraffic], (err, result) => {
        if (err) {
          res.status(500).send("Error while inserting traffic signal");
          return;
        }
        res.status(200).json({ message: "Record added successfully" });
        return;
      });
    } else if (proffession === "hpt") {
      const { hospital, d_name_d, hospitallocation } = req.body;
      const sqlHospital =
        "INSERT INTO hospital(h_discord_name, hospital_name, accept_patient, location) VALUES ?";
      const valuesHospital = [[d_name_d, hospital, 0, hospitallocation]];

      db.query(sqlHospital, [valuesHospital], (err, result) => {
        if (err) {
          res.status(500).send("Error while inserting hospital");
          return;
        }
        res.status(200).json({ message: "Record added successfully" });
        return;
      });
    } else {
      res.status(200).json({ message: "Record added successfully" });
      return;
    }
  });
};

module.exports = { postAdmin };
