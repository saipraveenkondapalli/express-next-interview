import { Request, Response } from 'express';
import Announcement from '../models/announcement.model';



export const getActiveAnnouncements = async (req: Request, res: Response) => {
    try {
        const announcements = await Announcement.find({ active: true });
        return res.json(announcements);
    } catch (e) {
        return res.status(500).json({ message: e });
    }
}



export const postActiveAnnouncement = async (req: Request, res: Response) => {
    try {
        const { title, content, date, author, category, active } = req.body;

        // Validate the required fields
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required.' });
        }

        // Create a new announcement document
        const newAnnouncement = new Announcement({
            title,
            content,
            date: date || new Date(),
            author,
            category,
            active: active !== undefined ? active : true // Default to true if not provided
        });

        // Save the announcement to the database
        const savedAnnouncement = await newAnnouncement.save();

        // Send a success response
        return res.status(201).json(savedAnnouncement);
    } catch (error) {
        // Handle any errors
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};