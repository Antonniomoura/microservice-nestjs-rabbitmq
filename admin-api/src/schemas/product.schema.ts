import * as mongoose from 'mongoose'

export const ProductSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  qtd: Number
}, { timestamps: true, collection: 'Products' });