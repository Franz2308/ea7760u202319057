import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Displays fallback content for unknown routes.
 *
 * @author Frank Huingo - u202319057
 */
@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [MatButton, TranslatePipe],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css'
})
export class PageNotFound implements OnInit {
  protected invalidPath = '';
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.invalidPath = this.route.snapshot.url.map(url => url.path).join('/') || this.router.url;
  }

  protected navigateToHome(): void {
    this.router.navigate(['home']).then();
  }
}
