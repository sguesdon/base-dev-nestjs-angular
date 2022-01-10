import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { Type } from 'class-transformer';
import { ValidateNested, IsObject, IsArray } from 'class-validator';


@Schema()
class Location {
  @Prop()
  type: string;
  @Prop()
  coordinates: number[];
}

@Schema()
class Mission {
  @Prop({required: true})
  dateDebut: Date;
  @Prop({required: true})
  prestataire: boolean;
  @Prop({required: true})
  libelle: string;
  @Prop({required: true})
  description: string;
  @Prop(Location)
  location: Location;
  @Prop()
  dateFin: Date;
  @Prop()
  client: string;
}

@Schema()
export class Entreprise extends Document {
  @Prop({required: true, es_indexed: true})
  nom: string;
  @Prop([Mission])
  missions: Mission[];
  @Prop(Location)
  location: Location;
};

export type EntrepriseDocument = Entreprise & Document;
export const EntrepriseSchema = SchemaFactory.createForClass(Entreprise);
