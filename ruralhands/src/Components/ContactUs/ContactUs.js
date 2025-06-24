import { Clock, Facebook, Globe, Instagram, Mail, MapPin, MessageCircle, Palette, Phone, Send, Star, Twitter } from 'lucide-react';
import { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="text-center pt-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Contact Us</h2>
        <div className="mt-6 w-32 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
          We would love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out to us through the form below or via our contact details.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-8">

          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <MessageCircle className="mr-3 text-orange-600" size={32} />
              Get in Touch
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We're here to help you discover the beauty of traditional handicrafts...
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-xl">
                <MapPin className="text-orange-600 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Visit Our Store</h3>
                  <p className="text-gray-600 mt-1">No. 45, Galle Road, Negombo, Sri Lanka 11500</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-xl">
                <Phone className="text-red-600 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Call Us</h3>
                  <p className="text-gray-600 mt-1">Primary: +94 70 227 8456<br />WhatsApp: +94 77 123 4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-xl">
                <Mail className="text-orange-600 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Email Us</h3>
                  <p className="text-gray-600 mt-1">info@ruralhands.lk</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-xl">
                <Clock className="text-red-600 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Business Hours</h3>
                  <p className="text-gray-600 mt-1">24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Follow Our Journey</h3>
            <div className="flex space-x-4">
              <a href="https://instagram.com/ruralhands_lk" target="_blank" rel="noreferrer" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 rounded-full hover:scale-110 transition">
                <Instagram size={24} />
              </a>
              <a href="https://facebook.com/ruralhandslk" target="_blank" rel="noreferrer" className="bg-blue-600 text-white p-3 rounded-full hover:scale-110 transition">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com/ruralhands_lk" target="_blank" rel="noreferrer" className="bg-blue-400 text-white p-3 rounded-full hover:scale-110 transition">
                <Twitter size={24} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Send us a Message</h2>
            <p className="text-gray-600 mb-8 text-lg">Fill out the form below and we'll get back to you within 24 hours.</p>

            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl mb-6 flex items-center">
                <Send className="mr-2" size={20} />
                Thank you! Your message has been sent successfully.
              </div>
            )}

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 text-gray-700"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 text-gray-700"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 text-gray-700"
                    placeholder="+94 77 123 4567"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 text-gray-700"
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="custom-order">Custom Order</option>
                    <option value="wholesale">Wholesale Partnership</option>
                    <option value="artisan-collaboration">Artisan Collaboration</option>
                    <option value="support">Customer Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 text-gray-700 resize-none"
                  placeholder="Tell us about your requirements or questions..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                onClick={(e) => {
                  e.preventDefault();
                  const subject = encodeURIComponent('Inquiry from RURALHANDS Website');
                  const body = encodeURIComponent(
                    `Hello RURALHANDS Team,\n\n` +
                    `You have a new message from the contact form:\n\n` +
                    `Name: ${formData.name}\n` +
                    `Email: ${formData.email}\n` +
                    `Phone: ${formData.phone}\n` +
                    `Subject: ${formData.subject}\n` +
                    `Message:\n${formData.message}\n\n` +
                    `Best regards,\n${formData.name}`
                  );
                  window.open(`mailto:yukthijeewantha@gmail.com?subject=${subject}&body=${body}`, '_self');
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 px-8 rounded-xl hover:from-orange-600 hover:to-red-600 transition transform hover:scale-105 shadow-lg disabled:opacity-50 flex items-center justify-center text-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Opening Gmail...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Mail className="mr-2" size={20} />
                    Send Message
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-8 text-gray-800">
            <h3 className="text-3xl font-bold mb-4 text-orange-600 text-center">Why Choose RURALHANDS?</h3>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="bg-orange-200 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Palette className="text-orange-700" size={32} />
                </div>
                <h4 className="font-semibold text-xl mb-3 text-orange-800">Authentic Craftsmanship</h4>
                <p className="text-gray-700 text-lg">Handcrafted by skilled artisans with generations of tradition.</p>
              </div>
              <div className="text-center">
                <div className="bg-red-200 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Globe className="text-red-700" size={32} />
                </div>
                <h4 className="font-semibold text-xl mb-3 text-red-800">Supporting Communities</h4>
                <p className="text-gray-700 text-lg">Every purchase supports local rural artisans and families.</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-200 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Star className="text-orange-700" size={32} />
                </div>
                <h4 className="font-semibold text-xl mb-3 text-orange-800">Premium Quality</h4>
                <p className="text-gray-700 text-lg">Each item is unique and made with the highest attention to detail.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;
