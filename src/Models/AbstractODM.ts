import { Model, models, Schema, model, UpdateQuery } from 'mongoose';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async findAll(): Promise<T[]> {
    return this.model.find({});
  }

  public async findById(id: string): Promise<T | null> {
    return this.model.findById({ _id: id });
  }

  public async updateById(_id: string, obj: UpdateQuery<T>): Promise<null | T> {
    return this.model.findByIdAndUpdate(_id, obj, { new: true });
  }

  public async deleteById(_id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(_id);
  }
}

export default AbstractODM;