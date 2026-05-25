// import { useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { FiSend } from 'react-icons/fi';

// const ContactForm = () => {
//   // State for form fields
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [subject, setSubject] = useState('General Consultation');
//   const [message, setMessage] = useState('');
//   const [submitting, setSubmitting] = useState(false);

//   // Form submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // 1. Client-side Validation
//     if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
//       toast.error('Please fill in all required fields.');
//       return;
//     }

//     if (name.trim().length < 2) {
//       toast.error('Name must be at least 2 characters.');
//       return;
//     }

//     if (message.trim().length < 10) {
//       toast.error('Message must be at least 10 characters.');
//       return;
//     }

//     // Phone regex validation
//     const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;
//     if (!phoneRegex.test(phone.trim())) {
//       toast.error('Please enter a valid phone number.');
//       return;
//     }

//     setSubmitting(true);
//     const loadingToast = toast.loading('Transmitting consultation request...');

//     try {
//       const payload = {
//         name: name.trim(),
//         email: email.trim(),
//         phone: phone.trim(),
//         subject,
//         message: message.trim(),
//       };

//       console.log('[ContactForm] Submitting payload:', payload);

//       const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
//       const response = await axios.post(`${apiBase}/api/contacts`, payload);

//       console.log('[ContactForm] Response received:', response.data);

//       toast.dismiss(loadingToast);
//       toast.success('Thank you! Your consult request has been registered and sent.');

//       // Reset form fields on success
//       setName('');
//       setEmail('');
//       setPhone('');
//       setSubject('General Consultation');
//       setMessage('');

//     } catch (error) {
//       console.error('[ContactForm] Error submitting form:', error);
//       toast.dismiss(loadingToast);

//       const errorMessage = error.response?.data?.message || 'Submission failed. Saved copy locally on server database.';
//       toast.error(errorMessage);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="glass-card rounded-[40px] p-8 border border-slate-100 dark:border-slate-800/60 shadow-xl space-y-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md">
//       <div className="space-y-1.5">
//         <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">Request Consultation</h3>
//         <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
//           Our regional coordinator will respond within 4 hours to arrange an official architectural presentation.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-semibold text-slate-700 dark:text-slate-350">
//         {/* Name */}
//         <div className="space-y-1.5 sm:col-span-2">
//           <label htmlFor="full-name-input" className="tracking-wide">FULL NAME</label>
//           <input
//             id="full-name-input"
//             type="text"
//             placeholder="Enter your name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full px-4 py-3.5 rounded-xl bg-white/70 dark:bg-slate-950/65 border border-slate-200/60 dark:border-slate-800/80 focus:border-primary focus:ring-1 focus:ring-primary text-slate-800 dark:text-white outline-none font-normal transition-all"
//             required
//             disabled={submitting}
//           />
//         </div>

//         {/* Email */}
//         <div className="space-y-1.5">
//           <label htmlFor="email-address-input" className="tracking-wide">EMAIL ADDRESS</label>
//           <input
//             id="email-address-input"
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-3.5 rounded-xl bg-white/70 dark:bg-slate-950/65 border border-slate-200/60 dark:border-slate-800/80 focus:border-primary focus:ring-1 focus:ring-primary text-slate-800 dark:text-white outline-none font-normal transition-all"
//             required
//             disabled={submitting}
//           />
//         </div>

//         {/* Phone */}
//         <div className="space-y-1.5">
//           <label htmlFor="phone-number-input" className="tracking-wide">MOBILE NUMBER</label>
//           <input
//             id="phone-number-input"
//             type="tel"
//             placeholder="Enter phone number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="w-full px-4 py-3.5 rounded-xl bg-white/70 dark:bg-slate-950/65 border border-slate-200/60 dark:border-slate-800/80 focus:border-primary focus:ring-1 focus:ring-primary text-slate-800 dark:text-white outline-none font-normal transition-all"
//             required
//             disabled={submitting}
//           />
//         </div>

