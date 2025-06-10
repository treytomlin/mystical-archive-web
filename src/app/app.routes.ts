import { Routes } from '@angular/router';
import { CollectionComponent } from './components/collection/collection.component'
import { SearchCardComponent } from './components/search-card/search-card.component';

export const routes: Routes = [
    { path: 'collection', component: CollectionComponent },
    { path: 'search', component: SearchCardComponent },

];
