const feedbackForm = document.getElementById('feedback-form');
const successMsg = document.querySelector('.m-success-message');
const errorMsg = document.querySelector('.m-error-message');
const loader = document.querySelector('.loader');
const submitButton = document.querySelector('.m-contact-submit-button');
const nameInput = document.getElementById('form-name');
const phoneInput = document.getElementById('Form-Phone');
const emailInput = document.getElementById('Form-Email');
const comment = document.getElementById('Form-Message-Large');

feedbackForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    errorMsg.style.display = 'none';
    successMsg.style.display = 'none';
    submitButton.style.display = 'none';
    loader.style.display = 'inline-block';

    const formData = {
      name: nameInput.value,
      phone: phoneInput.value,
      email: emailInput.value,
      comment: comment.value,
    };

    const response = await fetch('https://gravitino.ru:5000/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Network error');
    }

    const { status } = await response.json();
    if (status) {
      successMsg.style.display = 'block';
    }
  } catch (error) {
    console.error(error);
    errorMsg.style.display = 'block';
  } finally {
    loader.style.display = 'none';
    submitButton.style.display = 'block';
  }
});
