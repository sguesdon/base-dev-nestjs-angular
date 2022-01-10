class Location {
  readonly type: string;
  readonly coordinates: Number[];
}

class Mission {
  readonly dateDebut: Date;
  readonly dateFin: Date;
  readonly prestataire: boolean;
  readonly client: string;
  readonly location: Location;
  readonly libelle: string;
  readonly description: string;
}

export class CreateEntrepriseDto {
  readonly nom: string;
  readonly missions: Mission[];
  readonly location: Location;
}
