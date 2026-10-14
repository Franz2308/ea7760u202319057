import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { FooterContent } from '../footer-content/footer-content';
import { environment } from '../../../../../environments/environment';

/**
 * Main shell component that hosts top-level navigation, sidebar, and routed content.
 *
 * @author Frank Huingo - u202319057
 */
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    TranslatePipe,
    LanguageSwitcher,
    FooterContent
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  /**
   * Logo API endpoint URL from environment.
   */
  protected readonly logoUrl = environment.logoProviderApiBaseUrl;

  /**
   * Flag indicating whether logo image failed to load.
   */
  protected logoError = false;

  /**
   * Navigation options for application menu.
   */
  protected options = signal([
    { link: '/home', label: 'option.home', icon: 'home' },
    { link: '/charges/new', label: 'option.new-charge', icon: 'ev_station' }
  ]);

  /**
   * Handles image load error.
   */
  protected onLogoError(): void {
    this.logoError = true;
  }
}
