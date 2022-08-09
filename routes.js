const express = require("express");
const routes = express.Router();
const db = require("./models");

routes.get("/users", async (req, res) => {
  const usuarios = await db.user.findAndCountAll();
  if (usuarios.count != 0) {
    res.status(200).json(usuarios);
  } else {
    res.status(404).send({
      error: "No hay registros",
    });
  }
});

routes.post("/loginUser", async (req, res) => {
  try {
    let name = req.body.name;
    let password = req.body.password;
    const Usuario = await db.user.findOne({ where: { name: name } });
    if (Usuario) {
      if (password == Usuario.password) {
        res.status(200).send({
          message: "Bienvenido",
          user: {
            id: Usuario.id,
            name: Usuario.name,
            country: Usuario.country,
            age: Usuario.age,
          },
        });
      } else {
        //error en la autenticación
        res.status(401).json({
          error: "Error en el usuario o contraseña.",
        });
      }
    } else {
      //error en la autenticación
      res.status(404).json({
        error: "Error en el usuario o contraseña.",
      });
    }
  } catch (error) {
    res.status(500).send({
      error: "¡Error en el servidor!" + error,
    });
  }
});

routes.post("/NewUser", async (req, res) => {
  try {
    password1 = req.body.password;
    password2 = req.body.password2;
    if (password1 == password2) {
      var fecha = Date.now();
      const usuarios = await db.user.create({
        name: req.body.name,
        password: req.body.password,
        country: req.body.country,
        department: req.body.department,
        municipality: req.body.municipality,
        age: req.body.age,
        date_reg: fecha,
        perms: 0,
        logins: 0,
        numGames: 0,
      });
      res.status(200).send({
        message: "Usuario creado con éxito.",
      });
    } else {
      res.status(400).send({
        message: "Error, contraseñas diferentes",
      });
    }
  } catch (error) {
    res.status(500).send({
      error: "¡Error en el servidor!" + error,
    });
  }
});

routes.put("/edit/:id", async (req, res) => {
  try {
    var id2 = req.params.id;
    let perms =
      req.body.perms != undefined || req.body.perms != null
        ? req.body.perms
        : 0;
    let logins =
      req.body.logins != undefined || req.body.logins != null
        ? req.body.logins
        : 0;
    let numGames =
      req.body.numGames != undefined || req.body.numGames != null
        ? req.body.numGames
        : 0;
    const registro = await db.user.update(
      {
        perms: perms,
        logins: logins,
        numGames: numGames,
      },
      {
        where: {
          id: id2,
        },
      }
    );
    res.status(200).send({
      message: "Usuario modificado con éxito.",
    });
  } catch (error) {
    res.status(500).send({
      error: "¡Error en el servidor!" + error,
    });
  }
});

//Historial Metodos

routes.post("/NewHistorial", async (req, res) => {
  try {
    const Usuario = await db.user.findOne({ where: { id: req.body.user_fk } });
    console.log(Usuario);
    if (Usuario) {
      const historialNuevo = await db.historial.create({
        user_fk: req.body.user_fk,
        score: req.body.score,
        waves: req.body.waves,
        enemies: req.body.enemies,
        nodamage: req.body.nodamage,
        powerup: req.body.powerup,
        bullets: req.body.bullets,
      });
      res.status(200).send({
        message: "Usuario creado con éxito.",
      });
    } else {
      res.status(404).send({
        error: "El usuario no se encuentra registrado.",
      });
    }
  } catch (error) {
    res.status(500).send({
      error: "¡Error en el servidor!" + error,
    });
  }
});

routes.get("/getHistory", async (req, res) => {
  try {
    const historiales = await db.historial.findAndCountAll({
      include: {
        model: db.user,
        attributes: ["name", "country", "age"],
        required: true,
      },
    });
    if (historiales.count != 0) {
      res.status(200).json(historiales);
    } else {
      res.status(404).send({
        error: "No hay registros en el sistema.",
      });
    }
  } catch (error) {
    res.status(500).send({
      error: "¡Error en el servidor!" + error,
    });
  }
});

routes.put("/editHistorial/:id", async (req, res) => {
  try {
    var id2 = req.params.id;
    const historial = await db.historial.findOne({ where: { id: id2 } });

    if (historial) {
      let score =
        req.body.score != undefined || req.body.score != null
          ? req.body.score
          : historial.score;
      let waves =
        req.body.waves != undefined || req.body.waves != null
          ? req.body.waves
          : historial.waves;
      let enemies =
        req.body.enemies != undefined || req.body.enemies != null
          ? req.body.enemies
          : historial.enemies;
      let nodamage =
        req.body.nodamage != undefined || req.body.nodamage != null
          ? req.body.nodamage
          : historial.nodamage;
      let powerup =
        req.body.powerup != undefined || req.body.perms != null
          ? req.body.powerup
          : historial.powerup;
      let bullets =
        req.body.bullets != undefined || req.body.bullets != null
          ? req.body.bullets
          : historial.bullets;

      const registro = await db.historial.update(
        {
          score: score,
          waves: waves,
          enemies: enemies,
          nodamage: nodamage,
          powerup: powerup,
          bullets: bullets,
        },
        {
          where: {
            id: id2,
          },
        }
      );
      res.status(200).send({
        message: "Historial modificado con éxito.",
      });
    } else {
      res.status(404).send({
        error: "No hay registros en el sistema.",
      });
    }
  } catch (error) {
    res.status(500).send({
      error: "¡Error en el servidor!" + error,
    });
  }
});

/*
routes.delete('/delete/:id', async(req, res)=>{
    var id1 = req.params.id;
    const Eliminar = await db.user.findOne({
          where: { id: id1},
        });
        Eliminar.destroy();

        res.status(200).send({
          message: "Contacto Eliminado Exitosamente!",
        });
})
*/

module.exports = routes;
