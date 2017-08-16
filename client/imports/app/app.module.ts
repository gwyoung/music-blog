import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountsModule } from 'angular2-meteor-accounts-ui';
import { MyDatePickerModule } from 'mydatepicker';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { COMPONENTS_DECLARATIONS } from './components';
import { PIPES_DECLARATIONS } from './pipes';
import { VIEWS_DECLARATIONS } from './views';
import { SERVICES_PROVIDERS } from './services';
 
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        AccountsModule,
        MyDatePickerModule,
        Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ])
    ],
    declarations: [
        AppComponent,
        ...COMPONENTS_DECLARATIONS,
        ...PIPES_DECLARATIONS,
        ...VIEWS_DECLARATIONS
    ],
    providers: [
        Title,
        ...PIPES_DECLARATIONS,
        ...SERVICES_PROVIDERS
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}