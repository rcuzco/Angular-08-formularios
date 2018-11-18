import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit
{
  usuario: Object =
    {
      nombre: null,
      apellido: null,
      correo: null,
      pais: "",
      sexo: "Hombre",
      acepta: false
    };

  paises =
    [
      { codigo: "ESP", nombre: "España" },
      { codigo: "PER", nombre: "Perú" },
      { codigo: "BRA", nombre: "Brasil" },
      { codigo: "FRA", nombre: "Francia" }
    ];
  constructor()
  {
  }

  ngOnInit()
  {
  }

  guardar(forma:NgForm)
  {
    console.log("guardar!!");
    console.info(forma);    
  }
}
