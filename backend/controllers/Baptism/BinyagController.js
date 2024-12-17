const Baptism = require("../../models/Binyag");
const mongoose = require("mongoose");

// exports.submitBaptismForm = async (req, res) => {
//   const { userId, baptismData } = req.body;

//   console.log("Received userId:", userId);
//   console.log("Received baptismData:", baptismData);

//   if (!userId || !baptismData) {
//     return res.status(400).json({ message: "User ID and baptism data are required." });
//   }

//   try {
//     const validUserId = mongoose.Types.ObjectId(userId);

//     // File uploads if applicable
//     const birthCertificate = req.files?.birthCertificate?.[0]?.path || "";
//     const marriageCertificate = req.files?.marriageCertificate?.[0]?.path || "";
//     const baptismPermit = req.files?.baptismPermit?.[0]?.path || "";

//     // Parse and construct new baptism data
//     const newBaptismData = {
//       userId: validUserId,
//       ...JSON.parse(baptismData), // Parse the JSON string if coming from a form-data request
//       additionalDocs: {
//         birthCertificate,
//         marriageCertificate,
//         baptismPermit,
//       },
//     };

//     // Debug the final baptism data object
//     console.log("Final baptism object to be saved:", newBaptismData);

//     // Create and save the new baptism document
//     const newBaptism = new Baptism(newBaptismData);
//     await newBaptism.save();

//     return res.status(201).json({
//       message: "Baptism form submitted successfully!",
//       baptism: newBaptism,
//     });
//   } catch (error) {
//     console.error("Error saving baptism form:", error);
//     return res.status(500).json({
//       message: "There was an error saving the baptism form.",
//       error: error.message,
//     });
//   }
// };
exports.submitBaptismForm = async (req, res) => {
  const {
    userId,
    childName,
    birthDate,
    baptismDate,
    fatherName,
    motherName,
    address,
    contactInfo,
  } = req.body;

  console.log("Received userId:", userId);
  console.log("Received form data:", req.body);

  // Validate required fields
  // if (!userId || !childName || !birthDate || !baptismDate || !fatherName || !motherName || !address || !contactNumber) {
  //   return res.status(400).json({ message: "All fields are required." });
  // }

  try {
    // Validate userId format
    const validUserId = mongoose.Types.ObjectId(userId);

    // Construct new baptism data object
    const newBaptismData = {
      userId: validUserId,
      childName: req.body.child.fullName,
      birthDate: req.body.child.dateOfBirth,
      godParentName: req.body.godparents.name,
      baptismDate,
      fatherName: req.body.parents.parents,
      motherName: req.body.parents.parents,
      address: req.body.parents.parents,
      contactInfo: req.body.parents,
    };

    // Debug the final baptism data object
    console.log("Final baptism object to be saved:", newBaptismData);

    // Create and save the new baptism document
    const newBaptism = new Baptism(req.body);
    await newBaptism.save();

    return res.status(201).json({
      message: "Baptism form submitted successfully!",
      baptism: newBaptism,
    });
  } catch (error) {
    console.error("Error saving baptism form:", error);
    return res.status(500).json({
      message: "There was an error saving the baptism form.",
      error: error.message,
    });
  }
};

exports.listBaptismForms = async (req, res) => {
  try {
    // Retrieve all baptism forms from the database
    const baptismForms = await Baptism.find().sort({ createdAt: -1 }); // Sorting by newest first

    if (baptismForms.length === 0) {
      return res.status(404).json({ message: "No baptism forms found." });
    }

    // Send the retrieved baptism forms
    return res.status(200).json({
      message: "Baptism forms retrieved successfully.",
      baptismForms,
    });
  } catch (error) {
    console.error("Error retrieving baptism forms:", error);
    return res.status(500).json({
      message: "There was an error retrieving baptism forms.",
      error: error.message,
    });
  }
};

exports.getBaptismById = async (req, res) => {
  console.log("Request ID:", req.params.id);

  try {
    const baptism = await Baptism.findById(req.params.id).populate('userId');

    if (!baptism) {
      return res.status(404).json({ message: "The baptism with the given ID was not found." });
    }

    res.status(200).json(baptism);
  } catch (error) {
    console.error("Error fetching baptism by ID:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.confirmBaptism = async (req, res) => {
  const baptismId = req.params.id;

  try {
    const baptism = await Baptism.findById(baptismId);
    if (!baptism) {
      return res.status(404).json({ message: "Baptism not found" });
    }

    baptism.binyagStatus = "Confirmed"; 
    await baptism.save();

    res.status(200).json({ message: "Baptism confirmed" });
  } catch (error) {
    console.error("Error confirming baptism:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.declineBaptism = async (req, res) => {
  try {
      const baptism = await Baptism.findByIdAndUpdate(
          req.params.id,
          { binyagStatus: 'Cancelled' },
          { new: true }
      );
      if (!baptism) return res.status(404).send('Baptism not found.');
      res.send(baptism);
  } catch (err) {
      res.status(500).send('Server error.');
  }
};

exports.getConfirmedBaptisms = async (req, res) => {
  try {
    const confirmedBaptisms = await Baptism.find({ baptismStatus: "Confirmed" });

    res.status(200).json(confirmedBaptisms);
  } catch (error) {
    console.error("Error fetching confirmed baptisms:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.addBaptismComment = async (req, res) => {
  const baptismId = req.params.id;

  try {
    const baptism = await Baptism.findById(baptismId);
    if (!baptism) {
      return res.status(404).json({ message: "Baptism not found" });
    }

    const newComment = {
      priest: req.body.priest,
      scheduledDate: req.body.scheduledDate,
      selectedComment: req.body.selectedComment,
      additionalComment: req.body.additionalComment,
    };

    baptism.comments = baptism.comments || []; // Initialize comments array if it doesn't exist
    baptism.comments.push(newComment);
    await baptism.save();

    res.status(201).json(baptism.comments);
  } catch (error) {
    console.error("Error adding comment to baptism:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getMySubmittedForms = async (req, res) => {
  try {
    const userId = req.user.id;  
    console.log("Authenticated User ID:", userId);
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }
    const forms = await Baptism.find({ userId: userId });

    if (!forms.length) {
      return res.status(404).json({ message: "No forms found for this user." });
    }
    res.status(200).json({ forms });
  } catch (error) {
    console.error("Error fetching submitted baptism forms:", error);
    res.status(500).json({ message: "Failed to fetch submitted baptism forms." });
  }
};
