import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const IconIg = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/>
  </svg>
);

const IconIn = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const IconBe = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z"/>
  </svg>
);

const IconX = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please let me know your name.';
    if (!formData.email.trim()) {
      newErrors.email = 'An email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim()) newErrors.message = 'Don\'t forget to include your message.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Success scenario
    setErrors({});
    setSubmitted(true);
    
    // Simulate API call for UX
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="w-full bg-bg pt-12 pb-16 flex flex-col items-center">
      
      {/* Accessible heading for the section */}
      <h2 className="sr-only">Contact</h2>

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px]">
        <div className="w-full bg-[#007BFF] dark:bg-bg dark:border dark:border-border rounded-[28px] shadow-sm flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Half: Info */}
        <div className="flex-1 p-6 md:p-10 flex flex-col justify-between dark:bg-transparent bg-[#007BFF]">
          <div>
            <div className="flex items-center mb-6">
              <div className="inline-flex items-center gap-2 bg-white rounded-full px-3 py-1.5 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-100 shadow-[0_0_10px_#4ade80] motion-reduce:hidden"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_6px_#22c55e]"></span>
                </span>
                <span className="font-body text-[10px] text-[#007BFF] font-bold uppercase tracking-widest">Available for work</span>
              </div>
            </div>
            <h4 className="font-body text-xs text-white/80 dark:text-text-muted uppercase tracking-[0.15em] mb-4">
              Get in Touch
            </h4>
            <h3 className="font-heading text-[clamp(28px,3.5vw,44px)] font-bold text-white dark:text-text-primary leading-[1.1] mb-6">
              Let's create something together.
            </h3>
            <p className="font-body text-[16px] text-white/90 dark:text-text-muted mb-12 max-w-[340px]">
              Have a project or role in mind? I'd love to hear from you.
            </p>

            <div className="flex flex-col gap-3">
              <a href="mailto:vanshdigitalsiscreative@gmail.com" className="flex items-center gap-4 text-white dark:text-text-muted hover:text-white/80 dark:hover:text-text-primary transition-colors font-body text-[16px]">
                <div className="w-10 h-10 rounded-full border border-white/20 dark:border-border flex items-center justify-center flex-shrink-0 text-white dark:text-white">
                  <Mail size={18} />
                </div>
                <span className="truncate">vanshdigitalsiscreative@gmail.com</span>
              </a>
              <a href="tel:+916393608801" className="flex items-center gap-4 text-white dark:text-text-muted hover:text-white/80 dark:hover:text-text-primary transition-colors font-body text-[16px]">
                <div className="w-10 h-10 rounded-full border border-white/20 dark:border-border flex items-center justify-center flex-shrink-0 text-white dark:text-white">
                  <Phone size={18} />
                </div>
                +91 63936 08801
              </a>
              <div className="flex items-center gap-4 text-white dark:text-text-muted font-body text-[16px]">
                <div className="w-10 h-10 rounded-full border border-white/20 dark:border-border flex items-center justify-center flex-shrink-0 text-white dark:text-white">
                  <MapPin size={18} />
                </div>
                Raebareli, Uttar Pradesh, India
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-10 md:mt-auto">
            {[
              { icon: IconIg, label: 'Instagram', url: 'https://www.instagram.com/vanshdigitals/' },
              { icon: IconIn, label: 'LinkedIn', url: 'https://www.linkedin.com/in/vanshdigitals/' },
              { icon: IconBe, label: 'Behance', url: '#' },
              { icon: IconX, label: 'X (Twitter)', url: '#' }
            ].map((social, idx) => (
              <a 
                key={idx} 
                href={social.url} 
                target={social.url !== '#' ? "_blank" : undefined}
                rel={social.url !== '#' ? "noopener noreferrer" : undefined}
                aria-label={social.label}
                className="w-10 h-10 rounded-full border border-white/30 dark:border-border flex items-center justify-center text-white dark:text-text-primary hover:bg-white hover:text-[#007BFF] dark:hover:bg-[#FFD722] dark:hover:text-[#111214] dark:hover:border-[#FFD722] transition-colors"
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>

        {/* Right Half: Form */}
        <div className="flex-[1.2] p-6 md:px-8 md:py-12 flex flex-col justify-center bg-[#007BFF] dark:bg-transparent">
          <div className="bg-white dark:bg-[#111214] rounded-[18px] p-6 shadow-sm h-full flex flex-col justify-center dark:border dark:border-border">
            
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-[#FFD722] flex items-center justify-center text-[#111214] mb-6 shadow-sm">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#111214] dark:text-white mb-2">Message on its way.</h3>
                <p className="font-body text-text-muted mb-8">I'll get back to you soon.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="font-body text-sm font-medium text-[#007BFF] dark:text-[#FFD722] hover:underline underline-offset-4 focus:outline-none transition-all"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full" noValidate>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="font-body text-[13px] font-medium text-[#111214] dark:text-white">
                    Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`w-full bg-[#FAFAF7] dark:bg-[#1C1C1F] border ${errors.name ? 'border-red-500' : 'border-[#E6E6E3] dark:border-border'} rounded-xl px-4 py-3 font-body text-[15px] text-[#111214] dark:text-white placeholder-[#9CA3AF] dark:placeholder-[#6B7280] focus:outline-none focus:border-[#007BFF] dark:focus:border-[#FFD722] focus:ring-[3px] focus:ring-[#007BFF]/10 dark:focus:ring-[#FFD722]/10 transition-shadow`}
                  />
                  {errors.name && <p id="name-error" className="font-body text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="font-body text-[13px] font-medium text-[#111214] dark:text-white">
                    Email
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`w-full bg-[#FAFAF7] dark:bg-[#1C1C1F] border ${errors.email ? 'border-red-500' : 'border-[#E6E6E3] dark:border-border'} rounded-xl px-4 py-3 font-body text-[15px] text-[#111214] dark:text-white placeholder-[#9CA3AF] dark:placeholder-[#6B7280] focus:outline-none focus:border-[#007BFF] dark:focus:border-[#FFD722] focus:ring-[3px] focus:ring-[#007BFF]/10 dark:focus:ring-[#FFD722]/10 transition-shadow`}
                  />
                  {errors.email && <p id="email-error" className="font-body text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div className="flex flex-col gap-1.5 flex-grow">
                  <label htmlFor="message" className="font-body text-[13px] font-medium text-[#111214] dark:text-white">
                    Message
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`w-full bg-[#FAFAF7] dark:bg-[#1C1C1F] border ${errors.message ? 'border-red-500' : 'border-[#E6E6E3] dark:border-border'} rounded-xl px-4 py-3 font-body text-[15px] text-[#111214] dark:text-white placeholder-[#9CA3AF] dark:placeholder-[#6B7280] focus:outline-none focus:border-[#007BFF] dark:focus:border-[#FFD722] focus:ring-[3px] focus:ring-[#007BFF]/10 dark:focus:ring-[#FFD722]/10 transition-shadow resize-none flex-grow`}
                  />
                  {errors.message && <p id="message-error" className="font-body text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                <div className="pt-2 mt-auto">
                  <button 
                    type="submit"
                    className="group w-full h-12 bg-[#FFD722] hover:bg-[#E6C200] text-[#111214] font-body font-semibold text-[15px] rounded-xl transition-all focus:outline-none focus-visible:ring-[3px] focus-visible:ring-[#FFD722]/30 flex items-center justify-center"
                  >
                    <span className="group-hover:hidden transition-opacity">Send Message</span>
                    <span className="hidden group-hover:flex items-center gap-2 transition-opacity">
                      Let's Talk 
                      <span className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:transform-none">→</span>
                    </span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
