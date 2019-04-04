import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

import { Cliente } from "../cliente.model";
import { ClienteService } from "../cliente.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.page.html",
  styleUrls: ["./edit.page.scss"]
})
export class EditPage implements OnInit {
  cliente: Cliente;
  confPws: string;
  id: number = 0;

  constructor(
    public alertController: AlertController,
    private clienteService: ClienteService,
    private activeRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cliente = new Cliente();
    if (this.activeRouter.snapshot.paramMap.get("id") == null) {
      this.presentAlert("Erro", "Você não selecionou um cliente!", "");
    } else {
      this.id = parseInt(this.activeRouter.snapshot.paramMap.get("id"));
      this.clienteService
        .getCliente(this.id)
        .subscribe(dados => (this.cliente = dados));
    }
  }
  formDados(form) {
    if (form.valid) {
      this.updateCliente(this.cliente, this.id) ? form.reset() : "";
    }
  }

  updateCliente(cliente: Cliente, id: number): boolean {
    this.clienteService.updateCliente(cliente, id).subscribe(
      ok => {
        this.presentAlert("AVISO", "Atualizado", "success");
        this.cliente = new Cliente();
        this.confPws = "";
        this.id = 0;
        this.router.navigate(['tabs/tab3'])
      },
      erro => {
        this.presentAlert("ERRO!", "Não foi possível atualizar!", "danger");
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
