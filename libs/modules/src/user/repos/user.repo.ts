import { User, UserData } from '@weavcraft/common';
import { userSchema, BaseMongoClient } from '@weavcraft/repos';
import { FilterQuery, Model } from 'mongoose';
import { inject, injectable } from 'tsyringe';
import { INJECT_MONGO_CLIENT } from '../../const';
import { DeleteResult } from 'mongodb';

@injectable()
export class UserRepository {
  private model: Model<UserData> = this.mongoClient.connection.model<UserData>(
    'user',
    userSchema
  );
  constructor(
    @inject(INJECT_MONGO_CLIENT)
    private readonly mongoClient: BaseMongoClient
  ) {}

  async findById(id: string): Promise<UserData | null> {
    const data = await this.model.findById(id);
    return data?.toJSON() ?? null;
  }

  async findByQuery(filter: FilterQuery<UserData>): Promise<UserData[]> {
    const data = await this.model.find(filter);
    return data.map((d) => d.toJSON());
  }

  async create(data: User): Promise<UserData> {
    const created = await this.model.create(data);
    return created.toJSON();
  }

  async updateById(id: string, data: User): Promise<UserData | null> {
    const updated = await this.model.findByIdAndUpdate(id, data);
    return updated?.toJSON() ?? null;
  }

  async deleteById(id: string): Promise<DeleteResult | null> {
    const data = await this.model.findById(id);
    if (!data) {
      return null;
    }
    return data.deleteOne();
  }
}
