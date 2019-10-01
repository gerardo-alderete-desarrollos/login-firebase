import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModel;
  recordar = false;

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();

  }
  onSubmit( f: NgForm) {
    if ( !f.invalid ) {
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();
      this.auth.nuevoUsuario(this.usuario).subscribe(
        res => {
          Swal.close();
          if ( this.recordar ) {
            localStorage.setItem('email', this.usuario.email);
          }
          this.router.navigateByUrl('/home');
        },
        err => {
          Swal.fire({
            type: 'error',
            text: err.error.error.message,
            title: 'Error al registrar'
          });
        }
      );
    }
  }


}
