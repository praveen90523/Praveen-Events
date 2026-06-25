import Contact from "../models/Contact.js";
import sendEmail from "../utils/sendEmail.js";

// @desc    Submit a contact form request
// @route   POST /api/contact
// @access  Public
export const createContact = async (req, res, next) => {
  const { name, email, phone, message } = req.body;

  try {
    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
    });

    // Send email notification to Admin
    try {
      await sendEmail({
        email: process.env.SMTP_USER, // Send email to the admin/business account
        subject: `New Contact Form Submission from ${contact.name}`,
        message: `You have received a new contact form submission:\n\nName: ${contact.name}\nEmail: ${contact.email}\nPhone: ${contact.phone || "N/A"}\nMessage: ${contact.message}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #FF4500; border-bottom: 2px solid #FF4500; padding-bottom: 8px;">New Contact Submission</h2>
            <p><strong>From:</strong> ${contact.name} (${contact.email})</p>
            <p><strong>Phone:</strong> ${contact.phone || "N/A"}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #FF4500; border-radius: 4px;">
              ${contact.message}
            </div>
            <p style="font-size: 11px; color: #777; margin-top: 25px;">Submitted on: ${new Date(contact.createdAt).toLocaleString()}</p>
          </div>
        `,
      });
    } catch (mailError) {
      console.error("Error sending contact notification email:", mailError.message);
    }

    res.status(201).json({
      success: true,
      contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Private (Admin)
export const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    next(error);
  }
};
