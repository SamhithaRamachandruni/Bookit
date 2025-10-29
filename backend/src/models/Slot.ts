import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { Experience } from './Experience';

export class Slot extends Model {
  public id!: number;
  public experienceId!: number;
  public date!: string;
  public time!: string;
  public availableSpots!: number;
  public totalSpots!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Slot.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    experienceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Experience,
        key: 'id',
      },
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    availableSpots: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalSpots: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'slots',
  }
);

Experience.hasMany(Slot, { foreignKey: 'experienceId', as: 'slots' });
Slot.belongsTo(Experience, { foreignKey: 'experienceId' });