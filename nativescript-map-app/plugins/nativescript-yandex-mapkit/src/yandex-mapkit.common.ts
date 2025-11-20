import { Application, isAndroid, Observable } from '@nativescript/core';

declare const org: any;

/**
 * Базовая инициализация MapKit. Должна вызываться после Application.launchEvent на Android.
 */
export class YandexMapkit extends Observable {
	private static _initialized = false;

	public static init(apiKey: string): void {
		if (!isAndroid) {
			return;
		}

		if (YandexMapkit._initialized) {
			return;
		}

		const androidContext = Application.android?.context;
		if (!androidContext) {
			console.warn('YandexMapkit: Android context недоступен. Вызови init после Application.launchEvent.');
			return;
		}

		const nativeModule = (globalThis as any)?.org?.nativescript?.yandexmapkit?.YandexMapkit || org?.nativescript?.yandexmapkit?.YandexMapkit;
		if (!nativeModule) {
			console.error('YandexMapkit: native класс org.nativescript.yandexmapkit.YandexMapkit не найден. Проверь подключение плагина и сборку платформы.');
			return;
		}

		try {
			nativeModule.setApiKey(apiKey);
			nativeModule.init(androidContext);
			YandexMapkit._initialized = true;
		} catch (err) {
			console.error('YandexMapkit init failed', err);
			throw err;
		}
	}
}
