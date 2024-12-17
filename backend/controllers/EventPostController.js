const cloudinary = require('cloudinary');
const Event = require('../models/events');
const multer = require('multer');
const mongoose = require('mongoose');

// Create a new event post
exports.createEventPost = async (req, res) => {
    try {
        let images = [];

        if (req.files) {
            req.files.forEach(file => {
                images.push(file.path);
            });
        }

        if (req.file) {
            images.push(req.file.path);
        }

        if (req.body.images) {
            if (typeof req.body.images === 'string') {
                images.push(req.body.images);
            } else {
                images = images.concat(req.body.images);
            }
        }

        let imagesLinks = [];
        for (let imagePath of images) {
            try {
                const result = await cloudinary.uploader.upload(imagePath, {
                    folder: 'eparokya/event',
                    width: 150,
                    crop: "scale",
                });
                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            } catch (error) {
                console.error("Cloudinary upload error:", error);
            }
        }

        const { name, description, categories } = req.body;
        const event = new Event({
            name,
            description,
            images: imagesLinks,
        });

        const savedEvent = await event.save();
        res.status(201).json({ success: true, event: savedEvent });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating event post', error: error.message });
    }
};

exports.getAllEventPosts = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({
            success: true,
            count: events.length,
            events,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve Event posts',
            error: error.message,
        });
    }
};

exports.deleteEventPost = async (req, res) => {
    try {
        const events = await Event.findById(req.params.id);
        if (!events) {
            return res.status(404).json({
                success: false,
                message: 'Event Post not found'
            });
        }

        if (events.images && events.images.length > 0) {
            for (const image of events.images) {
                await cloudinary.uploader.destroy(image.public_id);
            }
        }

        await Event.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Event Post and images deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

exports.updateEventPost = async (req, res) => {
    try {
        const eventId = req.params.id;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event Post not found'
            });
        }

        let imagesLinks = [];

        if (req.files || req.file || req.body.images) {

            if (event.images && event.images.length > 0) {
                for (const image of event.images) {
                    await cloudinary.uploader.destroy(image.public_id);
                }
            }

            let newImages = [];

            if (req.files) {
                req.files.forEach(file => {
                    newImages.push(file.path);
                });
            }

            if (req.file) {
                newImages.push(req.file.path);
            }

            if (req.body.images) {
                if (typeof req.body.images === 'string') {
                    newImages.push(req.body.images);
                } else {
                    newImages = newImages.concat(req.body.images);
                }
            }

            for (let imagePath of newImages) {
                try {
                    const result = await cloudinary.uploader.upload(imagePath, {
                        folder: 'eparokya/event',
                        width: 150,
                        crop: "scale",
                    });
                    imagesLinks.push({
                        public_id: result.public_id,
                        url: result.secure_url,
                    });
                } catch (error) {
                    console.error("Cloudinary upload error:", error);
                }
            }
        } else {
            imagesLinks = event.images;
        }

        event.name = req.body.name || event.name;
        event.description = req.body.description || event.description;
        event.images = imagesLinks;

        const updatedEvent = await event.save();

        res.status(200).json({
            success: true,
            message: 'Event Post updated successfully',
            event: updatedEvent
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

exports.getSingleEventPost = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event Post not found'
            });
        }

        res.status(200).json({
            success: true,
            event
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// Get paginated events
exports.getEvents = async (req, res) => {
    try {
        const resPerPage = 4;
        const page = Number(req.query.page) || 1;
        const eventsCount = await Event.countDocuments();

        const events = await Event.find()
            .skip(resPerPage * (page - 1))
            .limit(resPerPage);

        res.status(200).json({
            success: true,
            count: events.length,
            eventsCount,
            events,
            resPerPage,
            currentPage: page,
            totalPages: Math.ceil(eventsCount / resPerPage)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve events',
            error: error.message,
        });
    }
};
