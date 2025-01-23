const PrayerWall = require("../../models/PrayerWall/prayerWall"); 
const mongoose = require("mongoose");
const profanity = require("leo-profanity");

exports.submitPrayerRequest = async (req, res) => {
  try {
    const { title, prayerRequest, contact, prayerWallSharing } = req.body;

    if (!prayerRequest) {
      return res.status(400).json({ message: "Prayer request is required." });
    }

    if (profanity.check(prayerRequest)) {
      return res.status(400).json({ message: "Prayer request contains inappropriate language." });
    }

    const userId = req.user._id;

    const prayer = new PrayerWall({
      title: title || "Untitled",
      prayerRequest,
      contact: contact || "No contact provided",
      prayerWallSharing,
      userId,
      prayerWallStatus: "Pending",
    });

    const savedPrayer = await prayer.save();

    res.status(201).json({ success: true, prayer: savedPrayer });
  } catch (error) {
    console.error("Error submitting prayer request:", error);
    res.status(500).json({ success: false, message: "Error submitting prayer request", error: error.message });
  }
};

exports.getPendingPrayers = async (req, res) => {
  try {
    const pendingPrayers = await PrayerWall.find({ prayerWallStatus: "Pending" }).populate("userId", "name");

    if (!pendingPrayers.length) {
      return res.status(404).json({ message: "No pending prayers found." });
    }

    res.status(200).json({ prayers: pendingPrayers });
  } catch (error) {
    console.error("Error fetching pending prayers:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.confirmPrayerRequest = async (req, res) => {
  const prayerId = req.params.id;

  try {
    const prayer = await PrayerWall.findById(prayerId);

    if (!prayer) {
      return res.status(404).json({ message: "Prayer request not found." });
    }

    prayer.prayerWallStatus = "Confirmed";
    prayer.confirmedAt = new Date();

    await prayer.save();

    res.status(200).json({ message: "Prayer request confirmed.", prayer });
  } catch (error) {
    console.error("Error confirming prayer request:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getConfirmedPrayers = async (req, res) => {
  try {
    const confirmedPrayers = await PrayerWall.find({ prayerWallStatus: "Confirmed" }).populate("userId", "name");

    res.status(200).json({ prayers: confirmedPrayers });
  } catch (error) {
    console.error("Error fetching confirmed prayers:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.toggleLike = async (req, res) => {
  const prayerId = req.params.id;
  const userId = req.user._id;

  try {
    const prayer = await PrayerWall.findById(prayerId);

    if (!prayer) {
      return res.status(404).json({ message: "Prayer not found." });
    }

    const likedIndex = prayer.likedBy.indexOf(userId);

    if (likedIndex === -1) {
      prayer.likedBy.push(userId);
    } else {
      prayer.likedBy.splice(likedIndex, 1);
    }

    await prayer.save();

    res.status(200).json({ message: "Prayer like status updated.", likes: prayer.likedBy.length });
  } catch (error) {
    console.error("Error toggling like on prayer:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllPrayers = async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      // Fetch all prayers, optionally filter by status if provided
      const query = {};
      if (req.query.status) {
          query.prayerWallStatus = req.query.status; // Add filter only if status is present
      }

      const prayers = await PrayerWall.find(query)
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 });

      const total = await PrayerWall.countDocuments(query);

      res.status(200).json({
          success: true,
          prayers,
          total,
          currentPage: page,
      });
  } catch (error) {
      console.error("Error fetching prayers:", error);
      res.status(500).json({ success: false, error: error.message });
  }
};


exports.approvePrayer = async (req, res) => {
  try {
      const prayer = await PrayerWall.findByIdAndUpdate(
          req.params.id,
          { prayerWallStatus: 'Confirmed' },
          { new: true }
      );
      if (!prayer) return res.status(404).json({ success: false, message: "Prayer not found" });

      res.status(200).json({ success: true, message: "Prayer approved", prayer });
  } catch (error) {
      console.error("Error approving prayer:", error);
      res.status(500).json({ success: false, error: error.message });
  }
};

exports.rejectPrayer = async (req, res) => {
  try {
      const prayer = await PrayerWall.findByIdAndUpdate(
          req.params.id,
          { prayerWallStatus: 'Cancelled' },
          { new: true }
      );
      if (!prayer) return res.status(404).json({ success: false, message: "Prayer not found" });

      res.status(200).json({ success: true, message: "Prayer rejected", prayer });
  } catch (error) {
      console.error("Error rejecting prayer:", error);
      res.status(500).json({ success: false, error: error.message });
  }
};



