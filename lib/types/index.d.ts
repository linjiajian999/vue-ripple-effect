import Vue, { PluginFunction } from 'vue'
export interface VueRippleEffectObject {
  mbRipple: Vue
  install(vue: typeof Vue, options?: any): void
}