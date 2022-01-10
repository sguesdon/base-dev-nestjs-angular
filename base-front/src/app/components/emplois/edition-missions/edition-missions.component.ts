import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edition-missions',
  templateUrl: './edition-missions.component.html',
  styleUrls: ['./edition-missions.component.scss']
})
export class EditionMissionsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot);
  }

}
