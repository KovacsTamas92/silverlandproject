const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');
const app = express();
const port = 3000;
const url = 'mongodb+srv://silverland:silverland@cluster0.hukpn1b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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

// Schema
const dataSchema = new mongoose.Schema({
    file: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^data:[a-z]+\/[a-z]+;base64,/.test(v);
        },
        message: 'A fájl nem base64 kódolt.'
      }
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    maincategory: {
      type: String,
      required: true
    },
    subcategory: {
      type: String,
      required: true
    }
});

const DataModel = mongoose.model('Data', dataSchema);

// Adatok feltöltése és frissítése
app.post('/api/data', (req, res) => {
    const { _id, file, name, price, description, maincategory, subcategory } = req.body;

    if (_id) {
        // Frissítés
        DataModel.findByIdAndUpdate(_id, { $set: { file, name, price, description, maincategory, subcategory } }, { new: true, runValidators: true })
            .then((updatedData) => {
                if (!updatedData) {
                    console.log('Nem található ilyen adat az adatbázisban!');
                    return res.status(404).send('Nem található ilyen adat az adatbázisban!');
                }
                console.log('Az adat sikeresen frissítve lett!');
                res.status(200).send('Az adat sikeresen frissítve lett!');
            })
            .catch((err) => {
                console.log('Hiba az adat frissítésekor:', err);
                res.status(500).send('Hiba az adat frissítésekor!');
            });
    } else {
        // Új adat létrehozása
        const data = new DataModel({ file, name, price, description, maincategory, subcategory });

        data.save()
            .then(() => {
                console.log('Az adatok mentése sikeres volt!');
                res.status(200).send('Adatok sikeresen fogadva és mentve a szerveren.');
            })
            .catch((err) => {
                console.log('Hiba az adatok mentésekor:', err);
                res.status(500).send('Hiba az adatok mentésekor!');
            });
    }
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

app.listen(port, () => {
    console.log(`A szerver fut a ${port}-es porton!`);
});
