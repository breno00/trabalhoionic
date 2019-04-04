import { Component, OnInit } from "@angular/core";
import { ClienteService } from "../cliente.service";
import { Cliente } from "../cliente.model";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AlertController } from '@ionic/angular';

@Component({
  selector: "app-add",
  templateUrl: "./add.page.html",
  styleUrls: ["./add.page.scss"]
})
export class AddPage implements OnInit {
  cliente: Cliente;
  confPws: string;
  
  constructor(
    public alertController: AlertController,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.cliente = new Cliente();
  }
  formDados(form) {
    if (form.valid) {
      this.addCliente(this.cliente) ? form.reset() : "";
    }
  }

  addCliente(cliente: Cliente): boolean {
    this.clienteService.addCliente(cliente).subscribe(
      ok => {
        this.presentAlert("AVISO", "Cadastrado", "success");
        this.cliente = new Cliente();
        this.confPws = "";
      },
      erro => {
        this.presentAlert("ERRO!", "", "danger");
        return false;
      }
    );
    return true;
  }

  async presentAlert(tipo: string, texto: string, cor: string) {
    const alert = await this.alertController.create({
      header: tipo,
      //subHeader: "Subtitle",
      message: texto,
      cssClass: cor,
      buttons: ["OK"]
    });

    await alert.present();
  }
}
