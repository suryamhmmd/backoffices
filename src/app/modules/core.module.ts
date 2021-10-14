import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    PagesModule,
    AuthModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class CoreModule {}
