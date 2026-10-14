import { Component, inject } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslateService } from '@ngx-translate/core';

/**
 * Switches the active locale used by the translation service.
 *
 * @author Frank Huingo - u202319057
 */
@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [MatButtonToggleModule],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css'
})
export class LanguageSwitcher {
  protected currentLang = 'en';
  protected languages: string[];
  private translate: TranslateService;

  constructor() {
    this.translate = inject(TranslateService);
    this.currentLang = this.translate.getCurrentLang() ?? 'en';
    this.languages = this.translate.getLangs().length > 0 ? [...this.translate.getLangs()] : ['en', 'es'];
  }

  useLanguage = (language: string) => {
    this.translate.use(language);
    this.currentLang = language;
  };
}
