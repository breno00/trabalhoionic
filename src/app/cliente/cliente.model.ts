export class Cliente {
  _id: number;
  nome: string;
  email: string;
  pws: string;
  ativo: boolean;

  validar(confpws: string) {
    let erros: string = null;

    if (this.nome == null) {
      erros += "Nome em branco. <br>";
    }
    if (this.email == null) {
      erros += "E-mail em branco. <br>";
    }
    if (this.pws == null) {
      erros += "Senha em branco. <br>";
    } else if (this.pws.length < 5) {
      erros += "Senha Curta. <br>";
    } else if (this.pws != confpws) {
      erros += "Senhas diferentes. <br>";
    }

    if (erros != "") throw erros;

    return true;
  }
}
