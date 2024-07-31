const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');
const app = express();
require('dotenv').config();

const port = process.env.PORT
const url = process.env.MONGOOSE_URI

//Datamodel import
const DataModel = require('./models/product')
const AdminModel = require('./models/adminUser')

// Middleware
app.use(cors());
app.use(express.json({ limit: '500mb' }));

// MongoDB kapcsolat
mongoose.connect(url) 
  .then(() => {
    console.log('A MongoDB adatbázishoz sikeresen kapcsolódva!');
  })
  .catch((error) => {
    console.log('Hiba a MongoDB adatbázis kapcsolat során:', error);
  });

//Adatok feltöltése
app.post('/api/data', (req, res) => {

  const {file, name, price, description, maincategory, subcategory} = req.body

  if (!req.body || !file) {
    res.status(400).send('Nincs fájl az adatokban!');
    return;
  }

  const data = new DataModel({
    file,
    name,
    price,
    description,
    maincategory,
    subcategory
  });

  data.save().then(() => {
    console.log('Az adatok mentése sikeres volt!');
    res.status(200).send('Adatok sikeresen fogadva és mentve a szerveren.');
  }).catch((err) => {
    console.log('Hiba az adatok mentésekor:', err);
    res.status(500).send('Hiba az adatok mentésekor!');
  });
});

// Adatok lekérdezése
app.get('/api/data', (req, res) => {
    DataModel.find({})
        .then((data) => {
            console.log('Az adatok lekérdezése sikeres volt!');
            res.send(data);
        })
        .catch((err) => {
            console.log('Hiba az adatok lekérdezésekor:', err);
            res.status(500).send('Hiba az adatok lekérdezésekor!');
        });
});

// Adatok lekérdezése ID alapján
app.get('/api/data/:id', (req, res) => {
  const id = req.params.id;
  DataModel.findById(id)
      .then((data) => {
          if (!data) {
              return res.status(404).send('A keresett adat nem található!');
          }
          res.send(data);
      })
      .catch((err) => {
          console.log('Hiba az adat lekérdezésekor:', err);
          res.status(500).send('Hiba az adat lekérdezésekor!');
      });
});

// Adatok törlése
app.delete('/api/data/:id', (req, res) => {
    const id = req.params.id;
    DataModel.findByIdAndDelete(id)
        .then(() => {
            console.log('Az adat törlése sikeres volt!');
            res.status(200).json({ message: 'Az adat törlése sikeres volt!' });
        })
        .catch((err) => {
            console.log('Hiba az adat törlésekor:', err);
            res.status(500).send('Hiba az adat törlésekor!');
        });
});

// Adatok frissítése ID alapján
app.put('/api/data/:id', (req, res) => {
  const id = req.params.id;
  const { file, name, price, description, maincategory, subcategory } = req.body;

  DataModel.findByIdAndUpdate(id, { file, name, price, description, maincategory, subcategory }, { new: true, runValidators: true })
      .then((updatedData) => {
          if (!updatedData) {
              return res.status(404).send('A keresett adat nem található!');
          }
          console.log('Az adat sikeresen frissítve lett!');
          res.status(200).send(updatedData);
      })
      .catch((err) => {
          console.log('Hiba az adat frissítésekor:', err);
          res.status(500).send('Hiba az adat frissítésekor!');
      });
});

// Admin regisztrációs útvonal
app.post('/api/adminregistration', (req, res) => {
  const { username, password, email, masterKey } = req.body;

  if (masterKey !== process.env.ADMIN_SECRET_KEY) {
    return res.status(403).send('Hibás admin master key!');
  }

  if (!username || !password || !email) {
    return res.status(400).send('Nincs fájl az adatokban!');
  }

  const adminData = new AdminModel({
    username,
    password,
    email,
  });

  adminData.save()
    .then(() => {
      console.log('Az adatok mentése sikeres volt!');
      res.status(200).send('Adatok sikeresen fogadva és mentve a szerveren.');
    })
    .catch((err) => {
      console.log('Hiba az adatok mentésekor:', err);
      res.status(500).send('Hiba az adatok mentésekor!');
    });
});

// Admin bejelentkezési útvonal
app.post('/api/adminlogin', (req, res) => {
  const { username, password } = req.body;

  AdminModel.findOne({ username, password })
    .then((admin) => {
      if (!admin) {
        return res.status(401).send('Hibás felhasználónév vagy jelszó!');
      }
      res.status(200).send('Bejelentkezés sikeres!');
    })
    .catch((err) => {
      console.log('Hiba a bejelentkezés során:', err);
      res.status(500).send('Hiba a bejelentkezés során!');
    });
});


app.listen(port, () => {
    console.log(`A szerver fut a ${port}-es porton!`);
});