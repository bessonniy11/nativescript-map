import { Application, ContentView, isAndroid } from '@nativescript/core';
import { YandexMapkit } from './yandex-mapkit.common';

declare const org: any;
declare const com: any;
declare const android: any;

export * from './yandex-mapkit.common';

export class YandexMapView extends ContentView {
	private _nativeMap: any;

	createNativeView(): object {
		if (isAndroid) {
			const mapView = new org.nativescript.yandexmapkit.YandexMapkitView(this._context);
			this._nativeMap = mapView;
			return mapView;
		}

		return super.createNativeView();
	}

	disposeNativeView(): void {
		this._nativeMap = null;
		super.disposeNativeView();
	}

	onLoaded(): void {
		super.onLoaded();
		if (isAndroid && this._nativeMap) {
			try {
				com.yandex.mapkit.MapKitFactory.getInstance()?.onStart();
				this._nativeMap.onStart();
			} catch (err) {
				console.error('YandexMapView onLoaded failed', err);
			}
		}
	}

	onUnloaded(): void {
		if (isAndroid && this._nativeMap) {
			try {
				this._nativeMap.onStop();
				com.yandex.mapkit.MapKitFactory.getInstance()?.onStop();
			} catch (err) {
				console.error('YandexMapView onUnloaded failed', err);
			}
		}
		super.onUnloaded();
	}

	get latitude(): number {
		if (isAndroid && this._nativeMap) {
			return this._nativeMap.getMap().getCameraPosition().getTarget().getLatitude();
		}
		return 0;
	}
	set latitude(value: number) {
		if (isAndroid && this._nativeMap) {
			const cameraPosition = this._nativeMap.getMap().getCameraPosition();
			this._nativeMap.getMap().move(
				new com.yandex.mapkit.map.CameraPosition(
					new com.yandex.mapkit.geometry.Point(value, cameraPosition.getTarget().getLongitude()),
					cameraPosition.getZoom(),
					cameraPosition.getAzimuth(),
					cameraPosition.getTilt()
				)
			);
		}
	}

	get longitude(): number {
		if (isAndroid && this._nativeMap) {
			return this._nativeMap.getMap().getCameraPosition().getTarget().getLongitude();
		}
		return 0;
	}
	set longitude(value: number) {
		if (isAndroid && this._nativeMap) {
			const cameraPosition = this._nativeMap.getMap().getCameraPosition();
			this._nativeMap.getMap().move(
				new com.yandex.mapkit.map.CameraPosition(
					new com.yandex.mapkit.geometry.Point(cameraPosition.getTarget().getLatitude(), value),
					cameraPosition.getZoom(),
					cameraPosition.getAzimuth(),
					cameraPosition.getTilt()
				)
			);
		}
	}

	get zoom(): number {
		if (isAndroid && this._nativeMap) {
			return this._nativeMap.getMap().getCameraPosition().getZoom();
		}
		return 0;
	}
	set zoom(value: number) {
		if (isAndroid && this._nativeMap) {
			const cameraPosition = this._nativeMap.getMap().getCameraPosition();
			this._nativeMap.getMap().move(
				new com.yandex.mapkit.map.CameraPosition(
					cameraPosition.getTarget(),
					value,
					cameraPosition.getAzimuth(),
					cameraPosition.getTilt()
				)
			);
		}
	}

	setCenter(latitude: number, longitude: number, zoom?: number): void {
		if (isAndroid && this._nativeMap) {
			const current = this._nativeMap.getMap().getCameraPosition();
			const cameraPosition = new com.yandex.mapkit.map.CameraPosition(
				new com.yandex.mapkit.geometry.Point(latitude, longitude),
				zoom ?? current.getZoom(),
				current.getAzimuth(),
				current.getTilt(),
			);
			this._nativeMap.getMap().move(
				cameraPosition,
				new com.yandex.mapkit.Animation(com.yandex.mapkit.Animation.Type.SMOOTH, 0.8),
				null,
			);
		}
	}

	addPlacemark(latitude: number, longitude: number): void {
		if (isAndroid && this._nativeMap) {
			const mapObjects = this._nativeMap.getMap().getMapObjects();
			const placemark = mapObjects.addPlacemark(new com.yandex.mapkit.geometry.Point(latitude, longitude));
			try {
				const icon = com.yandex.runtime.image.ImageProvider.fromResource(
					Application.android.context,
					android.R.drawable.ic_menu_mylocation,
				);
				placemark.setIcon(icon);
			} catch (e) {
				console.log('Placemark icon set failed', e);
			}
		}
	}
}
