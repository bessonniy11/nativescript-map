import { ContentView, Observable } from '@nativescript/core';

export declare class YandexMapkit extends Observable {
	static init(apiKey: string): void;
}

export declare class YandexMapView extends ContentView {
	latitude: number;
	longitude: number;
	zoom: number;
	addPlacemark(latitude: number, longitude: number): void;
	setCenter(latitude: number, longitude: number, zoom?: number): void;
}
