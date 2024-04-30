<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-menu-button color="primary"></ion-menu-button>
				</ion-buttons>
				<ion-title>Mappa</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Map</ion-title>
				</ion-toolbar>
			</ion-header>

			<div id="container">
				<div id="map">
					<DxfViewer ref="viewer" :dxfUrl="dxfUrl" @dxf-loaded="_OnLoaded" @dxf-cleared="_OnCleared"
						@dxf-message="_OnMessage" />
				</div>
				<!-- <div class="col-auto layersCol">
					<LayersList :layers="layers" @toggleLayer="_OnToggleLayer" @toggleAll="_OnToggleAll" />
				</div> -->
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';



// import DxfViewer from "@/components/DxfViewer"
import { DxfViewer as _DxfViewer } from "dxf-viewer"
import Vue from "vue"
import LayersList from "@/components/LayersList"
// import mainFont from "@/assets/fonts/Roboto-LightItalic.ttf"
// import aux1Font from "@/assets/fonts/NotoSansDisplay-SemiCondensedLightItalic.ttf"
// import aux2Font from "@/assets/fonts/HanaMinA.ttf"
// import aux3Font from "@/assets/fonts/NanumGothic-Regular.ttf"


export default {
	// name: "MapPage";
	components: { LayersList DxfViewer },


	// props: {
	// 	dxfUrl: {
	// 		type: String
	// 	}
	// },

	

	data() {
		return {
			layers: null
		}
	},

	methods: {
		_OnLoaded() {
			const layers = this.$refs.viewer.GetViewer().GetLayers()
			layers.forEach(lyr => Vue.set(lyr, "isVisible", true))
			this.layers = layers
		},

		_OnCleared() {
			this.layers = null
		},

		_OnToggleLayer(layer, newState) {
			layer.isVisible = newState
			this.$refs.viewer.GetViewer().ShowLayer(layer.name, newState)
		},

		_OnToggleAll(newState) {
			if (this.layers) {
				for (const layer of this.layers) {
					if (layer.isVisible !== newState) {
						this._OnToggleLayer(layer, newState)
					}
				}
			}
		},

		_OnMessage(e) {
			let type = "info"
			switch (e.detail.level) {
				case _DxfViewer.MessageLevel.WARN:
					type = "warning"
					break
				case _DxfViewer.MessageLevel.ERROR:
					type = "negative"
					break
			}
			this.$q.notify({ type, message: e.detail.message })
		}
	},

	// created() {
	// 	// this.fonts = [mainFont, aux1Font, aux2Font, aux3Font]
	// 	this.fonts = []
	// }
}
</script>

<style scoped>
/* #container {
	text-align: center;
	position: absolute;
	left: 0;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
} */

#conatiner #map {
	height: 80vh;
	background-color: red;
}
</style>
