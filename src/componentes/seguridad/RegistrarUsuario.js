import { Avatar, Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import LockOutLineIcon from '@material-ui/icons/LockOutlined';
import {compose} from 'recompose'
import { consumerFirebase } from '../../server';

const style = {
    paper: {
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar:{
        margin: 8,
        backgroundColor: "#e53935"
    },
    form:{
        width: "100%",
        marginTop: 10
    },
    submit:{
        marginTop: 15,
        marginBottom: 20
    }
}

const usuarioInicial ={
    nombre: '',
    apellido:'',
    email: '',
    password:''

}

class RegistrarUsuario extends Component {
    state = {
        firebase : null,
        usuario:{
            nombre: '',
            apellido:'',
            email:'',
            password:''
        }
    }

    //Metodo propio de los react component
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.firebase === prevState.firebase){
            return null;
        }

        return {
            firebase: nextProps.firebase
        }
    }

    onChange = e => {
        //clonar el estado del usuario y lo almacena en la variable
        let usuario = Object.assign({}, this.state.usuario);
        //actualizo con el valor de la caja de texto
        usuario[e.target.name]=  e.target.value;
        //actualizo el state
        this.setState({
            usuario: usuario
        })
    }   

    registrarUsuario = e => {
        e.preventDefault();
        console.log(this.state.usuario);

        const {usuario, firebase} = this.state;
        firebase.db
        .collection("Users")
        .add(usuario) //espera un json
        .then(usuarioAfter =>{
            console.log("Insercion exitosa", usuarioAfter);
            this.setState({
                usuario: usuarioInicial
            })
        })
        .catch(error => {
            console.log("error", error);
        })

    }

    render() {
        return (
           <Container maxWidth="md">
               <div style={style.paper}>
                   <Avatar style={style.avatar}>
                        <LockOutLineIcon></LockOutLineIcon>
                   </Avatar>
                   <Typography component="h1" variant="h5">
                       Registre su Cuenta
                   </Typography>
                   <form style={style.form}>
                       <Grid container spacing={2}>
                            <Grid item md={6} xs={12}>
                                <TextField name="nombre" onChange={this.onChange} value={this.state.usuario.nombre} fullWidth label="Ingrese su Nombre"></TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField name="apellido" onChange={this.onChange} value={this.state.usuario.apellido} fullWidth label="Ingrese sus Apellidos"></TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField name="email" onChange={this.onChange} value={this.state.usuario.email} fullWidth label="Ingrese su  e-mail"></TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField type="password" onChange={this.onChange} value={this.state.usuario.password} name="password" fullWidth label="Ingrese su password"></TextField>
                            </Grid>
                       </Grid>
                       <Grid container justify="center">
                           <Grid item xs={12} md={6} >
                               <Button type="submit" onClick={this.registrarUsuario} variant="contained" fullWidth size="large" color="primary" style={style.submit}>
                                   Registrar
                               </Button>
                           </Grid>

                       </Grid>
                   </form>
               </div>

           </Container>
        );
    }
}

export default compose(consumerFirebase) (RegistrarUsuario);