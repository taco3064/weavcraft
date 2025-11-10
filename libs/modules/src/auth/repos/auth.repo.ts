import { RefreshTokenData } from '@weavcraft/common';
import {
  BaseMongoClient,
  refreshTokenSchema,
  TTL_IDX_REFRESH_TOKEN,
} from '@weavcraft/repos';
import { Model } from 'mongoose';
import { inject, injectable } from 'tsyringe';
import { INJECT_MONGO_CLIENT } from '../../const';
import * as moment from 'moment';
import { v4 } from 'uuid';

const defaultConfig = {
  refreshTokenExpired: 3600,
};

@injectable()
export class RefreshTokenRepository {
  private model: Model<RefreshTokenData> =
    this.mongoClient.connection.model<RefreshTokenData>(
      'refreshToken',
      refreshTokenSchema
    );
  constructor(
    @inject(INJECT_MONGO_CLIENT)
    private readonly mongoClient: BaseMongoClient
  ) {}

  async setRefreshTokenTTLIndex(
    refreshTokenExpired: number = defaultConfig.refreshTokenExpired
  ) {
    const duration = moment.duration(refreshTokenExpired, 'seconds');
    const expireAfterSeconds = duration.asSeconds();
    if (!this.mongoClient.connection.db) {
      throw new Error('Database connection not established');
    }
    const collections = await this.mongoClient.connection.db
      .listCollections()
      .toArray();
    const exists = collections.some((c) => c.name === 'refreshToken');
    const existsTTLIndex = await this.model.collection.indexExists(
      TTL_IDX_REFRESH_TOKEN
    );
    if (exists || existsTTLIndex) {
      await this.model.collection.dropIndex(TTL_IDX_REFRESH_TOKEN);
    }
    await this.model.collection.createIndex(
      { createdAt: 1 },
      {
        expireAfterSeconds: expireAfterSeconds,
        name: TTL_IDX_REFRESH_TOKEN,
        background: true,
      }
    );
  }

  async findOneByToken(refreshToken: string) {
    const data = await this.model.findOne({ refreshToken });
    return data?.toJSON() ?? null;
  }

  async deleteByToken(
    refreshToken: string
  ): Promise<{ acknowledged: boolean; deletedCount: number }> {
    return this.model.deleteOne({ refreshToken });
  }

  async findAll() {
    const data = await this.model.find();
    return data.map((d) => d.toJSON());
  }

  async createRefreshToken(userId: string) {
    const model = new this.model({
      userId,
      refreshToken: v4(),
    });
    await model.save();
    return model.refreshToken;
  }
}
