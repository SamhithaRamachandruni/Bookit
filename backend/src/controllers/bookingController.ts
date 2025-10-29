import { Request, Response } from 'express';
import { Booking } from '../models/Booking';
import { Slot } from '../models/Slot';
import { sequelize } from '../config/database';

const generateReferenceId = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `HUF${result}`;
};

export const createBooking = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();

  try {
    const { slotId, userName, userEmail, quantity, subtotal, tax, discount, total, promoCode } = req.body;

    // Validate required fields
    if (!slotId || !userName || !userEmail || !quantity) {
      await transaction.rollback();
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check slot availability
    const slot = await Slot.findByPk(slotId, { transaction });
    
    if (!slot) {
      await transaction.rollback();
      return res.status(404).json({ error: 'Slot not found' });
    }

    if (slot.availableSpots < quantity) {
      await transaction.rollback();
      return res.status(400).json({ error: 'Not enough available spots' });
    }

    // Update slot availability
    slot.availableSpots -= quantity;
    await slot.save({ transaction });

    // Create booking
    const referenceId = generateReferenceId();
    const booking = await Booking.create(
      {
        slotId,
        userName,
        userEmail,
        quantity,
        subtotal,
        tax,
        discount: discount || 0,
        total,
        promoCode: promoCode || null,
        referenceId,
      },
      { transaction }
    );

    await transaction.commit();

    res.status(201).json({
      success: true,
      booking: {
        id: booking.id,
        referenceId: booking.referenceId,
        userName: booking.userName,
        userEmail: booking.userEmail,
        quantity: booking.quantity,
        total: booking.total,
      },
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};