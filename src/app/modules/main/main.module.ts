import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { NoSidebarLayoutComponent } from './layout/no-sidebar-layout/no-sidebar-layout.component';
import { HeaderComponent } from './layout/common/header/header.component';
import { SidebarComponent } from './layout/common/sidebar/sidebar.component';
import { FooterComponent } from './layout/common/footer/footer.component';
import { MainRoutingModule } from './main-routing.module';
import { MessageService } from '../../services/message.service';

@NgModule({
  declarations: [
    MainLayoutComponent,
    NoSidebarLayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainRoutingModule
  ],
  providers: [MessageService]
})
export class MainModule { }
