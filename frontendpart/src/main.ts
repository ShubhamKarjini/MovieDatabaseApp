import { platformBrowser } from '@angular/platform-browser';
import { App } from './app/app';
import '@angular/compiler';
import { AppModule } from './app/app-module';

platformBrowser().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
