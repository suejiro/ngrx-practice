import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CourseEntityService } from './course-entity.service';
import { map, tap, filter, first } from 'rxjs/operators';

@Injectable()
export class CoursesResolever implements Resolve<boolean> {
  constructor(private cousesService: CourseEntityService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.cousesService.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.cousesService.getAll();
        }
      }),
      filter(loaded => !!loaded),
      first()
    );
  }
}
