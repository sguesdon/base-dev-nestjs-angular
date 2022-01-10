import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {

  private sub: any;
  public loggedIn: boolean;
  private defaultTitle!: string;

  @Input()
  header!: string;

  @Output()
  toggleMenu = new EventEmitter();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    public keycloakService: KeycloakService
  ) {}

  /**
  * Dispatch toggleMenu event.
  */
  onToggleMenu() {
    this.toggleMenu.emit();
  }

  async ngOnInit() {
    // Use default header as the document title or a fallback for toolbar title
    this.defaultTitle = this.header;

    // Get initial title on page load
    this.getPageTitle();
    this.sub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.getPageTitle());

    this.loggedIn = await this.keycloakService.isLoggedIn();
  }

  private getPageTitle(): void {
    let parentRouteTitle;
    let snapshot = this.route.snapshot;
    let activated = this.route.firstChild;
    if (activated != null) {
      while (activated != null) {
        // Get title for the current route, if case child is missing rote data, use parent title.
        parentRouteTitle = snapshot.data['title'] || parentRouteTitle;

        snapshot = activated.snapshot;
        activated = activated.firstChild;
      }
    }

    // Set header, fallback to default title if data not set on route
    let title = snapshot.data['title'] || parentRouteTitle;

    // If any custom title is set, use it
    this.header = title ? `${this.defaultTitle} - ${title}` : this.defaultTitle;
    this.titleService.setTitle(this.header)
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
