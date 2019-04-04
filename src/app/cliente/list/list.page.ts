import { Component, OnInit } from "@angular/core";
import { ClienteService } from "../cliente.service";
import { Cliente } from "../cliente.model";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-list",
  templateUrl: "./list.page.html",
  styleUrls: ["./list.page.scss"]
})
export class ListPage implements OnInit {
  clientes$: Observable<Cliente[]>;
  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.clientes$ = this.clienteService.getClientes();
  }

  remover(cliente: Cliente) {
    this.clienteService.deleteCliente(cliente).subscribe(
      ok => {
        console.log("Apagado");
        this.clientes$ = this.clienteService.getClientes();
      },
      erro => {
        console.log(erro);
      }
    );
  }

  atualizar(cliente: Cliente) {
    //this.clienteService.getCliente();
    this.router.navigate(["tabs/tab2", cliente.id]);
  }

  doRefresh(event) {
    //console.log('Begin async operation');
    this.clientes$ = this.clienteService.getClientes();

    setTimeout(() => {
      //sconsole.log('Async operation has ended');
      event.target.complete();
    }, 3000);
  }
}
