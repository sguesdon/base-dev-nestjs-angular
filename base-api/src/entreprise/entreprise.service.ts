import { Model, Document } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Entreprise, EntrepriseDocument } from './schema/entreprise.schema';
import { CreateEntrepriseDto } from './dto/create-entreprise.dto';
import { MongoService } from '../core/service/mongo.service';

@Injectable()
export class EntrepriseService extends MongoService<Entreprise, CreateEntrepriseDto> {
  constructor(@InjectModel(Entreprise.name) protected model: Model<EntrepriseDocument>) {
    super();
  }
}
