import { Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { AddressComponent } from './components/address/address.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// Use lazy loading to load modules effectivelly
export const routes: Routes = [
    { path: '', component: ProfileComponent },
    { path: 'address', component: AddressComponent },
    { path: '**', component: NotFoundComponent }
];
