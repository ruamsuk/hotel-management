import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SharedModule],
  template: `
    <p-toast [style]="{marginTop: '64px'}"/>
    <p-confirmDialog/>
    <h1>Welcome to {{ title }}!</h1>

    <router-outlet/>
  `,
  styles: [],
})
export class AppComponent {
  title = 'hotel-management';
}
