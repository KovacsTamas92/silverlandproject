const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');
const app = express();
require('dotenv').config();
const bcrypt = require('bcrypt');

const port = process.env.PORT
const url = process.env.MONGOOSE_URI

//Model import
const DataModel = require('./models/product')
const AdminModel = require('./models/adminUser')
const UserModel = require('./models/user')
const OrderingModel = require('./models/oredering');

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

//Termék feltöltése
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

// Termékek lekérdezése
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

// Termék lekérdezése ID alapján
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

// Termék törlése
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

// Termék frissítése ID alapján
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
app.post('/api/adminregistration', async (req, res) => {
  const { username, password, email, masterKey } = req.body;

  if (masterKey !== process.env.ADMIN_SECRET_KEY) {
    return res.status(403).send('Hibás admin master key!');
  }

  if (!username || !password || !email) {
    return res.status(400).send('Nincs fájl az adatokban!');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const adminData = new AdminModel({
      username,
      password: hashedPassword, 
      email,
    });

    await adminData.save();
    console.log('Az adatok mentése sikeres volt!');
    res.status(200).send('Adatok sikeresen fogadva és mentve a szerveren.');
  } catch (err) {
    console.log('Hiba az adatok mentésekor:', err);
    res.status(500).send('Hiba az adatok mentésekor!');
  }
});

// Admin bejelentkezési útvonal
app.post('/api/adminlogin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await AdminModel.findOne({ username });
    if (!admin) {
      return res.status(401).send('Hibás felhasználónév vagy jelszó!');
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).send('Hibás felhasználónév vagy jelszó!');
    }

    res.status(200).json(admin);
  } catch (err) {
    console.log('Hiba a bejelentkezés során:', err);
    res.status(500).send('Hiba a bejelentkezés során!');
  }
});


// Admin adatok lekérdezése ID alapján
app.get('/api/admin/:id', (req, res) => {
  const id = req.params.id;
  AdminModel.findById(id)
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

// Admin adatok törlése ID alapján
app.delete('/api/admin/:id', (req, res) => {
  const id = req.params.id;
  AdminModel.findByIdAndDelete(id)
      .then(() => {
          console.log('Az adat törlése sikeres volt!');
          res.status(200).json({ message: 'Az adat törlése sikeres volt!' });
      })
      .catch((err) => {
          console.log('Hiba az adat törlésekor:', err);
          res.status(500).send('Hiba az adat törlésekor!');
      });
});

// Admin frissítése ID alapján
app.put('/api/admin/:id', async (req, res) => {
  const id = req.params.id;
  const { username, password, email } = req.body;

  try {

    const hashedPassword = await bcrypt.hash(password, 10);
    const updateData = { 
      username, 
      email, 
      password: hashedPassword 
    };

    const updatedData = await AdminModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    
    console.log('Admin sikeresen frissítve lett!');
    res.status(200).send(updatedData);
  } catch (err) {
    console.log('Hiba az Admin frissítésekor:', err);
    res.status(500).send('Hiba az Admin frissítésekor!');
  }
});


// User regisztrációs útvonal
app.post('/api/userregistration', async (req, res) => {
  const { username, name, password, email, phone_number, tracking_name, country, zip_code, city, address } = req.body;

  if (!username || !name || !password || !email || !phone_number || !tracking_name || !country || !zip_code || !city || !address) {
    return res.status(400).send('Nincs fájl az adatokban!');
  }

  try {
   
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = new UserModel({
      username,
      name,
      password: hashedPassword, 
      email,
      phone_number,
      tracking_name,
      country,
      zip_code,
      city,
      address
    });

    await userData.save();
    console.log('Az adatok mentése sikeres volt!');
    res.status(200).send('Adatok sikeresen fogadva és mentve a szerveren.');
  } catch (err) {
    console.log('Hiba az adatok mentésekor:', err);
    res.status(500).send('Hiba az adatok mentésekor!');
  }
});

// User bejelentkezési útvonal
app.post('/api/userlogin', async (req, res) => {

  const { username, password } = req.body;

  try {

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).send('Hibás felhasználónév vagy jelszó!');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Hibás felhasználónév vagy jelszó!');
    }

    res.status(200).send(user);
  } catch (err) {
    console.log('Hiba a bejelentkezés során:', err);
    res.status(500).send('Hiba a bejelentkezés során!');
  }
});

//User elérése ID alapján
app.get('/api/user/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findById(id)
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

// User adatainak frissítése ID alapján
app.put('/api/user/:id', async (req, res) => {
  const id = req.params.id;
  const { username, name, password, email, phone_number, tracking_name, country, zip_code, city, address } = req.body;

  try {

    const hashedPassword = await bcrypt.hash(password, 10);
    const updateData = { 
      username, 
      name, 
      email, 
      phone_number, 
      tracking_name, 
      country, 
      zip_code, 
      city, 
      address, 
      password: hashedPassword 
    };
    
    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    console.log('A felhasználó sikeresen frissítve lett!');
    res.status(200).send(updatedUser);
  } catch (err) {
    console.log('Hiba a felhasználó frissítésekor:', err);
    res.status(500).send('Hiba a felhasználó frissítésekor!');
  }
});

// Rendelés leadása útvonal
app.post('/api/userorder', async (req, res) => {
  const { ordered_data, name, price, email, phone_number, tracking_name, country, zip_code, city, address } = req.body;

  if (!ordered_data || !name || !price || !email || !phone_number || !tracking_name || !country || !zip_code || !city || !address) {
    return res.status(400).send('Nincs fájl az adatokban!');
  }

  const generateOrderNumber = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  const orderNumber = generateOrderNumber();

  try {
    const orderingData = new OrderingModel({
      name,
      price, 
      email,
      phone_number,
      tracking_name,
      country,
      zip_code,
      city,
      address,
      ordered_data,
      order_number: orderNumber
    });

    await orderingData.save();
    console.log('Az adatok mentése sikeres volt!');
    res.status(200).send('Adatok sikeresen fogadva és mentve a szerveren.');
  } catch (err) {
    console.log('Hiba az adatok mentésekor:', err);
    res.status(500).send('Hiba az adatok mentésekor!');
  }
});

// Rendelések lekérdezése
app.get('/api/userorder', (req, res) => {
  OrderingModel.find({})
      .then((data) => {
          console.log('Az adatok lekérdezése sikeres volt!');
          res.send(data);
      })
      .catch((err) => {
          console.log('Hiba az adatok lekérdezésekor:', err);
          res.status(500).send('Hiba az adatok lekérdezésekor!');
      });
});

app.listen(port, () => {
    console.log(`A szerver fut a ${port}-es porton!`);
});