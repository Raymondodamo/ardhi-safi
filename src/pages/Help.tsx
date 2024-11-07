import React, { useState } from 'react';
import { MessageSquare, Phone, HelpCircle } from 'lucide-react';
import LiveChatModal from '../components/help/LiveChatModal';

const Help = () => {
  const [showChat, setShowChat] = useState(false);

  const faqs = [
    {
      question: 'How do I verify my property documents?',
      answer: 'To verify your property documents, upload them through the Documents section. Our team will review and verify them within 48 hours.'
    },
    {
      question: 'What happens if there\'s a legal dispute?',
      answer: 'Our legal team will assist in resolving any property disputes. Contact our support team immediately for guidance.'
    },
    {
      question: 'How can I become a verified broker?',
      answer: 'Submit your credentials through the Brokers section. We\'ll verify your information and approve your account within 5 business days.'
    }
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Help & Support</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <MessageSquare className="h-8 w-8 text-emerald-600 mb-4" />
            <h2 className="text-lg font-medium text-gray-900 mb-2">Live Chat</h2>
            <p className="text-gray-600 mb-4">Chat with our support team in real-time</p>
            <button 
              onClick={() => setShowChat(true)}
              className="btn-primary w-full"
            >
              Start Chat
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Phone className="h-8 w-8 text-emerald-600 mb-4" />
            <h2 className="text-lg font-medium text-gray-900 mb-2">Phone Support</h2>
            <p className="text-gray-600 mb-4">Call us at +255 123 456 789</p>
            <button className="btn-primary w-full">Call Now</button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <HelpCircle className="h-8 w-8 text-emerald-600 mb-4" />
            <h2 className="text-lg font-medium text-gray-900 mb-2">Documentation</h2>
            <p className="text-gray-600 mb-4">Browse our comprehensive guides</p>
            <button className="btn-primary w-full">View Guides</button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {faqs.map((faq) => (
              <div key={faq.question} className="px-6 py-5">
                <h3 className="text-base font-medium text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {showChat && <LiveChatModal onClose={() => setShowChat(false)} />}
      </div>
    </div>
  );
};

export default Help;