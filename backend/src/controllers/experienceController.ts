import { Request, Response } from 'express';
import { Experience } from '../models/Experience';
import { Slot } from '../models/Slot';

export const getAllExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await Experience.findAll();
    res.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
};

export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findByPk(id, {
      include: [
        {
          model: Slot,
          as: 'slots',
          where: { availableSpots: { [require('sequelize').Op.gt]: 0 } },
          required: false,
        },
      ],
    });

    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    res.json(experience);
  } catch (error) {
    console.error('Error fetching experience:', error);
    res.status(500).json({ error: 'Failed to fetch experience' });
  }
};