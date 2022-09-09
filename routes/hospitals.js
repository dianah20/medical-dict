const router = require("express").Router();
const Hospital = require("../models/Hospital");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("./jwtoken");

// CREATE A HOSPITAL*****************************
router.post("/", verifyToken, async (req, res) => {
  const hospital = new Hospital({
    name: req.body.name,
    tel: req.body.tel,
    email: req.body.email,
    location: req.body.location,
    desc: req.body.desc,
    image: req.body.image
  });
  try {
    const savedHospital = await hospital.save();
    return res.status(201).json({
      message: "Success, hospital created successfully",
      savedHospital,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// UPDATE*****************************
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedHospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Hospital updated succesfully", updatedHospital });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// DELETE *****************************
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Hospital.findByIdAndDelete(req.params.id);
    return res.status(200).json("Hospital has been deleted...");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET A HOSPITAL*****************************
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    res.status(200).json(hospital);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL HOSPITALS*****************************
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const {q} = req.query;
  try {
    const hospital = q
      ? await Hospital.find().sort({ _id: -1 }).limit(5)
      : await Hospital.find();
    res.status(200).json(hospital);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
