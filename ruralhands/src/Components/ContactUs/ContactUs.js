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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitStatus(''), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header Section */}
        <div className="text-center pt-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Contact Us
        </h2>
        <div className="mt-6 w-32 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
            We would love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out to us through the form below or via our contact details.
          </p>
        </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-8">
          
          {/* Contact Information Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <MessageCircle className="mr-3 text-orange-600" size={32} />
              Get in Touch
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We're here to help you discover the beauty of traditional handicrafts. Whether you have questions about our products, need custom orders, or want to partner with us, we'd love to hear from you.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-xl">
                <MapPin className="text-orange-600 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Visit Our Store</h3>
                  <p className="text-gray-600 mt-1">
                    No. 45, Galle Road<br />
                    Negombo, Western Province<br />
                    Sri Lanka 11500
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-xl">
                <Phone className="text-red-600 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Call Us</h3>
                  <p className="text-gray-600 mt-1">
                    Primary: +94 31 227 8456<br />
                    WhatsApp: +94 77 123 4567
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-xl">
                <Mail className="text-orange-600 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Email Us</h3>
                  <p className="text-gray-600 mt-1">
                    General: info@ruralhands.lk<br />
                    Orders: orders@ruralhands.lk<br />
                    Support: support@ruralhands.lk
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-xl">
                <Clock className="text-red-600 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Business Hours</h3>
                  <p className="text-gray-600 mt-1">
                    Monday - Friday: 9:00 AM - 7:00 PM<br />
                    Saturday: 10:00 AM - 6:00 PM<br />
                    Sunday: 11:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          