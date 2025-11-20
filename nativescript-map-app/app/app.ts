import { Application, isAndroid } from '@nativescript/core';
import { YandexMapkit } from 'nativescript-yandex-mapkit';

const YANDEX_MAPS_API_KEY = 'cf0b24da-5431-4927-824d-1ffecaae9f3f';

Application.on(Application.launchEvent, () => {
	if (isAndroid) {
		YandexMapkit.init(YANDEX_MAPS_API_KEY);
	}
});

Application.run({ moduleName: 'app-root' });
