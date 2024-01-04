const maps = () => {
    function removeControlsPrimary(map, containerSelector) {
        map.controls.remove('geolocationControl'); // удаляем геолокацию
        map.controls.remove('searchControl'); // удаляем поиск
        map.controls.remove('trafficControl'); // удаляем контроль трафика
        map.controls.remove('typeSelector'); // удаляем тип
        map.controls.remove('rulerControl'); // удаляем контрол правил
        map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
    }

    function positionElement(map) {
        map.controls.get('fullscreenControl').options.set({
            position: {
                top: 16,
                right: 16
            },
            maxWidth: '44'
        })
        map.controls.get('zoomControl').options.set({
            position: {
                top: 92,
                right: 16
            },
            maxWidth: '44'
        })
    }
    if (document.querySelector('#bid-maps')) {
        document.querySelectorAll('#bid-maps').forEach(item => {
            function init() {
                let map = new ymaps.Map(item, {
                    center: [55.77171185651524, 37.62811179984117],
                    zoom: 10,
                });
                positionElement(map);
                removeControlsPrimary(map, '#bid-maps');
                if (item.closest('.history-changes')) {
                    map.behaviors.enable(['scrollZoom']);
                    map.controls.remove('fullscreenControl');
                    map.controls.get('zoomControl').options.set({
                        position: {
                            top: 20,
                            right: 20
                        },
                        maxWidth: '44'
                    })
                }
            }
            ymaps.ready(init);
        });
    }
    if (document.querySelector('#record-viewing-maps')) {
        const objectMaps = document.querySelector('#record-viewing-maps');
        if (!objectMaps) return;

        function init() {
            let map = new ymaps.Map('record-viewing-maps', {
                center: [55.77171185651524, 37.62811179984117],
                zoom: 10,
            });
            positionElement(map);
            removeControlsPrimary(map, '#record-viewing-maps');

            const fullScreenControl = map.controls.get('fullscreenControl');
            fullScreenControl.events.add('fullscreenenter', function () {
                const fullscreenElement = fullScreenControl.getMap().container._fullscreenManager._element;
                fullscreenElement.parentNode.style.position = 'fixed';
            });
        }
        ymaps.ready(init);
    }
    if (document.querySelector('#complaint-object-two-maps')) {
        const objectMaps = document.querySelector('#complaint-object-two-maps');
        if (!objectMaps) return;

        function init() {
            let map = new ymaps.Map('complaint-object-two-maps', {
                center: [55.77171185651524, 37.62811179984117],
                zoom: 10,
            });
            positionElement(map);
            removeControlsPrimary(map, '#complaint-object-two-maps');

            const fullScreenControl = map.controls.get('fullscreenControl');
            fullScreenControl.events.add('fullscreenenter', function () {
                const fullscreenElement = fullScreenControl.getMap().container._fullscreenManager._element;
                fullscreenElement.parentNode.style.position = 'fixed';
            });
        }
        ymaps.ready(init);
    }
    if (document.querySelector('#map-draw--2')) {
        function init() {
            let map = new ymaps.Map('map-draw--2', {
                center: [55.77171185651524, 37.62811179984117],
                zoom: 10,
            });
            positionElement(map);
            removeControlsPrimary(map, '#map-draw--2');
        }
        ymaps.ready(init);
    }
    if (document.querySelector('#popup-map__map')) {
        const container = document.querySelector('.popup-map__container');
        if (!container) return;

        function init() {
            let map = new ymaps.Map('popup-map__map', {
                center: [55.77171185651524, 37.62811179984117],
                zoom: 10,
            });
            removeControlsPrimary(map, '#popup-map__map');
            map.behaviors.enable(['scrollZoom']);
            map.controls.remove('fullscreenControl');
            map.controls.get('zoomControl').options.set({
                position: {
                    top: 20,
                    right: 20
                },
                maxWidth: '44'
            })
            if (innerWidth > 1212) reziseContainer(map)
        }
        ymaps.ready(init);

        const btn = container.querySelector('.popup-map__resize');

        function reziseContainer(map) {

            btn.addEventListener('mousedown', function (e) {
                e.preventDefault()
                window.addEventListener('mousemove', resize)
                window.addEventListener('mouseup', stopResize)
            })

            function resize(e) {
                const width = e.pageX - container.getBoundingClientRect().left - 20;
                if (!(width <= 706 && width >= 425)) return;
                container.style.gridTemplateColumns = `${width}px 1fr`;
                map.container.fitToViewport();
            }

            function stopResize() {
                window.removeEventListener('mousemove', resize)
            }
        }

        const cardFull = container.querySelector('.popup-map__card-full');
        container.addEventListener('click', (e) => {
            const target = e.target;
            const card = target.closest('[data-card-full-page-src]')
            if (card) {
                e.preventDefault();
                cardFull.classList.add('_active');
                cardFull.setAttribute('src', card.dataset.cardFullPageSrc);

                container.querySelector('.popup-map__items').setAttribute('hidden', '');

                setTimeout(() => {
                    const pageBody = (cardFull.contentDocument || cardFull.contentWindow.document).querySelector('.page__body');
                    cardFull.removeAttribute('scrolling');
                    pageBody.querySelector('.object__back').addEventListener('click', () => {
                        closeCardFull();
                    })

                    pageBody.closest('.page').classList.add('page--scrollY')
                }, 1500);

                function closeCardFull() {
                    cardFull.classList.remove('_active');
                    cardFull.setAttribute('src', '');
                    container.querySelector('.popup-map__items').removeAttribute('hidden');
                }
            }
        })

    }
    if (document.querySelector('#control-cards__maps')) {
        const container = document.querySelector('#control-cards__maps').closest('.control-cards__container');
        if (!container) return;

        function init() {
            let map = new ymaps.Map('control-cards__maps', {
                center: [55.77171185651524, 37.62811179984117],
                zoom: 10,
            });
            removeControlsPrimary(map, '#control-cards__maps');
            map.behaviors.enable(['scrollZoom']);
            map.controls.remove('fullscreenControl');
            map.controls.get('zoomControl').options.set({
                position: {
                    top: 20,
                    right: 20
                },
                maxWidth: '44'
            })
            if (innerWidth > 1212) reziseContainer(map)
        }
        ymaps.ready(init);

        const btn = container.querySelector('.control-cards__maps-resize');

        function reziseContainer(map) {
            let value = false;
            btn.addEventListener('mousedown', (e) => {
                e.preventDefault()
                resize();
            })

            function resize() {
                if (!value) {
                    container.style.gridTemplateColumns = `382px 1fr`;
                    container.classList.add('_map-full');
                    value = true;
                } else {
                    container.style.gridTemplateColumns = `780px 1fr`;
                    container.classList.remove('_map-full');
                    value = false;
                }

                map.container.fitToViewport();
            }
        }

        const cardFull = container.querySelector('.popup-map__card-full');
        container.addEventListener('click', (e) => {
            const target = e.target;
            const card = target.closest('[data-card-full-page-src]')
            if (card) {
                e.preventDefault();
                cardFull.classList.add('_active');
                cardFull.setAttribute('src', card.dataset.cardFullPageSrc);

                container.querySelector('.popup-map__items').setAttribute('hidden', '');

                setTimeout(() => {
                    const pageBody = (cardFull.contentDocument || cardFull.contentWindow.document).querySelector('.page__body');
                    cardFull.removeAttribute('scrolling');
                    pageBody.querySelector('.object__back').addEventListener('click', () => {
                        closeCardFull();
                    })

                    pageBody.closest('.page').classList.add('page--scrollY')
                }, 1500);

                function closeCardFull() {
                    cardFull.classList.remove('_active');
                    cardFull.setAttribute('src', '');
                    container.querySelector('.popup-map__items').removeAttribute('hidden');
                }
            }
        })
        const skeletonMap = container.querySelector('.control-cards__maps--skeleton');
        const mapSelector = container.querySelector('#control-cards__maps');
        let loaded_map = false;
        if (!loaded_map) {
            let timerID = setInterval(function () {
                if (typeof ymaps !== "undefined") {
                    if (skeletonMap) {
                        skeletonMap.remove();
                    }
                     mapSelector.classList.remove('_hidden-map');

                    loaded_map = true;
                    clearInterval(timerID);
                }
            }, 500);
        }

    }


    if (document.querySelector('#map-draw')) {
        function init() {
            let map = new ymaps.Map('map-draw', {
                center: [55.77171185651524, 37.62811179984117],
                zoom: 10,
            });
            removeControlsPrimary(map, '#map-draw');
            drawSettings(map);
        }
        ymaps.ready(init);

        function drawSettings(map) {
            map.controls.get('fullscreenControl').options.set({
                position: {
                    top: 16,
                    right: 16
                },
                maxWidth: '44',
            })
            const container = map.container._parentElement;
            const mapDraw = container.closest('.map-draw');
            const drawBtns = mapDraw ? mapDraw.querySelector('.map-draw__btns') : null;
            const searchArea = mapDraw.closest('.popup-primary--search-area');
            const mobileFullscreen = mapDraw.closest('.submit-app__container') ? mapDraw.closest('.submit-app__container').querySelector('.map-draw__mobile-fullscreen') : null;
            if (mobileFullscreen) {
                mobileFullscreen.addEventListener('click',() => {
                    map.container.enterFullscreen();
                });
            }
            if (drawBtns !== null) {
                map.controls.add("zoomControl");
                const fullScreenControl = map.controls.get('fullscreenControl');
                fullScreenControl.events.add('fullscreenenter', function () {
                    map.behaviors.enable(['scrollZoom']);
                    const fullscreenElement = fullScreenControl.getMap().container._fullscreenManager._element;
                    fullscreenElement.classList.add('draw-map-active-fullscreen');
                    fullscreenElement.insertAdjacentElement('beforeend', drawBtns);
                    map.controls.get('zoomControl').options.set({
                        position: {
                            top: 'calc((100vh - 152px + 24px) / 2 - (90px / 2))',
                            right: 16
                        },
                        maxWidth: '44'
                    })
                });
                fullScreenControl.events.add('fullscreenexit', function () {
                    map.behaviors.disable(['scrollZoom']);
                    const fullscreenElement = fullScreenControl.getMap().container._fullscreenManager._element;
                    fullscreenElement.classList.remove('yandex-map-active-fullscreen');
                    mapDraw.insertAdjacentElement('afterbegin', drawBtns);
                    if (window.innerWidth > 1212) {
                        map.controls.get('zoomControl').options.set({
                            position: {
                                top: 176,
                                right: 16
                            },
                            maxWidth: '44'
                        })
                    }
                });
            }
            if (window.innerWidth <= 1212) {
                map.behaviors.disable(['scrollZoom']);
                map.behaviors.disable(['drag']);
                if (drawBtns !== null) {
                    const fullScreenControl = map.controls.get('fullscreenControl');
                    fullScreenControl.events.add('fullscreenenter', function () {
                        map.behaviors.enable(['drag']);
                    });
                    fullScreenControl.events.add('fullscreenexit', function () {
                        map.behaviors.disable(['drag']);
                    });
                }
            } else {
                const top = `${searchArea ? 212 : 'calc((100vh - 152px + 24px) / 2 - (90px / 2))'}`
                map.controls.get('zoomControl').options.set({
                    position: {
                        top: Number(top),
                        right: 16
                    },
                    maxWidth: '44'
                })
            }
            if (searchArea) {
                map.controls.remove('fullscreenControl');
                map.behaviors.enable(['scrollZoom']);
            }

        }
    }
    if (document.querySelector('#place-sale-address-map')) {
        function init() {
            let map = new ymaps.Map('place-sale-address-map', {
                center: [55.77171185651524, 37.62811179984117],
                zoom: 10,
            });
            positionElement(map);
            removeControlsPrimary(map, '#place-sale-address-map');
        }
        ymaps.ready(init);
    }
    if (document.querySelector('#object-maps')) {
        const objectMaps = document.querySelector('#object-maps');
        if (!objectMaps) return;

        function init() {
            let map = new ymaps.Map('object-maps', {
                center: [55.77171185651524, 37.62811179984117],
                zoom: 10,
            });
            positionElement(map);
            removeControlsPrimary(map, '#object-maps');
            const containerSelects = objectMaps.closest('.object-location--select');
            if (containerSelects) {
                let btnCloseRoute;
                const btns = containerSelects.querySelectorAll('.object-location__btn');
                const infrastructure = containerSelects.querySelector('.object-location__infrastructure');
                const routes = containerSelects.querySelector('.object-location__routes');
                const locationRoutesBtn = document.querySelector('.location-routes__btn');
                btns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        btns.forEach(btn => btn.classList.remove('_active'));
                        btn.classList.toggle('_active');
                        if (btn.classList.contains('object-location__btn--infrastructure')) {
                            infrastructure.classList.add('_active');
                            objectMaps.classList.remove('_routes');
                            routes.classList.remove('_active');
                            locationRoutesBtn.classList.remove('_active');
                            map.controls.remove(btnCloseRoute);
                            routeHidden();
                        } else if (btn.classList.contains('object-location__btn--routes')) {
                            objectMaps.classList.add('_routes');
                            routes.classList.add('_active');
                            infrastructure.classList.remove('_active');
                        } else {
                            objectMaps.classList.remove('_routes');
                            infrastructure.classList.remove('_active');
                            routes.classList.remove('_active');
                            locationRoutesBtn.classList.remove('_active');
                            map.controls.remove(btnCloseRoute);
                            routeHidden();
                        }
                    });
                })
                locationRoutesBtn.addEventListener('click', () => {
                    if (!locationRoutesBtn.classList.contains('_active')) {
                        locationRoutesBtn.classList.add('_active');
                        routes.classList.add('_show');
                        map.container.enterFullscreen();
                        setTimeout(() => {
                            routeShow();
                        }, 50);
                    } else {
                        locationRoutesBtn.classList.remove('_active');
                        routeHidden();
                    }
                });

                const fullScreenControl = map.controls.get('fullscreenControl');
                fullScreenControl.events.add('fullscreenenter', function () {
                    const fullscreenElement = fullScreenControl.getMap().container._fullscreenManager._element;
                    fullscreenElement.classList.add('yandex-map-active-fullscreen');
                    map.behaviors.enable(['scrollZoom']);
                    if (infrastructure.classList.contains('_active')) {
                        fullscreenElement.insertAdjacentElement('beforeend', infrastructure);
                        infrastructure.classList.add('_active-fullscreen');
                    }
                    if (routes.classList.contains('_active')) {
                        fullscreenElement.insertAdjacentElement('beforeend', routes);
                        routes.classList.add('_active-fullscreen');
                    }
                });

                fullScreenControl.events.add('fullscreenexit', function () {
                    const fullscreenElement = fullScreenControl.getMap().container._fullscreenManager._element;
                    if (infrastructure.classList.contains('_active')) {
                        objectMaps.closest('.object-location__maps').insertAdjacentElement('afterend', infrastructure);
                        infrastructure.classList.remove('_active-fullscreen');
                    }
                    if (routes.classList.contains('_active')) {
                        routes.classList.remove('_active-fullscreen');
                        locationRoutesBtn.classList.remove('_active');
                        routeHidden();
                    }
                    fullscreenElement.classList.remove('yandex-map-active-fullscreen');
                    map.behaviors.disable(['scrollZoom']);
                });


                function routeShow() {
                    if (window.innerWidth > 1212) {
                        map.controls.add('routePanelControl', {
                            showHeader: true,
                            title: 'Построить маршрут',
                            float: 'right',
                            maxWidth: '400px',
                            position: {
                                right: 76,
                                top: 16,
                            },
                        });
                        btnCloseRoute = new ymaps.control.Button({
                            data: {
                                content: `
                                <div class="ymaps__route-close-wrapper">
                                    <svg>
                                        <use xlink:href="./img/sprite.svg#x"></use>
                                    </svg>
                                </div>
                                `,
                            },
                            options: {
                                maxWidth: [30, 100, 150]
                            }
                        });
                        map.controls.add(btnCloseRoute, {
                            position: {
                                right: 92,
                                top: 24,
                            }
                        });
                        setTimeout(() => {
                            document.querySelectorAll('.ymaps__route-close-wrapper').forEach(item => {
                                item.closest('.ymaps-2-1-79-float-button').classList.add('ymaps__route-close');
                            })
                        }, 1);
                        btnCloseRoute.events.add('click', function (e) {
                            routeHidden();
                            map.controls.remove(btnCloseRoute);
                            locationRoutesBtn.classList.remove('_active');
                        })
                    } else {
                        map.controls.add('routePanelControl', {
                            showHeader: true,
                            title: 'Построить маршрут',
                            float: 'left',
                            position: {
                                top: 0,
                                right: 0,
                            },
                        });
                        setTimeout(() => {
                            map.controls.get('routePanelControl')._layout._parentElement.classList.add('map-routePanelControl');
                        }, 1);
                    }
                }

                function routeHidden() {
                    map.controls.remove('routePanelControl');
                    routes.classList.remove('_show');
                }
            }
        }
        ymaps.ready(init);
    }
};

export default maps;
