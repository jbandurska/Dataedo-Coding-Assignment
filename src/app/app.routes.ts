import { Routes } from '@angular/router';
import { AboutPageComponent } from './about/pages/about-page/about-page.component';
import { PeoplePageComponent } from './people/pages/people-page/people-page.component';

export const routes: Routes = [
  {
    path: 'people',
    component: PeoplePageComponent,
  },
  {
    path: 'about',
    component: AboutPageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'people',
  },
];
