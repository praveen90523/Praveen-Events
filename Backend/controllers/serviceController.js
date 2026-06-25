import Service from "../models/Service.js";

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find({});
    res.json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a service
// @route   POST /api/services
// @access  Private (Admin)
export const createService = async (req, res, next) => {
  const { title, img, desc, path, offerings } = req.body;

  try {
    const serviceExists = await Service.findOne({ title });

    if (serviceExists) {
      res.status(400);
      return next(new Error("Service already exists"));
    }

    const service = await Service.create({
      title,
      img,
      desc,
      path: path || `/${title.toLowerCase().replace(/\s+/g, "-")}`,
      offerings: offerings || [],
    });

    res.status(201).json({
      success: true,
      service,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private (Admin)
export const updateService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      res.status(404);
      return next(new Error("Service not found"));
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      service: updatedService,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private (Admin)
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      res.status(404);
      return next(new Error("Service not found"));
    }

    await service.deleteOne();
    res.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
