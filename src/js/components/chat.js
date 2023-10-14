const chat = () => {
    const chat = document.querySelector('.chat');
    if (!chat) return;
    const chatBottom = chat.querySelector('.chat__bottom');
    const chatTags = chat.querySelector('.chat__tags');
    chatBottom.querySelector('.textarea-secondary__input').addEventListener('input', () => {
        chat.style.setProperty('--chat-bottom-height', `${chatBottom.offsetHeight}px`);
    })
    window.addEventListener('resize', chatPosition);

    chatTags.querySelectorAll('.chat__tag').forEach(tag => {
        tag.addEventListener('click', () => {
            chatPosition();
            // ...
        })
    })
    chatRename();



    function chatRename() {
        chat.addEventListener('click', (e) => {
            const target = e.target;
            if (target.closest('[data-chat-rename]')) {
                openRename();
            } else {
                return;
            }
            const chatRename = chat.querySelector('.chat-rename');
            const input = chatRename.querySelector('.chat-rename__input');
            const subtitle = chatRename.querySelector('.chat-rename__subtitle div span');

            input.addEventListener('input', updateSubtitle);

            const btnCancel = chatRename.querySelector('[data-chat-rename-cancel]');
            const btnConfirm = chatRename.querySelector('[data-chat-rename-confirm]');

            btnCancel.addEventListener('click', closeRename);
            btnConfirm.addEventListener('click', closeRename);

            chatRename.addEventListener('click', (e) => {
                if (!e.target.closest('.chat-rename__container') && chatRename.classList.contains('is-open')) {
                    closeRename();
                }
            })

            function closeRename() {
                chatRename.classList.remove('is-open');
                setTimeout(() => {
                    chatRename.remove();
                }, 500);
            };

            function openRename() {
                const currentItem = target.closest('.chat__item');
                const chatTop = target.closest('.chat__top');
                let currentNameUser;
                if (currentItem) {
                    currentItem.classList.remove('_dropdown-active');
                    currentItem.querySelector('.dots-dropdown').classList.remove('_active');
                    currentNameUser = currentItem.querySelector('.chat-user__name').textContent.trim();
                } else if (chatTop) {
                    chatTop.querySelector('.dots-dropdown').classList.remove('_active');
                    currentNameUser = chatTop.querySelector('.chat__user').textContent.trim();
                }

                const modalHTML = `
                <div class="chat__rename chat-rename">
                <div class="chat-rename__container">
                    <h2 class="chat-rename__title title-2">Изменить имя чата</h2>
                    <label class="chat-rename__input input-primary">
                        <input type="text" name="Имя" class="input-reset input-primary__input"
                            placeholder="Имя чата" maxlength="50">
                    </label>
                    <div class="chat-rename__subtitle">
                        <div>
                            <span>0</span>
                            /
                            <span>50</span>
                        </div>
                        <span>Имя чата видите только вы</span>
                    </div>
                    <div class="chat-rename__btns">
                        <button type="button" class="btn btn-reset btn-secondary chat-rename__btn" data-chat-rename-cancel>
                            Отмена
                        </button>
                        <button type="button" class="btn btn-reset btn-primary chat-rename__btn" data-chat-rename-confirm>
                            Переименовать
                        </button>
                    </div>
                </div>
            </div>
                `;
                chat.insertAdjacentHTML('beforeend', modalHTML);
                setTimeout(() => {
                    chat.querySelector('.chat-rename').classList.add('is-open');
                    chat.querySelector('.chat-rename__input input').value = currentNameUser;
                    updateSubtitle();
                }, 50);
            }

            function updateSubtitle() {
                subtitle.textContent = input.querySelector('input').value.length;
            }
        });
    }

    function chatPosition() {
        chat.style.setProperty('--chat-tags-height', `${chatTags.offsetHeight}px`);
    }
};

export default chat;
