import { Avatar, Button, Container, TextField, Typography } from "@material-ui/core";
import React, { Component } from "react";
import LockOutlineIcon from '@material-ui/icons/LockOutlined';
import { compose } from "recompose";
import { consumerFirebase } from "../../server";

const style = {
  paper: {
    marginTop: 9,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: 5,
    backgroundColor: "#e53935",
  },
  form:{
    width: "100%",
    marginTop: 8,

  }
};

class Login extends Component {

  state = {
    firebase : null,
    usuario : {
      email : '',
      password: ''
    }
  }

  //Extraigo el objeto firebase
  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.firebase === prevState.firebase){
      return null;
    }
    return {
      //Cargo dentro del login al objeto firebase
      firebase: nextProps.firebase
    }
  }

  onChange = e => {
    //clono el valor de la variable usuario del state
    let usuario = Object.assign({}, this.state.usuario);
    usuario[e.target.name] = e.target.value;
    this.setState({
      usuario : usuario
    });
  }

  login = e => {
    e.preventDefault();

    const {firebase, usuario} =  this.state;

    firebase.auth
    .signInWithEmailAndPassword(usuario.email, usuario.password)
    .then(auth => {
      this.props.history.push('/');
    })
    .catch(error => {
      console.log(error);
    })
  }

  render() {
    return (
      <Container maxWidth="xs">
          <div style={style.paper}>
              <Avatar style={style.avatar}>
              <LockOutlineIcon></LockOutlineIcon>
              </Avatar>
              <Typography component="h1" variant="h5">
                  Ingrese Usuario
              </Typography>
              <form style={style.form}>
                <TextField 
                  variant="outlined" 
                  label="E-mail" 
                  name="email" 
                  fullWidth 
                  margin="normal"
                  onChange={this.onChange}
                  value={this.state.usuario.email}/>
                <TextField 
                  variant="outlined" 
                  label="Password" 
                  type="password"  
                  name="password" 
                  fullWidth 
                  margin="normal" 
                  onChange={this.onChange}
                  value={this.state.usuario.password}/>
                  <Button fullWidth variant="contained" color="primary" type="submit" onClick={this.login}>
                    Enviar
                  </Button>
              </form>
          </div>
      </Container>
     
    );
  }
}
//compose libreria que permite agregar funcionalidades a un componente react
export default compose(consumerFirebase)(Login);
