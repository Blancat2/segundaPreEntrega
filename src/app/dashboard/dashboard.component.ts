import { Component, OnDestroy } from '@angular/core';
import { enviroment } from 'src/environments/environments';
import { AuthService } from '../auth/services/auth.service';
import { Usuario } from '../core/models';
import { Observable, Subject, Subscription, filter, map, takeUntil } from 'rxjs';
import links, { NavItem } from './nav-items';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  showFiller = false;
  isProd = enviroment.isProduction;

  authUser$: Observable<Usuario | null>;

  links = links;

  destroyed$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

    this.authUser$ = this.authService.obtenerUsuarioAutenticado()

    
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  logout(): void {
    this.authService.logout();
  }

 verificarRole(link: NavItem): Observable<boolean> {
  return this.authUser$.pipe(
    map((usuarioAuth) =>
      link.rolesPermitidos.some((r) => r === usuarioAuth?.role)
    
    )
  )
 }
}
