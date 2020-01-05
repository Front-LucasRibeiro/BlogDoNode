const express = require('express'),
router = express.Router(),
mongoose = require('mongoose')
require('../models/Usuario')
Usuario = mongoose.model('usuarios'),
bcrypt = require('bcryptjs'),
passport = require('passport')

router.get('/registro',(req,res) => {
  res.render('usuarios/registro')
})

router.post('/registro',(req,res) => {
  var erros = []

  if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
    erros.push({texto: "Nome inválido"})
  }
  if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
    erros.push({texto: "E-mail inválido"})
  }
  if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
    erros.push({texto: "Senha inválida"})
  }
  if(req.body.senha.length < 4){
    erros.push({texto: "Senha muito curta"})
  }

  if(req.body.senha != req.body.senha2){
    erros.push({texto: "As senhas são diferentes, tente novamente"})
  }

  if(erros.length > 0){
    res.render('usuarios/registro', {erros: erros} )
  }else{
    // verificando se ja existe o usuario cadastrado no banco 
    Usuario.findOne({email: req.body.email}).then((usuario) => {
      if(usuario){
        req.flash("error_msg", "Já existe uma conta com este e-mail no nosso sistema")
        res.redirect('/usuarios/registro')
      }else{
        // gravando dados no banco 
        const novoUsuario = new Usuario({
          nome: req.body.nome,
          email: req.body.email,
          senha: req.body.senha
        })

        // criando hash para criptografar senha, salt valor aleatorio misturado no hash gerado
        bcrypt.genSalt(10, (erro, salt) => {
          bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
            if(erro){
              req.flash("error-msg", "Houve um erro ao salvar dados do usuário.")
              res.redirect('/')
            }

            novoUsuario.senha = hash
            novoUsuario.save().then(() => {
              req.flash("success_msg", "Usuário criado com sucesso.")
              res.redirect('/')
            }).catch((err) => {
              req.flash("error_msg", "Houve um erro ao salvar dados do usuário, tente novamente")
              res.redirect('/usuarios/registro')
            })
          })
        })
      }
    }).catch((err) => {
      req.flash("error_msg", "Houve um erro interno")
      res.redirect('/')
    })
  }
})

router.get('/login', (req, res) => {
  res.render('usuarios/login')
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/usuarios/login',
    failureFlash: true
  })(req, res, next)
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg','Deslogado com sucesso!')
  res.redirect('/')
})

module.exports = router