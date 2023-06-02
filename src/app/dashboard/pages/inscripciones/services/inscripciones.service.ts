import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { InscripcionWithAll } from '../models';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  constructor(private httpClient: HttpClient) { }

  getAllInscripciones(): Observable<InscripcionWithAll[]> {
    return this.httpClient.get<InscripcionWithAll[]>(`${enviroment.apiBaseURl}/inscripciones`)
  }
}
