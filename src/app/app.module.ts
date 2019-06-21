import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { FilterPipeModule } from 'ngx-filter-pipe';

import { fakeBackendProvider } from './_helpers';
import { JwtInterceptor } from './_helpers';
import { AuthenticationService, AuthGuard } from './_services';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CreatePostComponent } from './admin-panel/create-post/create-post.component';
import { NewPostComponent } from './new-post/new-post.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarNewPostComponent } from './sidebar/sidebar-new-post/sidebar-new-post.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminPanelComponent,
    CreatePostComponent,
    NewPostComponent,
    HeaderComponent,
    BreadcrumbComponent,
    FooterComponent,
    SidebarComponent,
    SidebarNewPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FilterPipeModule,
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      fakeBackendProvider,
      // AuthenticationService,
      // AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
