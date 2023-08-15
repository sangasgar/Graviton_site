const input = document.getElementById('Chat-Search');
const chatForm = document.getElementById('chat-form');
const failMsg = document.querySelector('.chat-form-fail');
const submitBtn = document.querySelector('.paragraph-5');
const loader = document.querySelector('.loader');
const chatContainer = document.querySelector('.f-chat-block');
let userInput = '';
let isFirstRequest = true;

input.addEventListener('input', (e) => {
  userInput = e.target.value;
});

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    failMsg.style.display = 'none';
    submitBtn.style.display = 'none';
    loader.style.display = 'inline-block';
    const newUserMsg = renderChatMsg('user', userInput);
    chatContainer.appendChild(newUserMsg);

    const data = {
      status: isFirstRequest ? 'new' : 'old',
      message: userInput,
    };

    const response = await fetch('https://gravitino.ru:5000/api-service', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network error');
    }

    const { content } = await response.json();
    const chatAnswer = renderChatMsg('chat', content);
    chatContainer.appendChild(chatAnswer);
    isFirstRequest = false;
  } catch (error) {
    console.error();
    failMsg.style.display = 'block';
  } finally {
    input.value = ''
    loader.style.display = 'none';
    submitBtn.style.display = 'block';
  }
});

function renderChatMsg(host, text) {
  const textWrapper = document.createElement('div');

  if (host === 'user') {
    textWrapper.className = 'f-chat-bubble-wrapper';

    const template = `
            <div class="f-chat-bubble-icon">
              <div class="m-icon-login w-embed">
              <svg
              width="36"
              height="36"
              viewbox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="17.5788"
                cy="13.278"
                r="4.77803"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></circle>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10 24.7013C9.99873 24.3654 10.0739 24.0336 10.2197 23.7311C10.6774 22.8157 11.968 22.3306 13.0389 22.1109C13.8113 21.9461 14.5943 21.836 15.3822 21.7814C16.8408 21.6533 18.3079 21.6533 19.7666 21.7814C20.5544 21.8366 21.3374 21.9467 22.1099 22.1109C23.1808 22.3306 24.4714 22.77 24.9291 23.7311C25.2224 24.3479 25.2224 25.0639 24.9291 25.6807C24.4714 26.6418 23.1808 27.0812 22.1099 27.2917C21.3384 27.4633 20.5551 27.5766 19.7666 27.6304C18.5794 27.731 17.3866 27.7494 16.1968 27.6853C15.9222 27.6853 15.6568 27.6853 15.3822 27.6304C14.5966 27.5772 13.8163 27.464 13.0481 27.2917C11.968 27.0812 10.6865 26.6418 10.2197 25.6807C10.0746 25.3746 9.99955 25.04 10 24.7013Z"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
              </div>
            </div>
            <div class="f-bubble-chat-gray">${text}</div>
          `;

    textWrapper.innerHTML = template;
  } else {
    const textWrapper = document.createElement('div');
    textWrapper.className = 'f-chat-bubble-wrapper blue';

    const template = `
            <div
            class="lottie-animation-3"
            data-w-id="851aec9c-ee0a-0b1d-e51e-c1f5d0b554d6"
            data-animation-type="lottie"
            data-src="documents/animation_lkcmdu45.json"
            data-loop="1"
            data-direction="1"
            data-autoplay="1"
            data-is-ix2-target="0"
            data-renderer="svg"
            data-duration="0"
            ></div>
            </div>
                <div class="f-full-name-text">
                ${text}
                </div>`;

    textWrapper.innerHTML = template;
  }

  return textWrapper;
}
