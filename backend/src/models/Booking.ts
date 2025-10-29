import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { Slot } from './Slot';

export class Booking extends Model {
  public id!: number;
  public slotId!: number;
  public userName!: string;
  public userEmail!: string;
  public quantity!: number;
  public subtotal!: number;
  public tax!: number;
  public discount!: number;
  public total!: number;
  public promoCode!: string | null;
  public referenceId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    slotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Slot,
        key: 'id',
      },
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tax: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    promoCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    referenceId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'bookings',
  }
);

Slot.hasMany(Booking, { foreignKey: 'slotId', as: 'bookings' });
Booking.belongsTo(Slot, { foreignKey: 'slotId' });