//         {/* Subject / Inquiry Type */}
//         <div className="space-y-1.5 sm:col-span-2">
//           <label htmlFor="subject-input" className="tracking-wide">INQUIRY SUBJECT</label>
//           <select
//             id="subject-input"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             className="w-full px-4 py-3.5 rounded-xl bg-white/70 dark:bg-slate-950/65 border border-slate-200/60 dark:border-slate-800/80 focus:border-primary focus:ring-1 focus:ring-primary text-slate-800 dark:text-white outline-none font-normal cursor-pointer transition-all"
//             disabled={submitting}
//           >
//             <option value="General Consultation">General Consultation Inquiry</option>
//             <option value="Luxury Gated Villas">Luxury Gated Villas</option>
//             <option value="Corporate Offices & Towers">Corporate Offices & Towers</option>
//             <option value="AI Voice-Automated Condos">AI Voice-Automated Condos</option>
//             <option value="Bespoke Architectural Interiors">Bespoke Architectural Interiors</option>
//             <option value="Heritage Restoration Upgrades">Heritage Restoration Upgrades</option>
//           </select>
//         </div>

//         {/* Message */}
//         <div className="space-y-1.5 sm:col-span-2">
//           <label htmlFor="message-detail-input" className="tracking-wide">DETAILED MESSAGE</label>
//           <textarea
//             id="message-detail-input"
//             rows={5}
//             placeholder="Describe your inquiry details..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="w-full px-4 py-3.5 rounded-xl bg-white/70 dark:bg-slate-950/65 border border-slate-200/60 dark:border-slate-800/80 focus:border-primary focus:ring-1 focus:ring-primary text-slate-800 dark:text-white outline-none font-normal leading-relaxed resize-none transition-all"
//             required
//             disabled={submitting}
//           ></textarea>
//         </div>

//         {/* Submit button with spinner */}
//         <div className="sm:col-span-2 pt-2">
//           <button
//             type="submit"
//             disabled={submitting}
//             className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-[#9E7CFF] hover:from-primary-dark hover:to-primary text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-primary/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
//           >
//             {submitting ? (
//               <>
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Transmitting inquiry...
//               </>
//             ) : (
//               <>
//                 <FiSend size={14} />
//                 Send Consultation Request
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ContactForm;
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiSend } from 'react-icons/fi';

