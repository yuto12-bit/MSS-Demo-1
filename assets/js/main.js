document.addEventListener('DOMContentLoaded', () => {
  'use strict';

/*
  Protected selectors / IDs
  この下のロジックが依存しているため、案件中に削除・変更しないこと

  [data-js="menu-toggle"]
  [data-js="mobile-nav"]
  [data-js="faq-button"]
  [data-js="contact-form"]
  [data-js="thanks-message"]
  #submitBtn
  #formMessage
*/

  const GAS_URL = 'https://script.google.com/macros/s/XXXXXXXXX/exec';

  /* =========================================
     1. Mobile Menu
  ========================================= */
  const menuToggle = document.querySelector('[data-js="menu-toggle"]');
  const mobileNav = document.querySelector('[data-js="mobile-nav"]');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      mobileNav.setAttribute('aria-hidden', String(isExpanded));
      document.body.classList.toggle('scroll-lock', !isExpanded);
    });
  }

  /* =========================================
     2. Scroll Reveal
  ========================================= */
  const reveals = document.querySelectorAll('.reveal');

  if (reveals.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0 });

    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* =========================================
     3. FAQ Accordion
  ========================================= */
  const faqButtons = document.querySelectorAll('[data-js="faq-button"]');

  faqButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      const answer = button.nextElementSibling;

      button.setAttribute('aria-expanded', String(!isExpanded));

      if (answer) {
        answer.setAttribute('aria-hidden', String(isExpanded));
      }
    });
  });

  /* =========================================
     4. Form Submission
  ========================================= */
  const contactForm = document.querySelector('[data-js="contact-form"]');
  const submitBtn = document.getElementById('submitBtn');
  const formMsg = document.getElementById('formMessage');
  const thanksMsg = document.querySelector('[data-js="thanks-message"]');

  if (contactForm && submitBtn && formMsg && thanksMsg) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      formMsg.textContent = '';
      formMsg.className = 'form-msg';

      const honeypot = contactForm.elements['honeypot'];
      if (honeypot && honeypot.value !== '') return;

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const name = contactForm.elements['name']?.value.trim() || '';
      const email = contactForm.elements['email']?.value.trim() || '';
      const message = contactForm.elements['message']?.value.trim() || '';
      const consent = contactForm.elements['consent']?.checked;

      if (!name || !email || !message || !consent) {
        formMsg.textContent = '空白のみの入力が含まれています。正しくご入力ください。';
        formMsg.classList.add('msg-error');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = '送信中...';

      try {
        const response = await fetch(GAS_URL, {
          method: 'POST',
          body: new FormData(contactForm)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.status === 'success') {
          contactForm.classList.add('is-hidden');
          thanksMsg.classList.remove('is-hidden');
        } else {
          throw new Error(data.message || 'GAS returned an error status.');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        formMsg.textContent = 'システムエラーが発生しました。時間をおいて再度お試しください。';
        formMsg.classList.add('msg-error');
        submitBtn.disabled = false;
        submitBtn.textContent = '送信する';
      }
    });
  }
});