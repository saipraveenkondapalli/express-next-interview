import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Announcement document
interface IAnnouncement extends Document {
    title: string;
    content: string;
    date: Date;
    author?: string;
    category?: string;
    active: boolean; 
}

// Define the schema for the Announcement
const AnnouncementSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: String },
    category: { type: String },
    active: { type: Boolean, default: true } 
});

// Create the model from the schema
const Announcement = mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);

export default Announcement;
export { IAnnouncement };