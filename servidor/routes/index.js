var express = require('express');
var path = require('path')
var fs = require('fs')
var router = express.Router();

const dbRoute = 'routes/db.json'

//validar email regex:
const validateMail = /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/

//leer .json
function readFS() {
  let dataFil = fs.readFileSync(dbRoute);
  dataFil = JSON.parse(dataFil);
  return dataFil;
}

//escribir .json
function writeFS(dataFil) {
  fs.writeFileSync(dbRoute, JSON.stringify(dataFil));
}

//validar email:
function validate(newUser) {
  if (!validateMail.test(newUser.email)) {
    return false;
  }
  if (newUser.email.length === 0) {
    return false; //no necesito poner el else
  }
  return true;
}

//RUTAS anda
//PING PONG
router.get('/ping', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'pong.html'))
});
//INDEX
router.get('/users', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'index.html'))
});
//NEW USER
router.get('/users/new', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'newUser.html'))
});
//EDIT USER
router.get('/users/edit', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'editUser.html'))
})
/////////////////////////

//GET hecho ANDA
router.get('/api/users', function (req, res) {
  dataFil = readFS();

  // a partir de aca contenido nuevo, SEARCH
  let search = req.query.search;

  //con el u accede a los datos de users. toLowerCase para que no distinga mayus/minus en la busqueda
  if (search && search.length > 0) {
    dataFil = dataFil.filter(function (i) {
      return i.name.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
        i.surname.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
        i.phone.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
        i.email.toLowerCase().indexOf(search.toLowerCase()) >= 0  //cada una de esas comparaciones devuelve true o false
    })
  }
  res.json(dataFil)
  
})

//leer web
router.get('/api/users/:id', function (req, res) {
  const parameters = req.params.id
  dataFil = readFS();
  for (let i = 0; i < dataFil.length; i++) {
    if (dataFil[i].id == parameters) {
      return res.json(dataFil[i])
    }
  }
});

////////////////////////
//POST hecho ANDA
router.post('/api/users', function (req, res) {
  const user = req.body
  dataFil = readFS();

  const newId = dataFil.length === 0 ? (1) : dataFil[dataFil.length - 1].id + 1

  const newUser = {
    name: user.name,
    surname: user.surname,
    email: user.email,
    phone: user.phone,
    id: newId
  }
  //llamado a funcion (que no anda, tira un error 500)
  if (validate(newUser) === true) {
    //res.status(200);
    dataFil.push(newUser)
    writeFS(dataFil);
    res.json(dataFil);
  } else {
    res.status(418).send('error en la data');
  }
})

/////////////////////////////
//PUT hecho
router.put('/api/users/:id', function (req, res) {
  dataFil = readFS();

  const parameters = req.params.id
  const body = req.body
  const bodyKeys = Object.keys(body)

  for (var q = 0; q < dataFil.length; q++) {
    const actualUs = dataFil[q];
    if (actualUs.id == parameters) {
      const userK = Object.keys(actualUs);
      for (let w = 0; w < bodyKeys.length; w++) {
        const currentKey = bodyKeys[w]
        if (userK.indexOf(currentKey) > -1) {
          actualUs[currentKey] = body[currentKey]
        } else {
          console.log(`${currentKey} no es una clave válida`)
        }
      }

      writeFS(dataFil);
      res.json(dataFil);

      return res.json(actualUs)
    }
  }
})

/////////////////////////
//DELETE hecho ANDA
router.delete('/api/users/:id', function (req, res) {
  const parameters = req.params.id
  let dataFil = fs.readFileSync(dbRoute)
  dataFil = JSON.parse(dataFil)

  for (let i = 0; i < dataFil.length; i++) {
    if (dataFil[i].id == parameters) {
      dataFil.splice(i, 1)
    }
  }

  writeFS(dataFil);
  return res.send('todo ok')
})



module.exports = router;
