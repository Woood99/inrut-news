import '../vendor/dragscroll';
import {
    _slideDown,
    _slideUp
} from '../support-modules/slide'
const mapMetro = () => {
    const container = document.querySelector('.search-area__form');
    if (!container) return;
    const map = container.querySelector('.map-metro');
    const clearAllBtn = container.querySelector('.search-area__clear');
    metroHover();
    reziseContainer();
    scaleMap();
    activationCheckbox();
    activationAndClearAll();
    navBottomCloseItem();
    navBottomMoreItem();

    const moscowMetroItems = {};
    container.querySelectorAll('.search-area__item').forEach(item => {
        moscowMetroItems[item.dataset.searchAreaMetro] = Array.from(item.querySelectorAll('[data-metro-id]'));
    })

    function activationAndClearAll() {
        const items = container.querySelectorAll('.search-area__item');
        items.forEach(item => {
            const elements = item.querySelectorAll('[data-metro-id]');
            const btnAll = item.querySelector('.search-area__control');
            const btnClear = item.querySelector('.search-area__control:nth-child(2)');

            btnAll.addEventListener('click', () => {
                clearAllLine(elements);
                navBottomUpdate(item.dataset.searchAreaMetro);
            })
            btnClear.addEventListener('click', () => {
                elements.forEach(el => {
                    el.querySelector('.checkbox-secondary__input').checked = false;
                    const currentId = el.dataset.metroId;
                    const stationName = map.querySelector(`[data-map-metro-id='${currentId}']`);
                    if (stationName) {
                        const stationCircle = map.querySelector(`.map-metro__to_${stationName.id.replace('map-metro__station_','')}`)
                        stationName.classList.remove('map-metro_select');
                        stationCircle.classList.remove('map-metro_select');
                    }


                    const currentIdItems = container.querySelectorAll(`[data-metro-id='${currentId}']`);
                    if (currentIdItems.length > 1) {
                        currentIdItems.forEach(item => {
                            if (item !== el) {
                                item.querySelector('.checkbox-secondary__input').checked = false;
                            }
                        })
                    }
                })
                navBottomUpdate();
            })
        })
    }

    function clearAllLine(elements) {
        elements.forEach(el => {
            el.querySelector('.checkbox-secondary__input').checked = true;
            const currentId = el.dataset.metroId;
            const stationName = map.querySelector(`[data-map-metro-id='${currentId}']`);
            if (stationName) {
                const stationCircle = map.querySelector(`.map-metro__to_${stationName.id.replace('map-metro__station_','')}`)
                stationName.classList.add('map-metro_select');
                stationCircle.classList.add('map-metro_select');
            }

            const currentIdItems = container.querySelectorAll(`[data-metro-id='${currentId}']`);
            if (currentIdItems.length > 1) {
                currentIdItems.forEach(item => {
                    if (item !== el) {
                        item.querySelector('.checkbox-secondary__input').checked = true;
                    }
                })
            }
        })
    }

    function clearAll() {
        container.querySelectorAll('.checkbox-secondary__input').forEach(input => input.checked = false);
        container.querySelectorAll('.map-metro_select').forEach(el => el.classList.remove('map-metro_select'))
        navBottomUpdate();
    }

    function activationCheckbox() {
        const elementList = container.querySelectorAll('[data-metro-id]');
        elementList.forEach(element => {
            const checkbox = element.querySelector('.checkbox-secondary__input');
            checkbox.addEventListener('change', () => {
                const currentId = element.dataset.metroId;
                const currentElementMap = map.querySelector(`[data-map-metro-id='${currentId}']`);
                if (!currentElementMap) return;
                const circle = container.querySelector(`.map-metro__to_${currentElementMap.id.replace('map-metro__station_','')}`);
                const inputs = container.querySelectorAll(`[data-metro-id='${currentId}'] .checkbox-secondary__input`);
                if (checkbox.checked) {
                    circle.classList.add('map-metro_select');
                    currentElementMap.classList.add('map-metro_select');
                    inputs.forEach(input => {
                        if (input.checked === false) {
                            input.checked = true;
                        }

                        reindexingArrayMetro(input.closest('[data-metro-id]'))

                        navBottomUpdate(element.closest('.search-area__item').dataset.searchAreaMetro);
                    })
                } else {
                    currentElementMap.classList.remove('map-metro_select');
                    circle.classList.remove('map-metro_select');
                    inputs.forEach(input => {
                        if (input.checked) {
                            input.checked = false;
                        }
                    })
                    navBottomUpdate();
                }
            });
        })

        map.addEventListener('click', (e) => {
            if (map.closest('.dragscroll').classList.contains('is-moving')) return;
            setTimeout(() => {
                const target = e.target;
                const circleItem = target.closest('.map-metro__stop');

                if (circleItem) {
                    if (circleItem.closest('.map-metro__transit-group')) {
                        let item = circleItem.closest('.map-metro__transit-group');
                        const stationId = item.getAttribute('class').replace('map-metro__transit-group ', '').replace('map-metro__to_', '').replace('map-metro_hover', '').replace('map-metro_select', '').trim();

                        const station = map.querySelector(`#map-metro__station_${stationId}`);
                        const currentId = station.dataset.mapMetroId;
                        const currentElementList = container.querySelectorAll(`[data-metro-id='${currentId}']`);
                        if (!item.classList.contains('map-metro_select')) {
                            station.classList.add('map-metro_select');
                            station.classList.remove('map-metro_hover');

                            item.classList.add('map-metro_select');
                            item.classList.remove('map-metro_hover');
                            currentElementList.forEach(item => {
                                item.querySelector('.checkbox-secondary__input').checked = true;
                                reindexingArrayMetro(item);
                                navBottomUpdate(item.closest('.search-area__item').dataset.searchAreaMetro);
                            })
                            openSpoller(currentElementList, circleItem);
                        } else {
                            station.classList.remove('map-metro_select');
                            item.classList.remove('map-metro_select');

                            currentElementList.forEach(item => {
                                item.querySelector('.checkbox-secondary__input').checked = false;
                            })
                            navBottomUpdate();
                        }
                    } else {
                        const stationId = circleItem.getAttribute('class').replace('map-metro__stop', '').replace('map-metro__to_', '').replace('map-metro_hover', '').replace('map-metro_select', '').trim();
                        const station = map.querySelector(`#map-metro__station_${stationId}`);

                        const currentId = station.dataset.mapMetroId;
                        const currentElementList = container.querySelectorAll(`[data-metro-id='${currentId}']`);

                        if (!circleItem.classList.contains('map-metro_select')) {
                            circleItem.classList.add('map-metro_select');
                            circleItem.classList.remove('map-metro_hover');

                            station.classList.add('map-metro_select');
                            station.classList.remove('map-metro_hover');

                            currentElementList.forEach(item => {
                                item.querySelector('.checkbox-secondary__input').checked = true;
                                reindexingArrayMetro(item);
                                navBottomUpdate(item.closest('.search-area__item').dataset.searchAreaMetro);
                            })

                            openSpoller(currentElementList, circleItem);
                        } else {
                            circleItem.classList.remove('map-metro_select');

                            station.classList.remove('map-metro_select');

                            currentElementList.forEach(item => {
                                item.querySelector('.checkbox-secondary__input').checked = false;
                            })
                            navBottomUpdate();
                        }
                    }
                }
            }, 25);
        })

    }

    function reindexingArrayMetro(currentElement) {
        const currentLineElement = currentElement.closest('[data-search-area-metro]').dataset.searchAreaMetro;
        const currentElementArrayIndex = moscowMetroItems[currentLineElement].indexOf(currentElement);
        moscowMetroItems[currentLineElement].splice(0, 0, moscowMetroItems[currentLineElement].splice(currentElementArrayIndex, 1)[0]);
    }

    function openSpoller(target, currentElem) {
        const spollers = container.querySelectorAll('.search-area__item');
        const currentColor = window.getComputedStyle(currentElem.querySelector('.map-metro__circle')).fill;
        spollers.forEach(spoller => {
            const btn = spoller.querySelector('.spollers__title');
            const body = spoller.querySelector('.spollers__body');
            if (btn.classList.contains('_spoller-active')) {
                const colorSpoller = window.getComputedStyle(spoller.querySelector('div svg')).fill;
                if (currentColor === colorSpoller) return;
                btn.classList.remove('_spoller-active');
                _slideUp(body, 0);
            }
        })
        if (target.length === 1) {
            slideDownAndMoving(target[0]);
        } else {
            target.forEach(el => {
                const colorSpoller = window.getComputedStyle(el.querySelector('.checkbox-secondary__circle')).backgroundColor;
                if (currentColor === colorSpoller) slideDownAndMoving(el);
            })
        }

        function slideDownAndMoving(target) {
            const spoller = target.closest('.search-area__item');
            const btn = spoller.querySelector('.spollers__title');
            const body = spoller.querySelector('.spollers__body');
            if (!btn.classList.contains('_spoller-active')) {
                btn.classList.add('_spoller-active');
                _slideDown(body, 0);
            }
            setTimeout(() => {
                const topGap = target.offsetTop;
                target.closest('.popup-primary--search-area').scrollTo({
                    top: topGap - 100,
                    behavior: 'smooth',
                });
            }, 0);
        }
    }

    function navBottomUpdate(line) {
        const nav = container.querySelector('.search-area__nav');
        nav.querySelectorAll('.search-area__nav-item').forEach(navItem => {
            if (line && navItem.dataset.searchAreaMetroNav === line) {
                nav.children[0].insertAdjacentElement('beforebegin', navItem);
            }
            if (!navItem.classList.contains('_active')) return;
            navItem.classList.remove('_active');
            navItem.querySelector('div:nth-child(2)').textContent = '';
        });
        const itemsChecked = [];
        for (const key in moscowMetroItems) {
            moscowMetroItems[key].forEach(item => {
                if (item.querySelector('.checkbox-secondary__input').checked) {
                    itemsChecked.push(item);
                }
            })
        }

        itemsChecked.forEach(item => {
            const spoller = item.closest('.search-area__item');
            nav.querySelectorAll('.search-area__nav-item').forEach(navItem => {
                if (navItem.dataset.searchAreaMetroNav === spoller.dataset.searchAreaMetro) {
                    navItem.classList.add('_active');
                    const counter = navItem.querySelector('.search-area__nav-counter');
                    const itemsCheckbox = spoller.querySelectorAll('.checkbox-secondary__input:checked');
                    if (navItem.querySelector('div:nth-child(2)').children.length <= 5 || navItem.classList.contains('_all-visible-item')) {
                        navItem.querySelector('div:nth-child(2)').innerHTML += `
                    <div data-search-area-metro-item="${item.dataset.metroId}">${item.querySelector('.checkbox-secondary__text').textContent.trim()}
                        <button type="button" class="btn btn-reset search-area__nav-close">
                            <svg>
                                <use xlink:href="img/sprite.svg#x"></use>
                            </svg>
                        </button>
                    </div>`;
                    }
                    if (itemsCheckbox.length > 6 && !navItem.classList.contains('_all-visible-item')) {
                        counter.classList.add('_active');
                        counter.querySelector('span').textContent = itemsCheckbox.length - 6;
                    } else {
                        counter.classList.remove('_active');
                    }
                    if (itemsCheckbox.length <= 6 && navItem.classList.contains('_all-visible-item')) {
                        navItem.classList.remove('_all-visible-item');
                    }
                }
            })
        })
    }

    function navBottomCloseItem() {
        const nav = container.querySelector('.search-area__nav');
        nav.addEventListener('click', (e) => {
            const target = e.target;
            const closeBtn = target.closest('.search-area__nav-close');
            if (!closeBtn) return;
            const item = closeBtn.closest('[data-search-area-metro-item]');
            container.querySelectorAll(`[data-metro-id="${item.dataset.searchAreaMetroItem}"]`).forEach(el => {
                el.querySelector('.checkbox-secondary__input').checked = false;
            })
            container.querySelectorAll(`[data-map-metro-id="${item.dataset.searchAreaMetroItem}"]`).forEach(el => {
                el.classList.remove('map-metro_select');
                const id = el.id.replace('map-metro__station_', '');
                map.querySelector(`.map-metro__to_${id}`).classList.remove('map-metro_select');
            })
            navBottomUpdate();
        })
    }

    function navBottomMoreItem() {
        const nav = container.querySelector('.search-area__nav');
        nav.addEventListener('click', (e) => {
            const target = e.target;
            const moreBtn = target.closest('.search-area__nav-counter');
            if (!moreBtn) return;
            const item = moreBtn.closest('[data-search-area-metro-nav]');
            item.classList.add('_all-visible-item');
            navBottomUpdate();
        })
    }

    function metroHover() {
        map.addEventListener('mousemove', (e) => {
            const target = e.target;
            if (target.closest('.map-metro__transit-group')) {
                const item = target.closest('.map-metro__transit-group');
                if (item.classList.contains('map-metro_select')) return;
                const idItem = item.getAttribute('class').replace('map-metro__transit-group', '').replace('map-metro_hover', '').replace('map-metro__to_', '').trim();
                document.getElementById(`map-metro__station_${idItem}`).classList.add('map-metro_hover');
                item.classList.add('map-metro_hover');
            } else if (target.closest('.map-metro__stop')) {
                const item = target.closest('.map-metro__stop');
                if (item.classList.contains('map-metro_select')) return;
                const idItem = item.getAttribute('class').replace('map-metro__stop', '').replace('map-metro_hover', '').replace('map-metro__to_', '').trim();
                document.getElementById(`map-metro__station_${idItem}`).classList.add('map-metro_hover');
                item.classList.add('map-metro_hover');
            } else {
                const items = map.querySelectorAll('.map-metro_hover');
                if (items.length === 0) return;
                items.forEach(item => item.classList.remove('map-metro_hover'));
            }
        });
    }

    function reziseContainer() {
        const btnResize = container.querySelector('.search-area__resize');
        btnResize.addEventListener('mousedown', function (e) {
            e.preventDefault()
            window.addEventListener('mousemove', resize)
            window.addEventListener('mouseup', stopResize)
        })

        function resize(e) {
            const width = e.pageX - container.getBoundingClientRect().left - 20;
            if (!(width <= 750 && width >= 360)) return;
            container.style.gridTemplateColumns = `${width}px 1fr`;
        }

        function stopResize() {
            window.removeEventListener('mousemove', resize)
        }
    }

    function scaleMap() {
        function addOnWheel(elem, handler) {
            if (elem.addEventListener) {
                if ('onwheel' in document) {
                    elem.addEventListener("wheel", handler);
                } else if ('onmousewheel' in document) {
                    elem.addEventListener("mousewheel", handler);
                } else {
                    elem.addEventListener("MozMousePixelScroll", handler);
                }
            } else {
                map.attachEvent("onmousewheel", handler);
            }
        }

        let scale = 0.9;
        const maxScale = 1.15;
        const minScale = 0.5;
        const stap = 0.05;
        const stapNav = 0.15;
        addOnWheel(map, function (e) {

            let delta = e.deltaY || e.detail || e.wheelDelta;

            if (delta === 100) {
                if (scale > minScale) scale -= stap;
                if (scale < minScale) scale = minScale;
            }
            if (delta === -100) {
                if (scale < maxScale) scale += stap;
                if (scale > maxScale) scale = maxScale;
            }

            map.querySelector('#map-metro_moscow').style.transform = map.style.WebkitTransform = map.style.MsTransform = 'scale(' + scale + ')';
            e.preventDefault();
        });


        const plus = container.querySelector('.search-area__scale-btn--plus');
        const minus = container.querySelector('.search-area__scale-btn--minus');
        plus.addEventListener('click', () => {
            if (scale < maxScale) scale += stapNav;
            if (scale > maxScale) scale = maxScale;
        })
        minus.addEventListener('click', () => {
            if (scale > minScale) scale -= stapNav;
            if (scale < minScale) scale = minScale;
        });
        [plus, minus].forEach(el => {
            el.addEventListener('click', () => {
                map.querySelector('#map-metro_moscow').style.transform = map.style.WebkitTransform = map.style.MsTransform = 'scale(' + scale + ')';
            })
        })
    }

    clearAllBtn.addEventListener('click', clearAll);
};

export default mapMetro;
