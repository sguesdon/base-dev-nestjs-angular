export interface Mission {
  _id? : string;
  libelle: string;
  dateDebut: Date;
  dateFin: Date;
  prestataire: boolean;
  description: string;
  client: string;
}

export interface Entreprise {
  _id? : string;
  nom: string;
  missions: Mission[];
}