const ContactForm = () => {
  // ==========================================
  // STATES
  // ==========================================
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Consultation');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // ==========================================
  // API BASE URL
  // ==========================================
  const apiBase =
    import.meta.env.VITE_API_BASE ||
    'https://arkhe-yf8z.onrender.com';

  // ==========================================
  // FORM SUBMIT
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // =========================
    // VALIDATION
    // =========================
    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !message.trim()
    ) {
      toast.error('Please fill all required fields.');
      return;
    }

    if (name.trim().length < 2) {
      toast.error(
        'Name must be at least 2 characters.'
      );
      return;
    }

    if (message.trim().length < 10) {
      toast.error(
        'Message must be at least 10 characters.'
      );
      return;
    }

    // =========================
    // PHONE VALIDATION
    // =========================
    const phoneRegex =
      /^[+]?[()]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

    if (!phoneRegex.test(phone.trim())) {
      toast.error(
        'Please enter a valid phone number.'
      );
      return;
    }

    setSubmitting(true);

    const loadingToast = toast.loading(
      'Transmitting consultation request...'
    );

    try {
      // =========================
      // PAYLOAD
      // =========================
      const payload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject: subject.trim(),
        message: message.trim(),
      };

      console.log(
        '[ContactForm] Submitting payload:',
        payload
      );

      // =========================
      // API REQUEST
      // =========================
      const response = await axios.post(
        `${apiBase}/api/contacts`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      console.log(
        '[ContactForm] Response:',
        response.data
      );

      // =========================
      // SUCCESS
      // =========================
      toast.dismiss(loadingToast);

      toast.success(
        'Thank you! Your consultation request has been submitted successfully.'
      );

      // Reset Form
      setName('');
      setEmail('');
      setPhone('');
      setSubject('General Consultation');
      setMessage('');
    } catch (error) {
      console.error(
        '[ContactForm] Error submitting form:',
        error
      );

      toast.dismiss(loadingToast);

      const errorMessage =
        error.response?.data?.message ||
        'Submission failed. Please try again later.';

      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================
  return (
    <div className="glass-card rounded-[40px] p-8 border border-slate-100 dark:border-slate-800/60 shadow-xl space-y-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md">
      
      {/* Heading */}
      <div className="space-y-1.5">
        <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
          Request Consultation
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
          Our regional coordinator will contact you shortly.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-semibold text-slate-700 dark:text-slate-300"
      >
        {/* NAME */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="tracking-wide">
            FULL NAME
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            disabled={submitting}
            required
            className="w-full px-4 py-3.5 rounded-xl bg-white/70 dark:bg-slate-950/65 border border-slate-200/60 dark:border-slate-800/80 focus:border-primary focus:ring-1 focus:ring-primary text-slate-800 dark:text-white outline-none font-normal transition-all"
          />
        </div>

        {/* EMAIL */}
        <div className="space-y-1.5">
          <label className="tracking-wide">
            EMAIL ADDRESS
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            disabled={submitting}
            required
            className="w-full px-4 py-3.5 rounded-xl bg-white/70 dark:bg-slate-950/65 border border-slate-200/60 dark:border-slate-800/80 focus:border-primary focus:ring-1 focus:ring-primary text-slate-800 dark:text-white outline-none font-normal transition-all"
          />
        </div>

        {/* PHONE */}
        <div className="space-y-1.5">
          <label className="tracking-wide">
            MOBILE NUMBER
          </label>

          <input
            type="tel"
            placeholder="Enter mobile number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            disabled={submitting}
            required
            className="w-full px-4 py-3.5 rounded-xl bg-white/70 dark:bg-slate-950/65 border border-slate-200/60 dark:border-slate-800/80 focus:border-primary focus:ring-1 focus:ring-primary text-slate-800 dark:text-white outline-none font-normal transition-all"
          />
        </div>

        {/* SUBJECT */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="tracking-wide">
            INQUIRY SUBJECT
          </label>

          <select
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
            disabled={submitting}
            className="w-full px-4 py-3.5 rounded-xl bg-white/70 dark:bg-slate-950/65 border border-slate-200/60 dark:border-slate-800/80 focus:border-primary focus:ring-1 focus:ring-primary text-slate-800 dark:text-white outline-none font-normal cursor-pointer transition-all"
          >
            <option value="General Consultation">
              General Consultation Inquiry
            </option>

            <option value="Luxury Gated Villas">
              Luxury Gated Villas
            </option>

            <option value="Corporate Offices & Towers">
              Corporate Offices & Towers
            </option>

            <option value="AI Voice-Automated Condos">
              AI Voice-Automated Condos
            </option>

            <option value="Bespoke Architectural Interiors">
              Bespoke Architectural Interiors
            </option>

            <option value="Heritage Restoration Upgrades">
              Heritage Restoration Upgrades
            </option>
          </select>
        </div>

        {/* MESSAGE */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="tracking-wide">
            DETAILED MESSAGE
          </label>

          <textarea
            rows={5}
            placeholder="Describe your inquiry details..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            disabled={submitting}
            required
            className="w-full px-4 py-3.5 rounded-xl bg-white/70 dark:bg-slate-950/65 border border-slate-200/60 dark:border-slate-800/80 focus:border-primary focus:ring-1 focus:ring-primary text-slate-800 dark:text-white outline-none font-normal leading-relaxed resize-none transition-all"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <div className="sm:col-span-2 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-[#9E7CFF] hover:from-primary-dark hover:to-primary text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-primary/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {submitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
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
                    d="M4 12a8 8 0 018-8V0C5.373 
                    0 0 5.373 0 12h4zm2 
                    5.291A7.962 7.962 0 
                    014 12H0c0 3.042 
                    1.135 5.824 3 
                    7.938l3-2.647z"
                  ></path>
                </svg>

                Sending...
              </>
            ) : (
              <>
                <FiSend size={14} />
                Send Consultation Request
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;