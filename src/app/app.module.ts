import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { MenuprofileComponent } from './menuprofile/menuprofile.component';
import { ProfileformComponent } from './profileform/profileform.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { MyaddressComponent } from './myaddress/myaddress.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { OrderdetailComponent } from './orderdetail/orderdetail.component';
import { RouterModule, Routes } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { HttpClientModule } from '@angular/common/http';
import { SharingService } from './service/sharing.service';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  }
  ,
  {
    path: 'login',
    component: ModalComponent,
    outlet: 'modal'
  },
  {
    path: 'profile',
    component: ProfileformComponent,
  },
  {
    path: 'address',
    component: MyaddressComponent,
  },
  {
    path: 'order',
    component: OrderlistComponent,
  },
  {
    path: 'favorite',
    component: FavoriteComponent,
  },
  {
    path: 'detail',
    component: OrderdetailComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    BreadcrumbsComponent,
    MenuprofileComponent,
    ProfileformComponent,
    FooterComponent,
    MyaddressComponent,
    OrderlistComponent,
    FavoriteComponent,
    OrderdetailComponent,
    ModalComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [SharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
