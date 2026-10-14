import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Displays localized footer text and authorship details.
 *
 * @author Frank Huingo - u202319057
 */
@Component({
  selector: 'app-footer-content',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './footer-content.html',
  styleUrl: './footer-content.css'
})
export class FooterContent {}
