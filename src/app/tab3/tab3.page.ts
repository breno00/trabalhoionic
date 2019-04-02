import { Component } from '@angular/core';
import { ClienteService } from "../cliente/cliente.service";
import { Cliente } from "../cliente/cliente.model";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  clientes$:Observable<Cliente[]>;

  constructor(
    private clienteService: ClienteService,
     private router: Router, ) {
 
  }

  ngOnInit(): void {
    this.clientes$ = this.clienteService.getClientes();
  }

  remover(cliente: Cliente) {
    //this.clienteService.deleteCliente(cliente);
    
  }

  atualizar(cliente: Cliente) {
    //this.clienteService.atualizar(cliente);
    this.router.navigate(['tabs/tab2']);
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
