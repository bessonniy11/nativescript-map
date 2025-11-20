import { EventData, Page } from '@nativescript/core';
import { openUrl } from '@nativescript/core/utils';
import { HelloWorldModel } from './main-view-model';
import { YandexMapView } from 'nativescript-yandex-mapkit';

const MOSCOW = {
	lat: 55.751244,
	lng: 37.618423,
	zoom: 12
};

export function navigatingTo(args: EventData) {
	const page = args.object as Page;
	page.bindingContext = new HelloWorldModel();

	page.on(Page.loadedEvent, () => {
		const mapView = page.getViewById('mapView') as unknown as YandexMapView;
		if (mapView) {
			mapView.setCenter(MOSCOW.lat, MOSCOW.lng, MOSCOW.zoom);
			mapView.addPlacemark(MOSCOW.lat, MOSCOW.lng); // Красная площадь
			mapView.addPlacemark(55.760186, 37.618711); // Тверская
		}
	});
}

export function openYandexMaps() {
	const url = 'yandexmaps://maps.yandex.ru/?ll=37.62,55.75&z=12';
	openUrl(url);
}
