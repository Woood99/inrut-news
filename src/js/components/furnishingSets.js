const furnishingSets = () => {
    const containers = document.querySelectorAll('.furnishing-sets');
    if (!containers) return;
    containers.forEach(container => {
        container.querySelectorAll('.furnishing-sets__item').forEach(item => {
            const btnsContainer = item.querySelector('.furnishing-sets__btns');
            const contentContainer = item.querySelector('.furnishing-sets__tabs');
            const btns = item.querySelectorAll('.furnishing-sets__btn');
            const tabs = item.querySelectorAll('.furnishing-sets__tab');
            btnAction(btns, tabs);

            if (container.classList.contains('furnishing-sets--controls')) {
                const createStudio = item.querySelector('.furnishing-sets__create--studio');
                const createRoom = item.querySelector('.furnishing-sets__create--room');
                console.log(createStudio);
                if (item.querySelector('.furnishing-sets__btn--studio') && createStudio) {
                    createStudio.setAttribute('hidden', '');
                }
                if (createRoom) {
                    createRoom.addEventListener('click', () => {
                        const btns = item.querySelectorAll('.furnishing-sets__btn--room');
                        const lastBtn = btns[btns.length - 1];
                        const lastNumber = lastBtn ? lastBtn.querySelector('span').textContent : 1;
                        btnsContainer.innerHTML += generateRoom(Number(lastNumber) + 1);
                        contentContainer.innerHTML += generateTabContent();
                        const quantityRoom = item.querySelectorAll('.furnishing-sets__btn--room');
                        btnAction(item.querySelectorAll('.furnishing-sets__btn'), item.querySelectorAll('.furnishing-sets__tab'));
                        renamingTitle(item.querySelectorAll('.furnishing-sets__btn'));
                        if (quantityRoom.length === 8) {
                            createRoom.setAttribute('hidden', '');
                        }
                    })
                    createStudio.addEventListener('click', () => {
                        btnsContainer.innerHTML = generateStudio() + btnsContainer.innerHTML;
                        contentContainer.innerHTML = generateTabContent() + contentContainer.innerHTML;
                        createStudio.setAttribute('hidden', '');
                        btnAction(item.querySelectorAll('.furnishing-sets__btn'), item.querySelectorAll('.furnishing-sets__tab'));
                        renamingTitle(item.querySelectorAll('.furnishing-sets__btn'));
                    })
                }
            }


            function btnAction(btns, tabs) {
                btns.forEach((btn, indexBtn) => {
                    btn.addEventListener('click', (e) => {
                        const remove = e.target.closest('.furnishing-sets__btn-remove');
                        if (remove) {
                            const activeBtnIndex = Array.prototype.indexOf.call(btns, btn);
                            const currentContent = tabs[activeBtnIndex];

                            btn.remove();
                            currentContent.remove();
                            renamingTitle(item.querySelectorAll('.furnishing-sets__btn'));
                            if (!item.querySelector('.furnishing-sets__btn--studio')) {
                                const createStudio = item.querySelector('.furnishing-sets__create--studio');
                                createStudio.removeAttribute('hidden');
                            }
                            if (item.querySelectorAll('.furnishing-sets__btn--room').length <= 8) {
                                const createRoom = item.querySelector('.furnishing-sets__create--room');
                                createRoom.removeAttribute('hidden');
                            }
                        } else {
                            btns.forEach(btn => btn.classList.remove('_active'));
                            btn.classList.add('_active');
                            tabs.forEach((tab, indexTab) => {
                                if (indexBtn !== indexTab) {
                                    tab.setAttribute('hidden', '')
                                } else {
                                    tab.removeAttribute('hidden');
                                }
                            })
                        }
                    });
                })
            }

            function generateRoom(number) {
                const roomHTML = `
                <button type="button" class="btn btn-reset furnishing-sets__btn furnishing-sets__btn--room furnishing-sets__btn--controls">
                    <span>${number}</span>
                    <div class="furnishing-sets__btn-remove">
                        <svg>
                          <use xlink:href="img/sprite.svg#trash"></use>
                        </svg>
                    </div>
                </button>
                `;
                return roomHTML;
            }

            function generateTabContent() {
                const contenHTML = `
                <div class="furnishing-sets__tab" hidden>
                    <div class="photo-load">
                        <div class="place-sale-photo__images drag-drop photo-load__images">
                        </div>
                        <div class="place-sale-photo__wrapper photo-load__wrapper">
                            <button type="button" class="btn btn-reset">
                                <p>
                                    <span class="btn btn-reset btn-primary">Выберите фото</span> <span>или перетащите в эту область</span>
                                </p>
                            </button>
                            <input type="file" data-upload-drop="" name="upload" multiple="" accept=".jpg, .png, .jpeg, .heic" class="input-reset">
                        </div>
                    </div>
                    <label class="textarea-primary" style="margin-top: 24px;">
                        <textarea class="input-reset textarea-primary__input" placeholder="Описание к фотографии"></textarea>
                    </label>
                </div>
                `;
                return contenHTML;
            }

            function generateStudio() {
                const studioHTML = `
                    <button type="button" class="btn btn-reset furnishing-sets__btn furnishing-sets__btn--studio furnishing-sets__btn--controls">
                        <span>Студия</span>
                        <div class="furnishing-sets__btn-remove">
                            <svg>
                              <use xlink:href="img/sprite.svg#trash"></use>
                            </svg>
                        </div>
                    </button>
                    `;
                return studioHTML;
            }

            function renamingTitle(titles) {
                const newTitles = Array.prototype.slice.call(titles, 0).filter(title => title.classList.contains('furnishing-sets__btn--room'));
                newTitles.forEach((title, index) => {
                    title.querySelector('span').textContent = index + 1;
                })
            }
        })
    })
};

export default furnishingSets;
