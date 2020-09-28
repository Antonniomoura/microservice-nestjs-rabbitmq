import { Document } from 'mongoose';

export interface IProduct extends Document {
  readonly name: string;
  readonly amount: number;
  readonly qtd: number;
}