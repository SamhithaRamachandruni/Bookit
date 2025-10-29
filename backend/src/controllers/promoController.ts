import { Request, Response } from 'express';

const promoCodes: { [key: string]: { type: 'percentage' | 'fixed'; value: number } } = {
  SAVE10: { type: 'percentage', value: 10 },
  FLAT100: { type: 'fixed', value: 100 },
};

export const validatePromo = async (req: Request, res: Response) => {
  try {
    const { code, subtotal } = req.body;

    if (!code || !subtotal) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const promo = promoCodes[code.toUpperCase()];

    if (!promo) {
      return res.status(404).json({ valid: false, error: 'Invalid promo code' });
    }

    let discount = 0;
    if (promo.type === 'percentage') {
      discount = Math.floor((subtotal * promo.value) / 100);
    } else {
      discount = promo.value;
    }

    res.json({
      valid: true,
      discount,
      type: promo.type,
      value: promo.value,
    });
  } catch (error) {
    console.error('Error validating promo:', error);
    res.status(500).json({ error: 'Failed to validate promo code' });
  }
};