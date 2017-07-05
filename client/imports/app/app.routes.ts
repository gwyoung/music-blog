import { Routes } from '@angular/router';

import { AboutComponent } from './views/about/about.component';
import { AdminComponent } from './views/admin/admin.component';
import { DetailViewComponent } from './views/detail-view/detail-view.component';
import { ListViewComponent } from './views/list-view/list-view.component';
import { NotFoundComponent } from './views/error/not-found.component';

export const routes: Routes = [
    // Landing page
    {
        path: '',
        component: ListViewComponent
    },
    {
        path: 'page/:page',
        component: ListViewComponent
    },
    // Posts by artist
    {
        path: 'artist/:artist',
        component: ListViewComponent
    },
    {
        path: 'artist/:artist/page/:page',
        component: ListViewComponent
    },
    // Posts by label
    {
        path: 'label/:label',
        component: ListViewComponent
    },
    {
        path: 'label/:label/page/:page',
        component: ListViewComponent
    },
    // Posts by year
    {
        path: 'year/:year',
        component: ListViewComponent
    },
    {
        path: 'year/:year/page/:page',
        component: ListViewComponent
    },
    // Posts by genre
    {
        path: 'genre/:genre',
        component: ListViewComponent
    },
    {
        path: 'genre/:genre/page/:page',
        component: ListViewComponent
    },
    // Reviews
    {
        path: 'reviews',
        component: ListViewComponent
    },
    {
        path: 'reviews/page/:page',
        component: ListViewComponent
    },
    // Lists
    {
        path: 'lists',
        component: ListViewComponent
    },
    {
        path: 'lists/page/:page',
        component: ListViewComponent
    },
    // Recommended
    {
        path: 'fantasy',
        component: ListViewComponent
    },
    {
        path: 'fantasy/page/:page',
        component: ListViewComponent
    },
    // Headphones
    {
        path: 'headphones',
        component: ListViewComponent
    },
    {
        path: 'headphones/page/:page',
        component: ListViewComponent
    },
    // Speakers
    {
        path: 'speakers',
        component: ListViewComponent
    },
    {
        path: 'speakers/page/:page',
        component: ListViewComponent
    },
    // Search
    {
        path: 'search/:search',
        component: ListViewComponent
    },
    {
        path: 'search/:search/page/:page',
        component: ListViewComponent
    },
    // Post detail
    {
        path: 'post/:slug',
        component: DetailViewComponent
    },
    // About page
    {
        path: 'about',
        component: AboutComponent
    },
    // Admin console
    {
        path: 'admin',
        component: AdminComponent
    },
    // Admin console for edit
    {
        path: 'admin/:slug',
        component: AdminComponent
    },
    // Not found
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];