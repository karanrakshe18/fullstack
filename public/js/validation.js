document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userDetailsForm');
    
    form.addEventListener('submit', (e) => {
      let valid = true;
      const errors = {};
  
      // Full Name validation
      const fullName = form.fullName.value.trim();
      if (fullName.length < 2) {
        errors.fullName = 'Full name must be at least 2 characters';
        valid = false;
      }
  
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const email = form.email.value.trim();
      if (!emailRegex.test(email)) {
        errors.email = 'Invalid email address';
        valid = false;
      }
  
      // Phone validation
      const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
      const phone = form.phone.value.trim();
      if (!phoneRegex.test(phone)) {
        errors.phone = 'Invalid phone number';
        valid = false;
      }
  
      // Display errors
      Object.keys(errors).forEach(key => {
        const errorElement = document.getElementById(`${key}Error`);
        if (errorElement) {
          errorElement.textContent = errors[key];
        }
      });
  
      if (!valid) {
        e.preventDefault();
      }
    });
  });
