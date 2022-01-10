import {Component, ViewChild, OnInit} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion'
import {EntrepriseService} from '../../services/entreprise.service';
import {Entreprise} from '../../interface/entreprise.interface';
import {GoogleMapService} from '../../services/googlemap.service';

@Component({
  selector: 'app-emplois',
  templateUrl: './emplois.component.html',
  styleUrls: ['./emplois.component.scss'],
  providers: [EntrepriseService]
})
export class EmploisComponent implements OnInit {

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  entreprises : Entreprise[];

  constructor(private entrepriseService: EntrepriseService, private gmap: GoogleMapService) {}

  async ngOnInit() {
    this.entreprises = await this.entrepriseService.get();
  }
}
