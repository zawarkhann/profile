import { useState } from "react";
import { motion } from "framer-motion";
import Toast from "./Toast";
import emailjs from '@emailjs/browser';


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "", // Anti-spam
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Anti-spam honeypot
  if (formData.honeypot) return;

  // Validate form
  const newErrors = validateForm();
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setIsSubmitting(true);
  setErrors({});

  try {
    // ✅ Send email via EmailJS
    await emailjs.send(
      "service_j14k4sc",       // Your Service ID
      "template_fvhcevq",      // Your Template ID
      {
        name: formData.name,      // matches {{name}} in template
        email: formData.email,    // matches {{email}}
        message: formData.message // matches {{message}}
      },
      "B2FvTzdtga0J0fr3P"      // Your Public Key
    );

    // ✅ Success
    setToast({
      type: "success",
      message: "Message sent successfully! You'll receive a confirmation email.",
    });

    await emailjs.send(
      "service_j14k4sc",       // Your Service ID
      "template_49b3wve",      // Your Template ID
      {
        name: formData.name,      // matches {{name}} in template
        email: formData.email,    // matches {{email}}
        message: formData.message // matches {{message}}
      },
      "B2FvTzdtga0J0fr3P"      // Your Public Key
    );

 
    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
      honeypot: "",
    });
  } catch (error) {
    console.error("EmailJS Error:", error);
    setToast({
      type: "error",
      message: "Failed to send message. Please try again.",
    });
  } finally {
    setIsSubmitting(false);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot field (hidden) */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-600 focus:ring-accent-500"
            } dark:bg-gray-800 focus:ring-2 focus:border-transparent transition-all`}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-600 focus:ring-accent-500"
            } dark:bg-gray-800 focus:ring-2 focus:border-transparent transition-all`}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.message
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-600 focus:ring-accent-500"
            } dark:bg-gray-800 focus:ring-2 focus:border-transparent transition-all resize-none`}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-sm text-red-500">
              {errors.message}
            </p>
          )}
        </div>

        {/* reCAPTCHA placeholder */}
        {/* TODO: Add reCAPTCHA integration
        <div className="flex justify-center">
          <div id="recaptcha-container"></div>
        </div>
        */}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className={`w-full py-3 px-6 rounded-xl font-medium transition-all ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-accent-600 hover:bg-accent-700 text-white"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </span>
          ) : (
            "Send Message"
          )}
        </motion.button>
      </form>

      {/* Toast Notification */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default ContactForm;
