import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators, FormArray } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit
{
  forma: FormGroup;
  usuario: object =
    {
      nombrecompleto:
      {
        nombre: "Rony",
        apellido: "Cuzco"
      },
      correo: "lorem@ipsum.com"
      , pasatiempos: ["correr"],
      password1: "",
      password2: "",
      username:""
    }

  constructor()
  {
    console.log(this.usuario);

    this.forma = new FormGroup(
      {
        "nombrecompleto": new FormGroup(
          {
            "nombre": new FormControl("", [Validators.required, Validators.minLength(3)]),
            "apellido": new FormControl("", [Validators.required, this.noGuzman]),
          }
        ),        
        "correo": new FormControl("",
          [
            Validators.required,
            Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
          ]),
        "pasatiempos": new FormArray(
          [
            new FormControl("Comer",Validators.required)
          ]),        
        "password1": new FormControl(),
        "password2": new FormControl(),
        "username": new FormControl("", [Validators.required], this.existeUsuario)
      });

    //agregando los validadores de otra forma
    this.forma.controls["password2"].setValidators([Validators.required, this.noIguales.bind(this.forma)]);

    //suscribirse a cambios en el formulario 
    this.forma.valueChanges.subscribe(data =>
    {
      console.log(data);
    });
    //suscribise a cambios en un control específico
    this.forma.controls["username"].valueChanges.subscribe(data =>
    {
      console.log(data);
    });
    //suscribise a cambios en un control específico y ver si su estatus es válido o no
    this.forma.controls["username"].statusChanges.subscribe(data =>
    {
      console.log(data);
    });


    this.forma.setValue(this.usuario); //con esta línea llenamos el formulario con los datos del objeto usuario, OJO, tienen q tener las mismas propiedades
  }

  //validadores personalizados
  noGuzman(control: FormControl): {[s:string]:boolean}
  {
    if (control.value === "guzman")
    {
      return { noguzman: true }; //la validación no pasa, o sea q si devuelvo algo es q la validación no pasa
    }
    return null; //la validación pasa. si no devuelvo nada, la validación se ha pasado
  }

  noIguales(control: FormControl): { [s: string]: boolean }
  {
    let forma:any = this
    if (control.value !== forma.controls["password1"].value)
    {
      return { noiguales: true }; //la validación no pasa, o sea q si devuelvo algo es q la validación no pasa
    }
    return null; //la validación pasa. si no devuelvo nada, la validación se ha pasado
  }
  //validadores asíncronos
  existeUsuario(control: FormControl): Promise<any> | Observable<any>
  {
    let promesa = new Promise((resolve, reject) =>
    {
      setTimeout(() =>
      {
        if (control.value === "rcuzco")
        {
          resolve({ existe: true });
        } else
        {
          resolve(null);
        }
      },4000);
    });
    return promesa;
  }
  



  ngOnInit()
  {
  }

  guardarCambios()
  {
    console.log(this.forma);
    //this.forma.reset(); //borramos los datos del formulario
    //o podemos resetearlo cargando un objeto vacío
    /*
    this.forma.reset(
      {
        nombrecompleto:
        {
          nombre: "",
          apellido: ""
        },
        correo: ""
      }
    );*/
  }

  agregarPasatiempo()
  {
    (<FormArray>this.forma.controls["pasatiempos"]).push(new FormControl("", [Validators.required]));
  }
}
