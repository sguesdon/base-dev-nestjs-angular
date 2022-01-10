import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entreprise } from '../../../interface/entreprise.interface';

@Component({
  selector: 'app-edition-emplois',
  templateUrl: './edition-emplois.component.html',
  styleUrls: ['./edition-emplois.component.scss']
})
export class EditionEmploisComponent implements OnInit {

  private entreprise: Entreprise;
  
  constructor(private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.entreprise = response.entreprise;
    });
  }
}
