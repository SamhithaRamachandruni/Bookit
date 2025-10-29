import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Experience extends Model {
  public id!: number;
  public title!: string;
  public location!: string;
  public description!: string;
  public image!: string;
  public basePrice!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Experience.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    basePrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'experiences',
  }
);