[Skip to content](https://www.embla-carousel.com/api/methods/#main-content)

# Methods

Embla Carousel exposes a set of **useful methods** which makes it very **extensible**.

* * *

## [usage permalink](https://www.embla-carousel.com/api/methods/\#usage) Usage

You need an **initialized carousel** in order to **make use of methods**. They can be accessed during the lifecycle of a carousel and won't do anything after a carousel instance has been destroyed with the [destroy](https://www.embla-carousel.com/api/methods/#destroy) method.

### [calling methods permalink](https://www.embla-carousel.com/api/methods/\#calling-methods) Calling methods

In the following example, the [slideNodes](https://www.embla-carousel.com/api/methods/#slidenodes) method is called and logged to the console as soon as the carousel has been initialized:

VanillaVanillaReactReactVueVueSolidSolidSvelteSvelte

Copy code snippet to clipboardCopy

```prism-code js
import EmblaCarousel from 'embla-carousel'
const emblaNode = document.querySelector('.embla')const emblaApi = EmblaCarousel(emblaNode)
console.log(emblaApi.slideNodes())
```

Copy code snippet to clipboardCopy

```prism-code jsx
import { useEffect } from 'react'import useEmblaCarousel from 'embla-carousel-react'
export function EmblaCarousel() {  const [emblaRef, emblaApi] = useEmblaCarousel()
  useEffect(() => {    if (emblaApi) console.log(emblaApi.slideNodes())  }, [emblaApi])
  // ...}
```

Copy code snippet to clipboardCopy

```prism-code html
<script setup>  import { onMounted } from 'vue'  import emblaCarouselVue from 'embla-carousel-vue'
  const [emblaRef, emblaApi] = emblaCarouselVue()
  onMounted(() => {    if (emblaApi.value) console.log(emblaApi.value.slideNodes())  })
  // ...</script>
```

Copy code snippet to clipboardCopy

```prism-code jsx
import { onMount } from 'solid-js'import createEmblaCarousel from 'embla-carousel-solid'
export function EmblaCarousel() {  const [emblaRef, emblaApi] = createEmblaCarousel()
  onMount(() => {    const api = emblaApi()    if (api) console.log(api.slideNodes())  })
  // ...}
```

Copy code snippet to clipboardCopy

```prism-code html
<script>  import emblaCarouselSvelte from 'embla-carousel-svelte'
  let emblaApi
  function onInit(event) {    emblaApi = event.detail    console.log(emblaApi.slideNodes())  }</script>
<div class="embla" use:emblaCarouselSvelte onemblaInit="{onInit}">...</div>
```

**Note:** Starting with Svelte 5, the `on:` event handlers have been deprecated. However, `on:emblaInit` will remain for backward compatibility.

### [typescript permalink](https://www.embla-carousel.com/api/methods/\#typescript) TypeScript

The `EmblaCarouselType` is obtained directly from the **core package** `embla-carousel` and used like so:

VanillaVanillaReactReactVueVueSolidSolidSvelteSvelte

Copy code snippet to clipboardCopy

```prism-code tsx
import EmblaCarousel, { EmblaCarouselType } from 'embla-carousel'
const emblaNode = document.querySelector('.embla')const emblaApi = EmblaCarousel(emblaNode)
function logSlidesInView(emblaApi: EmblaCarouselType): void {  console.log(emblaApi.slidesInView())}
emblaApi.on('slidesInView', logSlidesInView)
```

Copy code snippet to clipboardCopy

```prism-code tsx
import React, { useCallback } from 'react'import { EmblaCarouselType } from 'embla-carousel'import useEmblaCarousel from 'embla-carousel-react'
export function EmblaCarousel() {  const [emblaRef, emblaApi] = useEmblaCarousel()
  const logSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {    console.log(emblaApi.slidesInView())  }, [])
  useEffect(() => {    if (emblaApi) emblaApi.on('slidesInView', logSlidesInView)  }, [emblaApi, logSlidesInView])
  // ...}
```

If you're using `pnpm`, you need to install `embla-carousel` as a
**devDependency** when importing types from it like demonstrated above.

This is because even though `embla-carousel-react` has `embla-carousel` as a
dependency, `pnpm` makes nested dependencies inaccessible by design.

Copy code snippet to clipboardCopy

```prism-code html
<script setup lang="ts">  import { onMounted } from 'vue'  import { EmblaCarouselType } from 'embla-carousel'  import emblaCarouselVue from 'embla-carousel-vue'
  const [emblaRef] = emblaCarouselVue()
  function logSlidesInView(emblaApi: EmblaCarouselType): void {    console.log(emblaApi.slidesInView())  }
  onMounted(() => {    if (emblaApi.value) emblaApi.value.on('slidesInView', logSlidesInView)  })
  // ...</script>
```

If you're using `pnpm`, you need to install `embla-carousel` as a
**devDependency** when importing types from it like demonstrated above.

This is because even though `embla-carousel-vue` has `embla-carousel` as a
dependency, `pnpm` makes nested dependencies inaccessible by design.

Copy code snippet to clipboardCopy

```prism-code jsx
import { onMount } from 'solid-js'import { EmblaCarouselType } from 'embla-carousel'import createEmblaCarousel from 'embla-carousel-solid'
export function EmblaCarousel() {  const [emblaRef, emblaApi] = createEmblaCarousel()
  function logSlidesInView(emblaApi: EmblaCarouselType): void {    console.log(emblaApi.slidesInView())  }
  onMount(() => {    const api = emblaApi()    if (api) api.on('slidesInView', logSlidesInView)  })
  // ...}
```

If you're using `pnpm`, you need to install `embla-carousel` as a
**devDependency** when importing types from it like demonstrated above.

This is because even though `embla-carousel-solid` has `embla-carousel` as a
dependency, `pnpm` makes nested dependencies inaccessible by design.

Copy code snippet to clipboardCopy

```prism-code html
<script>  import { EmblaCarouselType } from 'embla-carousel'  import emblaCarouselSvelte from 'embla-carousel-svelte'
  let emblaApi: EmblaCarouselType
  function logSlidesInView(emblaApi: EmblaCarouselType): void {    console.log(emblaApi.slidesInView())  }
  function onInit(event: CustomEvent<EmblaCarouselType>): void {    emblaApi = event.detail    emblaApi.on('slidesInView', logSlidesInView)  }</script>
<div class="embla" use:emblaCarouselSvelte onemblaInit="{onInit}">...</div>
```

**Note:** Starting with Svelte 5, the `on:` event handlers have been deprecated. However, `on:emblaInit` will remain for backward compatibility.

If you're using `pnpm`, you need to install `embla-carousel` as a
**devDependency** when importing types from it like demonstrated above.

This is because even though `embla-carousel-svelte` has `embla-carousel` as a
dependency, `pnpm` makes nested dependencies inaccessible by design.

## [reference permalink](https://www.embla-carousel.com/api/methods/\#reference) Reference

Below follows an exhaustive **list of all** Embla Carousel **methods** with their respective parameters and return values.

* * *

### [rootnode permalink](https://www.embla-carousel.com/api/methods/\#rootnode) rootNode

Parameters: `none`

Returns: `HTMLElement`

Get the root node that holds the scroll container with slides inside. This method can be useful when you need to manipulate the root element dynamically or similar.

* * *

### [containernode permalink](https://www.embla-carousel.com/api/methods/\#containernode) containerNode

Parameters: `none`

Returns: `HTMLElement`

Get the container node that holds the slides. This method can be useful when you need to manipulate the container element dynamically or similar.

* * *

### [slidenodes permalink](https://www.embla-carousel.com/api/methods/\#slidenodes) slideNodes

Parameters: `none`

Returns: `HTMLElement[]`

Get all the slide nodes inside the container. This method can be useful when you need to manipulate the slide elements dynamically or similar.

* * *

### [scrollnext permalink](https://www.embla-carousel.com/api/methods/\#scrollnext) scrollNext

Parameters: `jump?: boolean`

Returns: `void`

Scroll to the next snap point if possible. When [loop](https://www.embla-carousel.com/api/options/#loop) is disabled and the carousel has reached the last snap point, this method won't do anything. Set the **jump** parameter to `true` when you want to go to the next slide instantly.

* * *

### [scrollprev permalink](https://www.embla-carousel.com/api/methods/\#scrollprev) scrollPrev

Parameters: `jump?: boolean`

Returns: `void`

Scroll to the previous snap point if possible. When [loop](https://www.embla-carousel.com/api/options/#loop) is disabled and the carousel has reached the first snap point, this method won't do anything. Set the **jump** parameter to `true` when you want to go to the previous slide instantly.

* * *

### [scrollto permalink](https://www.embla-carousel.com/api/methods/\#scrollto) scrollTo

Parameters: `index: number`, `jump?: boolean`

Returns: `void`

Scroll to a snap point by its unique index. If [loop](https://www.embla-carousel.com/api/options/#loop) is enabled, Embla Carousel will choose the closest way to the target snap point. Set the **jump** parameter to `true` when you want to go to the desired slide instantly.

* * *

### [canscrollnext permalink](https://www.embla-carousel.com/api/methods/\#canscrollnext) canScrollNext

Parameters: `none`

Returns: `boolean`

Check the possiblity to scroll to a next snap point. If [loop](https://www.embla-carousel.com/api/options/#loop) is enabled and the container holds any slides, this will always return `true`.

* * *

### [canscrollprev permalink](https://www.embla-carousel.com/api/methods/\#canscrollprev) canScrollPrev

Parameters: `none`

Returns: `boolean`

Check the possiblity to scroll to a previous snap point. If [loop](https://www.embla-carousel.com/api/options/#loop) is enabled and the container holds any slides, this will always return `true`.

* * *

### [selectedscrollsnap permalink](https://www.embla-carousel.com/api/methods/\#selectedscrollsnap) selectedScrollSnap

Parameters: `none`

Returns: `number`

Get the index of the selected snap point.

* * *

### [previousscrollsnap permalink](https://www.embla-carousel.com/api/methods/\#previousscrollsnap) previousScrollSnap

Parameters: `none`

Returns: `number`

Get the index of the previously selected snap point.

* * *

### [scrollsnaplist permalink](https://www.embla-carousel.com/api/methods/\#scrollsnaplist) scrollSnapList

Parameters: `none`

Returns: `number[]`

Get an array containing all the snap point positions. Each position represents how far the carousel needs to progress in order to reach this position.

* * *

### [scrollprogress permalink](https://www.embla-carousel.com/api/methods/\#scrollprogress) scrollProgress

Parameters: `none`

Returns: `number`

Check how far the carousel has scrolled of its scrollable length from 0 - 1. For example, **0.5 equals 50%**. For example, this can be useful when creating a scroll progress bar.

* * *

### [slidesinview permalink](https://www.embla-carousel.com/api/methods/\#slidesinview) slidesInView

Parameters: `none`

Returns: `number[]`

Get slide indexes **visible** in the carousel viewport. Honors the [inViewThreshold](https://www.embla-carousel.com/api/options/#inviewthreshold) option.

* * *

### [slidesnotinview permalink](https://www.embla-carousel.com/api/methods/\#slidesnotinview) slidesNotInView

Parameters: `none`

Returns: `number[]`

Get slide indexes **not visible** in the carousel viewport. Honors the [inViewThreshold](https://www.embla-carousel.com/api/options/#inviewthreshold) option.

* * *

### [internalengine permalink](https://www.embla-carousel.com/api/methods/\#internalengine) internalEngine

Parameters: `none`

Returns: `EmblaEngineType`

Exposes almost all internal functionality used by Embla. Useful when creating plugins or similar.

**Note:** Please **refrain** from creating **bug reports** related to this
method. If you're using this and running into problems, it's a 99.8% chance
that you don't understand how this works. Use at your own risk.

* * *

### [reinit permalink](https://www.embla-carousel.com/api/methods/\#reinit) reInit

Parameters: `options?: EmblaOptionsType`, `plugins?: EmblaPluginType[]`

Returns: `void`

Hard reset the carousel after it has been initialized. This method allows for changing [options](https://www.embla-carousel.com/api/options/) and [plugins](https://www.embla-carousel.com/api/plugins/) after initializing a carousel.

**Note:** Passed options will be **merged** with current options, but passed
plugins will **replace** current plugins.

* * *

### [plugins permalink](https://www.embla-carousel.com/api/methods/\#plugins) plugins

Parameters: `none`

Returns: `EmblaPluginsType`

Returns an object with key value pairs where the keys are the plugin names, and the plugin API:s are the values.

* * *

### [destroy permalink](https://www.embla-carousel.com/api/methods/\#destroy) destroy

Parameters: `none`

Returns: `void`

Destroy the carousel instance permanently. This is a one way operation and is intended to be used as a cleanup measure when the carousel instance isn't needed anymore.

* * *

### [on permalink](https://www.embla-carousel.com/api/methods/\#on) on

Parameters: `event: EmblaEventType`, `callback: (emblaApi: EmblaCarouselType, eventName: EmblaEventType) => void`

Returns: `void`

**Subscribe** to an Embla specific [event](https://www.embla-carousel.com/api/events/) with a **callback**. Added event listeners will persist even if [reInit](https://www.embla-carousel.com/api/methods/#reinit) is called, either until the carousel is destroyed or the event is removed with the [off](https://www.embla-carousel.com/api/methods/#off) method.

* * *

### [off permalink](https://www.embla-carousel.com/api/methods/\#off) off

Parameters: `event: EmblaEventType`, `callback: (emblaApi: EmblaCarouselType, eventName: EmblaEventType) => void`

Returns: `void`

**Unsubscribe** from an Embla specific [event](https://www.embla-carousel.com/api/events/). Make sure to pass the **same callback reference** when the callback was added with the [on](https://www.embla-carousel.com/api/methods/#on) method.

* * *

### [emit permalink](https://www.embla-carousel.com/api/methods/\#emit) emit

Parameters: `event: EmblaEventType`

Returns: `void`

Emits an embla [event](https://www.embla-carousel.com/api/events/). This doesn't trigger any internal Embla functionality.

* * *

[Edit this page on GitHub](https://github.com/davidjerleke/embla-carousel/blob/master/packages/embla-carousel-docs/src/content/pages/api/methods.mdx)


[Skip to content](https://www.embla-carousel.com/api/plugins/#main-content)

# Plugins

It's possible to **extend** Embla carousel with additional features using **plugins**. The complete list of official plugins can be found [here](https://www.embla-carousel.com/plugins/).

* * *

## [installation permalink](https://www.embla-carousel.com/api/plugins/\#installation) Installation

All **official plugins** are separate **NPM packages**. They're all **prefixed** with `embla-carousel` followed by its **unique** plugin **name**. For example, the `Autoplay` plugin is installed like so:

CDNCDNnpmnpmyarnyarn

Copy code snippet to clipboardCopy

```prism-code html
<script src="https://unpkg.com/embla-carousel-autoplay/embla-carousel-autoplay.umd.js"></script>
```

Copy code snippet to clipboardCopy

```prism-code shell
npm install embla-carousel-autoplay --save
```

Copy code snippet to clipboardCopy

```prism-code shell
yarn add embla-carousel-autoplay
```

## [usage permalink](https://www.embla-carousel.com/api/plugins/\#usage) Usage

The Embla Carousel **constructor** accepts an **array of plugins**. Each plugin might have its own [options](https://www.embla-carousel.com/api/plugins/#constructor-options), [methods](https://www.embla-carousel.com/api/plugins/#calling-methods) and [events](https://www.embla-carousel.com/api/plugins/#adding-event-listeners).

### [adding a plugin permalink](https://www.embla-carousel.com/api/plugins/\#adding-a-plugin) Adding a plugin

The constructor plugin array is the default way of providing plugins to Embla Carousel. In the following example, the [Autoplay](https://www.embla-carousel.com/plugins/autoplay/) plugin is added to the carousel:

VanillaVanillaReactReactVueVueSolidSolidSvelteSvelte

Copy code snippet to clipboardCopy

```prism-code js
import EmblaCarousel from 'embla-carousel'import Autoplay from 'embla-carousel-autoplay'
const emblaNode = document.querySelector('.embla')const embla = EmblaCarousel(emblaNode, { loop: true }, [Autoplay()])
```

Copy code snippet to clipboardCopy

```prism-code jsx
import useEmblaCarousel from 'embla-carousel-react'import Autoplay from 'embla-carousel-autoplay'
export function EmblaCarousel() {  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])
  // ...}
```

Copy code snippet to clipboardCopy

```prism-code html
<script setup>  import emblaCarouselVue from 'embla-carousel-vue'  import Autoplay from 'embla-carousel-autoplay'
  const [emblaRef] = emblaCarouselVue({ loop: true }, [Autoplay()])
  // ...</script>
```

Copy code snippet to clipboardCopy

```prism-code jsx
import createEmblaCarousel from 'embla-carousel-solid'import Autoplay from 'embla-carousel-autoplay'
export function EmblaCarousel() {  const [emblaRef] = createEmblaCarousel(    () => ({ loop: true }),    () => [AutoPlay()]  )
  // ...}
```

Copy code snippet to clipboardCopy

```prism-code html
<script>  import emblaCarouselSvelte from 'embla-carousel-svelte'  import Autoplay from 'embla-carousel-autoplay'
  let plugins = [Autoplay()]</script>
<div class="embla" use:emblaCarouselSvelte="{{ plugins }}">...</div>
```

Note that it's possible to **change plugins** passed to the Embla Carousel
constructor **after initialization** with the [reInit](https://www.embla-carousel.com/api/methods/#reinit)
method.

### [constructor options permalink](https://www.embla-carousel.com/api/plugins/\#constructor-options) Constructor options

Plugins have their own specific **options** which is the first argument of the plugin constructor. This allows for configuring the plugin to your liking:

VanillaVanillaReactReactVueVueSolidSolidSvelteSvelte

Copy code snippet to clipboardCopy

```prism-code js
import EmblaCarousel from 'embla-carousel'import Autoplay from 'embla-carousel-autoplay'
const emblaNode = document.querySelector('.embla')const embla = EmblaCarousel(emblaNode, { loop: true }, [  Autoplay({ delay: 4000 })])
```

Copy code snippet to clipboardCopy

```prism-code jsx
import useEmblaCarousel from 'embla-carousel-react'import Autoplay from 'embla-carousel-autoplay'
export function EmblaCarousel() {  const [emblaRef] = useEmblaCarousel({ loop: true }, [    Autoplay({ delay: 4000 })  ])
  // ...}
```

Copy code snippet to clipboardCopy

```prism-code html
<script setup>  import emblaCarouselVue from 'embla-carousel-vue'  import Autoplay from 'embla-carousel-autoplay'
  const [emblaRef] = emblaCarouselVue({ loop: true }, [    Autoplay({ delay: 4000 })  ])
  // ...</script>
```

Copy code snippet to clipboardCopy

```prism-code jsx
import createEmblaCarousel from 'embla-carousel-solid'import Autoplay from 'embla-carousel-autoplay'
export function EmblaCarousel() {  const [emblaRef] = createEmblaCarousel(    () => ({ loop: true }),    () => [AutoPlay({ delay: 4000 })]  )
  // ...}
```

Copy code snippet to clipboardCopy

```prism-code html
<script>  import emblaCarouselSvelte from 'embla-carousel-svelte'  import Autoplay from 'embla-carousel-autoplay'
  let plugins = [Autoplay({ delay: 4000 })]</script>
<div class="embla" use:emblaCarouselSvelte="{{ plugins }}">...</div>
```

### [global options permalink](https://www.embla-carousel.com/api/plugins/\#global-options) Global options

All [official plugins](https://www.embla-carousel.com/plugins/) allows you to set **global options** that will be applied to all instances. This allows for overriding the default plugin options with your own:

VanillaVanillaReactReactVueVueSolidSolidSvelteSvelte

Copy code snippet to clipboardCopy

```prism-code js
import EmblaCarousel from 'embla-carousel'import Autoplay from 'embla-carousel-autoplay'
Autoplay.globalOptions = { delay: 4000 }
const emblaNode = document.querySelector('.embla')const embla = EmblaCarousel(emblaNode, { loop: true }, [Autoplay()])
```

Copy code snippet to clipboardCopy

```prism-code jsx
import useEmblaCarousel from 'embla-carousel-react'import Autoplay from 'embla-carousel-autoplay'
Autoplay.globalOptions = { delay: 4000 }
export function EmblaCarousel() {  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])
  // ...}
```

Copy code snippet to clipboardCopy

```prism-code html
<script setup>  import emblaCarouselVue from 'embla-carousel-vue'  import Autoplay from 'embla-carousel-autoplay'
  Autoplay.globalOptions = { delay: 4000 }
  const [emblaRef] = emblaCarouselVue({ loop: true }, [Autoplay()])
  // ...</script>
```

Copy code snippet to clipboardCopy

```prism-code jsx
import createEmblaCarousel from 'embla-carousel-solid'import Autoplay from 'embla-carousel-autoplay'
Autoplay.globalOptions = { delay: 4000 }
export function EmblaCarousel() {  const [emblaRef] = createEmblaCarousel(    () => ({ loop: true }),    () => [AutoPlay()]  )
  // ...}
```

Copy code snippet to clipboardCopy

```prism-code html
<script>  import emblaCarouselSvelte from 'embla-carousel-svelte'  import Autoplay from 'embla-carousel-autoplay'
  Autoplay.globalOptions = { delay: 4000 }
  let plugins = [Autoplay()]</script>
<div class="embla" use:emblaCarouselSvelte="{{ plugins }}">...</div>
```

Make sure to assign global options **before** initializing any carousel and
**only assign it once**. Re-assigning global options might lead to confusing
code and unexpected behaviour.

### [calling methods permalink](https://www.embla-carousel.com/api/plugins/\#calling-methods) Calling methods

Additionally, some plugins expose their own **API methods**. You can access plugin methods by calling the [plugin](https://www.embla-carousel.com/api/methods/#plugins) method like demonstrated below:

VanillaVanillaReactReactVueVueSolidSolidSvelteSvelte

Copy code snippet to clipboardCopy

```prism-code js
import EmblaCarousel from 'embla-carousel'import Autoplay from 'embla-carousel-autoplay'
const emblaNode = document.querySelector('.embla')const emblaApi = EmblaCarousel(emblaNode, { loop: true }, [Autoplay()])
emblaApi.plugins().autoplay.stop()
```

Copy code snippet to clipboardCopy

```prism-code jsx
import { useEffect } from 'react'import useEmblaCarousel from 'embla-carousel-react'import Autoplay from 'embla-carousel-autoplay'
export function EmblaCarousel() {  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])
  useEffect(() => {    if (emblaApi) emblaApi.plugins().autoplay.stop()  }, [emblaApi])
  // ...}
```

Copy code snippet to clipboardCopy

```prism-code html
<script setup>  import { onMounted } from 'vue'  import emblaCarouselVue from 'embla-carousel-vue'  import Autoplay from 'embla-carousel-autoplay'
  const [emblaRef, emblaApi] = emblaCarouselVue({ loop: true }, [Autoplay()])
  onMounted(() => {    if (emblaApi.value) emblaApi.value.plugins().autoplay.stop()  })
  // ...</script>
```

Copy code snippet to clipboardCopy

```prism-code jsx
import { onMount } from 'solid-js'import createEmblaCarousel from 'embla-carousel-solid'import Autoplay from 'embla-carousel-autoplay'
export function EmblaCarousel() {  const [emblaRef, emblaApi] = createEmblaCarousel(    () => ({ loop: true }),    () => [AutoPlay()]  )
  onMount(() => {    const api = emblaApi()    if (api) api.plugins().autoplay.stop()  })
  // ...}
```

Copy code snippet to clipboardCopy

```prism-code html
<script>  import emblaCarouselSvelte from 'embla-carousel-svelte'  import Autoplay from 'embla-carousel-autoplay'
  let emblaApi  let plugins = [Autoplay()]
  function onInit(event) {    emblaApi = event.detail    emblaApi.plugins().autoplay.stop()  }</script>
<div  class="embla"  use:emblaCarouselSvelte="{{ plugins }}"  onemblaInit="{onInit}">  ...</div>
```

**Note:** Starting with Svelte 5, the `on:` event handlers have been deprecated. However, `on:emblaInit` will remain for backward compatibility.

### [adding event listeners permalink](https://www.embla-carousel.com/api/plugins/\#adding-event-listeners) Adding event listeners

Some plugins fire their own **events**. Plugin events are structured as follows `<plugin-name>:eventname`. [Adding](https://www.embla-carousel.com/api/events/#adding-event-listeners) and [removing](https://www.embla-carousel.com/api/events/#removing-event-listeners) plugin event listeners is done the same way as native Embla events. Here's an example where an event is added to the autoplay plugin:

VanillaVanillaReactReactVueVueSolidSolidSvelteSvelte

Copy code snippet to clipboardCopy

```prism-code js
import EmblaCarousel from 'embla-carousel'import Autoplay from 'embla-carousel-autoplay'
const emblaNode = document.querySelector('.embla')const emblaApi = EmblaCarousel(emblaNode, { loop: true }, [Autoplay()])
function logPluginEvent(emblaApi, eventName) {  console.log(`Autoplay just triggered ${eventName}!`)}
emblaApi.on('autoplay:stop', logPluginEvent)
```

Copy code snippet to clipboardCopy

```prism-code jsx
import { useEffect, useCallback } from 'react'import useEmblaCarousel from 'embla-carousel-react'import Autoplay from 'embla-carousel-autoplay'
export function EmblaCarousel() {  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])
  const logPluginEvent = useCallback((emblaApi, eventName) => {    console.log(`Autoplay just triggered ${eventName}!`)  }, [])
  useEffect(() => {    if (emblaApi) emblaApi.on('autoplay:stop', logPluginEvent)  }, [emblaApi, logPluginEvent])
  // ...}
```

Copy code snippet to clipboardCopy

```prism-code html
<script setup>  import { onMounted } from 'vue'  import emblaCarouselVue from 'embla-carousel-vue'  import Autoplay from 'embla-carousel-autoplay'
  const [emblaRef, emblaApi] = emblaCarouselVue({ loop: true }, [Autoplay()])
  function logPluginEvent(emblaApi, eventName) {    console.log(`Autoplay just triggered ${eventName}!`)  }
  onMounted(() => {    if (emblaApi.value) emblaApi.value.on('autoplay:stop', logPluginEvent)  })
  // ...</script>
```

Copy code snippet to clipboardCopy

```prism-code jsx
import { onMount } from 'solid-js'import createEmblaCarousel from 'embla-carousel-solid'import Autoplay from 'embla-carousel-autoplay'
export function EmblaCarousel() {  const [emblaRef, emblaApi] = createEmblaCarousel(    () => ({ loop: true }),    () => [AutoPlay()]  )
  function logPluginEvent(emblaApi, eventName) {    console.log(`Autoplay just triggered ${eventName}!`)  }
  onMount(() => {    const api = emblaApi()    if (api) api.on('autoplay:stop', logPluginEvent)  })
  // ...}
```

Copy code snippet to clipboardCopy

```prism-code html
<script>  import emblaCarouselSvelte from 'embla-carousel-svelte'  import Autoplay from 'embla-carousel-autoplay'
  let emblaApi  let plugins = [Autoplay()]
  function logPluginEvent(emblaApi, eventName) {    console.log(`Autoplay just triggered ${eventName}!`)  }
  function onInit(event) {    emblaApi = event.detail    emblaApi.on('autoplay:stop', logPluginEvent)  }</script>
<div  class="embla"  use:emblaCarouselSvelte="{{ plugins }}"  onemblaInit="{onInit}">  ...</div>
```

**Note:** Starting with Svelte 5, the `on:` event handlers have been deprecated. However, `on:emblaInit` will remain for backward compatibility.

### [typescript permalink](https://www.embla-carousel.com/api/plugins/\#typescript) TypeScript

The `EmblaPluginType` is obtained directly from the **core package** `embla-carousel` and used like so:

VanillaVanillaReactReactVueVueSolidSolidSvelteSvelte

Copy code snippet to clipboardCopy

```prism-code tsx
import EmblaCarousel, { EmblaPluginType } from 'embla-carousel'import Autoplay from 'embla-carousel-autoplay'
const emblaNode = document.querySelector('.embla')const plugins: EmblaPluginType[] = [Autoplay()]const emblaApi = EmblaCarousel(emblaNode, { loop: true }, plugins)
```

Copy code snippet to clipboardCopy

```prism-code tsx
import React from 'react'import { EmblaPluginType } from 'embla-carousel'import useEmblaCarousel from 'embla-carousel-react'import Autoplay from 'embla-carousel-autoplay'
type PropType = {  plugins?: EmblaPluginType[]}
export function EmblaCarousel(props) {  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, props.plugins)
  // ...}
```

If you're using `pnpm`, you need to install `embla-carousel` as a
**devDependency** when importing types from it like demonstrated above.

This is because even though `embla-carousel-react` has `embla-carousel` as a
dependency, `pnpm` makes nested dependencies inaccessible by design.

Copy code snippet to clipboardCopy

```prism-code html
<script setup lang="ts">  import { EmblaPluginType } from 'embla-carousel'  import emblaCarouselVue from 'embla-carousel-vue'  import Autoplay from 'embla-carousel-autoplay'
  const plugins: EmblaPluginType[] = [Autoplay()]  const [emblaRef] = emblaCarouselVue({ loop: true }, plugins)
  // ...</script>
```

If you're using `pnpm`, you need to install `embla-carousel` as a
**devDependency** when importing types from it like demonstrated above.

This is because even though `embla-carousel-vue` has `embla-carousel` as a
dependency, `pnpm` makes nested dependencies inaccessible by design.

Copy code snippet to clipboardCopy

```prism-code tsx
import { EmblaPluginType } from 'embla-carousel'import createEmblaCarousel from 'embla-carousel-solid'import Autoplay from 'embla-carousel-autoplay'
type PropType = {  plugins?: EmblaPluginType[]}
export function EmblaCarousel(props) {  const [emblaRef, emblaApi] = createEmblaCarousel(    () => ({ loop: true }),    props.plugins  )
  // ...}
```

If you're using `pnpm`, you need to install `embla-carousel` as a
**devDependency** when importing types from it like demonstrated above.

This is because even though `embla-carousel-solid` has `embla-carousel` as a
dependency, `pnpm` makes nested dependencies inaccessible by design.

Copy code snippet to clipboardCopy

```prism-code html
<script>  import { EmblaPluginType } from 'embla-carousel'  import emblaCarouselSvelte from 'embla-carousel-svelte'  import Autoplay from 'embla-carousel-autoplay'
  let emblaApi  let plugins: EmblaPluginType[] = [Autoplay()]</script>
<div class="embla" use:emblaCarouselSvelte="{{ plugins }}">...</div>
```

If you're using `pnpm`, you need to install `embla-carousel` as a
**devDependency** when importing types from it like demonstrated above.

This is because even though `embla-carousel-svelte` has `embla-carousel` as a
dependency, `pnpm` makes nested dependencies inaccessible by design.

[Edit this page on GitHub](https://github.com/davidjerleke/embla-carousel/blob/master/packages/embla-carousel-docs/src/content/pages/api/plugins.mdx)

[Skip to content](https://www.embla-carousel.com/api/options/#main-content)

# Options

Embla Carousel takes various **options** in order to customize how the carousel works.

* * *

## [usage permalink](https://www.embla-carousel.com/api/options/\#usage) Usage

You can provide **options** in **two different ways**: With the [constructor options](https://www.embla-carousel.com/api/options/#constructor-options) and/or [global options](https://www.embla-carousel.com/api/options/#global-options). If both are provided, they will be merged, and if any options are in conflict, the **constructor option** has precedence and will **override global options**.

### [constructor options permalink](https://www.embla-carousel.com/api/options/\#constructor-options) Constructor options

The constructor options is the default way of providing options to Embla Carousel. In the following example, the carousel [loop](https://www.embla-carousel.com/api/options/#loop) option is set to `true`:

VanillaVanillaReactReactVueVueSolidSolidSvelteSvelte

Copy code snippet to clipboardCopy

```prism-code js
import EmblaCarousel from 'embla-carousel'
const emblaNode = document.querySelector('.embla')const emblaApi = EmblaCarousel(emblaNode, { loop: true })
```

Copy code snippet to clipboardCopy

```prism-code jsx
import useEmblaCarousel from 'embla-carousel-react'
export function EmblaCarousel() {  const [emblaRef] = useEmblaCarousel({ loop: true })
  // ...}
```

Copy code snippet to clipboardCopy

```prism-code html
<script setup>  import emblaCarouselVue from 'embla-carousel-vue'
  const [emblaRef] = emblaCarouselVue({ loop: true })
  // ...</script>
```

Copy code snippet to clipboardCopy

```prism-code jsx
import createEmblaCarousel from 'embla-carousel-solid'
export function EmblaCarousel() {  const [emblaRef] = createEmblaCarousel(() => ({ loop: true }))
  // ...}
```

Copy code snippet to clipboardCopy

```prism-code html
<script>  import emblaCarouselSvelte from 'embla-carousel-svelte'
  let options = { loop: true }</script>
<div class="embla" use:emblaCarouselSvelte="{{ options }}">...</div>
```

### [global options permalink](https://www.embla-carousel.com/api/options/\#global-options) Global options

Setting **global options** will be applied to **all carousels** which will override the Embla default options with your own. In the following example [loop](https://www.embla-carousel.com/api/options/#loop) is set to `true`:

VanillaVanillaReactReactVueVueSolidSolidSvelteSvelte

Copy code snippet to clipboardCopy

```prism-code js
import EmblaCarousel from 'embla-carousel'
EmblaCarousel.globalOptions = { loop: true }
const emblaNode = document.querySelector('.embla')const emblaApi = EmblaCarousel(emblaNode, { align: 'start' })
```

Copy code snippet to clipboardCopy

```prism-code jsx
import useEmblaCarousel from 'embla-carousel-react'
useEmblaCarousel.globalOptions = { loop: true }
export function EmblaCarousel() {  const [emblaRef] = useEmblaCarousel({ align: 'start' })
  // ...}
```

Copy code snippet to clipboardCopy

```prism-code html
<script setup>  import emblaCarouselVue from 'embla-carousel-vue'
  emblaCarouselVue.globalOptions = { loop: true }
  const [emblaRef] = emblaCarouselVue({ align: 'start' })
  // ...</script>
```

Copy code snippet to clipboardCopy

```prism-code jsx
import createEmblaCarousel from 'embla-carousel-solid'
createEmblaCarousel.globalOptions = { loop: true }
export function EmblaCarousel() {  const [emblaRef] = createEmblaCarousel(() => ({ align: 'start' }))
  // ...}
```

Copy code snippet to clipboardCopy

```prism-code html
<script>  import emblaCarouselSvelte from 'embla-carousel-svelte'
  emblaCarouselSvelte.globalOptions = { loop: true }
  let options = { align: 'start' }</script>
<div class="embla" use:emblaCarouselSvelte="{{ options }}">...</div>
```

Make sure to assign global options **before** initializing any carousel and
**only assign it once**. Re-assigning global options might lead to confusing
code and unexpected behaviour.

### [changing options permalink](https://www.embla-carousel.com/api/options/\#changing-options) Changing options

It's possible to **change options** passed to the Embla Carousel constructor **after initialization** with the [reInit](https://www.embla-carousel.com/api/methods/#reinit) method.

In [React](https://www.embla-carousel.com/get-started/react/), [Vue](https://www.embla-carousel.com/get-started/vue/), [Solid](https://www.embla-carousel.com/get-started/solid/) and [Svelte](https://www.embla-carousel.com/get-started/svelte/) wrappers you can pass **reactive options** and the carousel will automatically reinitialize when they change. Here are some examples:

VanillaVanillaReactReactVueVueSolidSolidSvelteSvelte

Copy code snippet to clipboardCopy

```prism-code js
import EmblaCarousel from 'embla-carousel'
const emblaNode = document.querySelector('.embla')const emblaApi = EmblaCarousel(emblaNode, { loop: true })
emblaApi.reInit({ loop: false })
```

Copy code snippet to clipboardCopy

```prism-code jsx
import { useState, useCallback } from 'react'import useEmblaCarousel from 'embla-carousel-react'
export function EmblaCarousel() {  const [options, setOptions] = useState({ loop: true })  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const toggleLoop = useCallback(() => {    setOptions((currentOptions) => ({      ...currentOptions,      loop: !currentOptions.loop    }))  }, [])
  // ...}
```

Copy code snippet to clipboardCopy

```prism-code html
<script setup>  import emblaCarouselVue from 'embla-carousel-vue'
  const options = ref({ loop: true })  const [emblaRef, emblaApi] = emblaCarouselVue(options)
  function toggleLoop() {    options.value = {      ...options.value,      loop: !options.value.loop    }  }
  // ...</script>
```

Copy code snippet to clipboardCopy

```prism-code jsx
import { createSignal } from 'solid-js'import createEmblaCarousel from 'embla-carousel-solid'
export function EmblaCarousel() {  const [options, setOptions] = createSignal({ loop: true })  const [emblaRef] = createEmblaCarousel(() => options())
  function toggleLoop() {    setOptions((currentOptions) => ({      ...currentOptions,      loop: !currentOptions.loop    }))  }
  // ...}
```

Copy code snippet to clipboardCopy

```prism-code html
<script>  import emblaCarouselSvelte from 'embla-carousel-svelte'
  let options = { loop: true }
  function toggleLoop() {    options = {      ...options,      loop: !options.loop    }  }</script>
<div class="embla" use:emblaCarouselSvelte="{{ options }}">...</div>
```

### [typescript permalink](https://www.embla-carousel.com/api/options/\#typescript) TypeScript

The `EmblaOptionsType` is obtained directly from the **core package** `embla-carousel` and used like so:

VanillaVanillaReactReactVueVueSolidSolidSvelteSvelte

Copy code snippet to clipboardCopy

```prism-code tsx
import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
const emblaNode = document.querySelector('.embla')const options: EmblaOptionsType = { loop: true }const emblaApi = EmblaCarousel(emblaNode, options)
```

Copy code snippet to clipboardCopy

```prism-code tsx
import React from 'react'import { EmblaOptionsType } from 'embla-carousel'import useEmblaCarousel from 'embla-carousel-react'
type PropType = {  options?: EmblaOptionsType}
export function EmblaCarousel(props: PropType) {  const [emblaRef, emblaApi] = useEmblaCarousel(props.options)
  // ...}
```

If you're using `pnpm`, you need to install `embla-carousel` as a
**devDependency** when importing types from it like demonstrated above.

This is because even though `embla-carousel-react` has `embla-carousel` as a
dependency, `pnpm` makes nested dependencies inaccessible by design.

Copy code snippet to clipboardCopy

```prism-code html
<script setup lang="ts">  import { EmblaOptionsType } from 'embla-carousel'  import emblaCarouselVue from 'embla-carousel-vue'
  const options: EmblaOptionsType = { loop: true }  const [emblaRef] = emblaCarouselVue(options)
  // ...</script>
```

If you're using `pnpm`, you need to install `embla-carousel` as a
**devDependency** when importing types from it like demonstrated above.

This is because even though `embla-carousel-vue` has `embla-carousel` as a
dependency, `pnpm` makes nested dependencies inaccessible by design.

Copy code snippet to clipboardCopy

```prism-code tsx
import { EmblaOptionsType } from 'embla-carousel'import createEmblaCarousel from 'embla-carousel-solid'
type PropType = {  options?: EmblaOptionsType}
export function EmblaCarousel(props) {  const [emblaRef] = createEmblaCarousel(props.options)
  // ...}
```

If you're using `pnpm`, you need to install `embla-carousel` as a
**devDependency** when importing types from it like demonstrated above.

This is because even though `embla-carousel-solid` has `embla-carousel` as a
dependency, `pnpm` makes nested dependencies inaccessible by design.

Copy code snippet to clipboardCopy

```prism-code html
<script>  import { EmblaOptionsType } from 'embla-carousel'  import emblaCarouselSvelte from 'embla-carousel-svelte'
  let options: EmblaOptionsType = { loop: true }</script>
<div class="embla" use:emblaCarouselSvelte="{{ options }}">...</div>
```

If you're using `pnpm`, you need to install `embla-carousel` as a
**devDependency** when importing types from it like demonstrated above.

This is because even though `embla-carousel-svelte` has `embla-carousel` as a
dependency, `pnpm` makes nested dependencies inaccessible by design.

## [reference permalink](https://www.embla-carousel.com/api/options/\#reference) Reference

Below follows an exhaustive **list of all** Embla Carousel **options** and their default values.

* * *

### [active permalink](https://www.embla-carousel.com/api/options/\#active) active

Type: `boolean`

Default: `true`

Setting this to `false` will not activate or deactivate the carousel. Useful when used together with the [breakpoints](https://www.embla-carousel.com/api/options/#breakpoints) option to toggle the carousel active/inactive depending on media queries.

* * *

### [align permalink](https://www.embla-carousel.com/api/options/\#align) align

Type: `string | (viewSize: number, snapSize: number, index: number) => number`

Default: `center`

Align the slides relative to the carousel viewport. Use one of the predefined alignments `start`, `center` or `end`. Alternatively, provide your own callback to fully customize the alignment.

* * *

### [axis permalink](https://www.embla-carousel.com/api/options/\#axis) axis

Type: `string`

Default: `x`

Choose scroll axis between `x` and `y`. Remember to stack your slides horizontally or vertically using CSS to match this option.

* * *

### [breakpoints permalink](https://www.embla-carousel.com/api/options/\#breakpoints) breakpoints

Type: `EmblaOptionsType`

Default: `{}`

An object with options that will be applied for a given breakpoint by overriding the options at the root level. Example: `'(min-width: 768px)': { loop: false }`.

**Note:** If multiple queries match, they will be merged. And when breakpoint
options clash, the last one in the list has precedence.

* * *

### [container permalink](https://www.embla-carousel.com/api/options/\#container) container

Type: `string | HTMLElement | null`

Default: `null`

Enables choosing a custom container element which holds the slides. By **default**, Embla will choose the **first direct child element** of the **root element**. Provide either a valid `CSS selector string` or a `HTML element`.

* * *

### [containscroll permalink](https://www.embla-carousel.com/api/options/\#containscroll) containScroll

Type: `false` \| `string`

Default: `'trimSnaps'`

Clear leading and trailing empty space that causes excessive scrolling. Use `trimSnaps` to only use snap points that trigger scrolling or `keepSnaps` to keep them.

**Note:** When this is active, it will **override alignments** applied by the
[align](https://www.embla-carousel.com/api/options/#align) option for enough slides at the **start** and the **end** of
the carousel, in order to **cover** the **leading** and **trailing space**.

* * *

### [direction permalink](https://www.embla-carousel.com/api/options/\#direction) direction

Type: `string`

Default: `ltr`

Choose content direction between `ltr` and `rtl`.

**Note:** When using `rtl`, the content direction also has to be set to RTL,
either by using the [HTML dir\\
attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
or the [CSS\\
direction](https://developer.mozilla.org/en-US/docs/Web/CSS/direction)
property.

* * *

### [dragfree permalink](https://www.embla-carousel.com/api/options/\#dragfree) dragFree

Type: `boolean`

Default: `false`

Enables momentum scrolling. The duration of the continued scrolling is proportional to how vigorous the drag gesture is.

* * *

### [dragthreshold permalink](https://www.embla-carousel.com/api/options/\#dragthreshold) dragThreshold

Type: `number`

Default: `10`

Drag threshold in pixels. This only affects **when** clicks are fired and not. In contrast to other carousel libraries, it will **not affect when dragging** of the carousel **starts**.

**Note:** Browsers handle touch events differently than mouse events. Browsers
won't fire the click event when a touch event includes an accidental slight
swipe gesture. This is why this threshold only works for mouse events.

* * *

### [duration permalink](https://www.embla-carousel.com/api/options/\#duration) duration

Type: `number`

Default: `25`

Set scroll duration when triggered by any of the API methods. Higher numbers enables slower scrolling. Drag interactions are not affected because duration is then determined by the drag force.

**Note:** Duration is **not** in milliseconds because Embla uses an attraction
physics simulation when scrolling instead of easings. Only values between
`20`- `60` are recommended.

* * *

### [inviewthreshold permalink](https://www.embla-carousel.com/api/options/\#inviewthreshold) inViewThreshold

Type: `IntersectionObserverInit.threshold`

Default: `0`

This is the Intersection Observer [threshold](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#creating_an_intersection_observer) option that will be applied to all slides.

* * *

### [loop permalink](https://www.embla-carousel.com/api/options/\#loop) loop

Type: `boolean`

Default: `false`

Enables **infinite looping**. Embla will apply `translateX` or `translateY` to the slides that need to change position in order to create the loop effect.

Embla automatically falls back to `false` if slide content isn't enough to
create the loop effect without visible glitches.

* * *

### [skipsnaps permalink](https://www.embla-carousel.com/api/options/\#skipsnaps) skipSnaps

Type: `boolean`

Default: `false`

Allow the carousel to skip scroll snaps if it's dragged vigorously. Note that this option will be ignored if the [dragFree](https://www.embla-carousel.com/api/options/#dragfree) option is set to `true`.

* * *

### [slides permalink](https://www.embla-carousel.com/api/options/\#slides) slides

Type: `string | HTMLElement[] | NodeListOf<HTMLElement> | null`

Default: `null`

Enables using custom slide elements. By **default**, Embla will choose **all direct child elements** of its [container](https://www.embla-carousel.com/api/options/#container). Provide either a valid `CSS selector string` or a `nodeList/array` containing `HTML elements`.

**Note:** Even though it's possible to provide custom slide elements, they
still have to be **direct descendants** of the carousel container.

**Warning:** If you place elements inside the carousel container that aren't
slides, they either shouldn't have any size, or should be detached from the
document flow with `position: absolute` or similar.

* * *

### [slidestoscroll permalink](https://www.embla-carousel.com/api/options/\#slidestoscroll) slidesToScroll

Type: `string | number`

Default: `1`

Group slides together. Drag interactions, dot navigation, and previous/next buttons are mapped to group slides into the given number, which has to be an integer. Set it to `auto` if you want Embla to group slides automatically.

* * *

### [startindex permalink](https://www.embla-carousel.com/api/options/\#startindex) startIndex

Type: `number`

Default: `0`

Set the initial scroll snap to the given number. First snap index starts at `0`. Please note that this is not necessarily equal to the number of slides when used together with the [slidesToScroll](https://www.embla-carousel.com/api/options/#slidestoscroll) option.

* * *

### [watchdrag permalink](https://www.embla-carousel.com/api/options/\#watchdrag) watchDrag

Type: `boolean | (emblaApi: EmblaCarouselType, event: MouseEvent | TouchEvent) => boolean | void`

Default: `true`

Enables for scrolling the carousel with mouse and touch interactions. Set this to `false` to disable drag events or pass a custom callback to add your own drag logic.

**Note:** When passing a custom callback it will run **before** the default
Embla drag behaviour. Return `true` in your callback if you want Embla to run
its default drag behaviour after your callback, or return `false` if you want
to skip it.

* * *

### [watchfocus permalink](https://www.embla-carousel.com/api/options/\#watchfocus) watchFocus

Type: `boolean | (emblaApi: EmblaCarouselType, event: FocusEvent) => boolean | void`

Default: `true`

Embla automatically watches the [slides](https://www.embla-carousel.com/api/options/api/options/#slides) for focus events. The default callback fires the [slideFocus](https://www.embla-carousel.com/api/events/#slidefocus/) event and [scrolls](https://www.embla-carousel.com/api/methods/#scrollto/) to the focused element. Set this to `false` to disable this behaviour or pass a custom callback to add your own focus logic.

**Note:** When passing a custom callback it will run **before** the default
Embla focus behaviour. Return `true` in your callback if you want Embla to run
its default focus behaviour after your callback, or return `false` if you want
to skip it.

* * *

### [watchresize permalink](https://www.embla-carousel.com/api/options/\#watchresize) watchResize

Type: `boolean | (emblaApi: EmblaCarouselType, entries: ResizeObserverEntry[]) => boolean | void`

Default: `true`

Embla automatically watches the [container](https://www.embla-carousel.com/api/methods/#containernode/) and [slides](https://www.embla-carousel.com/api/methods/#slidenodes/) for size changes and runs [reInit](https://www.embla-carousel.com/api/methods/#reinit/) when any size has changed. Set this to `false` to disable this behaviour or pass a custom callback to add your own resize logic.

**Note:** When passing a custom callback it will run **before** the default
Embla resize behaviour. Return `true` in your callback if you want Embla to
run its default resize behaviour after your callback, or return `false` if you
want to skip it.

* * *

### [watchslides permalink](https://www.embla-carousel.com/api/options/\#watchslides) watchSlides

Type: `boolean | (emblaApi: EmblaCarouselType, mutations: MutationRecord[]) => boolean | void`

Default: `true`

Embla automatically watches the [container](https://www.embla-carousel.com/api/methods/#containernode/) for **added** and/or **removed** slides and runs [reInit](https://www.embla-carousel.com/api/methods/#reinit/) if needed. Set this to `false` to disable this behaviour or pass a custom callback to add your own slides changed logic.

**Note:** When passing a custom callback it will run **before** the default
Embla mutation behaviour. Return `true` in your callback if you want Embla to
run its default mutation behaviour after your callback, or return `false` if
you want to skip it.

* * *

[Edit this page on GitHub](https://github.com/davidjerleke/embla-carousel/blob/master/packages/embla-carousel-docs/src/content/pages/api/options.mdx)

[Skip to content](https://www.embla-carousel.com/api/events/#main-content)

# Events

Embla Carousel exposes **events** that you can listen to in order to **react** to **changes** in the carousel.

* * *

## [usage permalink](https://www.embla-carousel.com/api/events/\#usage) Usage

You need an **initialized carousel** in order to **make use of events**. Events will only be fired during the lifecycle of a carousel and added event listeners will persist even when you hard reset the carousel with the [reInit](https://www.embla-carousel.com/api/methods/#reinit) method.

### [adding event listeners permalink](https://www.embla-carousel.com/api/events/\#adding-event-listeners) Adding event listeners

After initializing a carousel, we're going to **subscribe** to the [slidesInView](https://www.embla-carousel.com/api/events/#slidesinview) **event** in the following example:

VanillaVanillaReactReactVueVueSolidSolidSvelteSvelte

Copy code snippet to clipboardCopy

```prism-code js
import EmblaCarousel from 'embla-carousel'
const emblaNode = document.querySelector('.embla')const emblaApi = EmblaCarousel(emblaNode)
function logSlidesInView(emblaApi) {  console.log(emblaApi.slidesInView())}
emblaApi.on('slidesInView', logSlidesInView)
```

Copy code snippet to clipboardCopy

```prism-code jsx
import { useCallback, useEffect } from 'react'import useEmblaCarousel from 'embla-carousel-react'
export function EmblaCarousel() {  const [emblaRef, emblaApi] = useEmblaCarousel()
  const logSlidesInView = useCallback((emblaApi) => {    console.log(emblaApi.slidesInView())  }, [])
  useEffect(() => {    if (emblaApi) emblaApi.on('slidesInView', logSlidesInView)  }, [emblaApi, logSlidesInView])
  // ...}
```

Copy code snippet to clipboardCopy

```prism-code html
<script setup>  import { onMounted } from 'vue'  import emblaCarouselVue from 'embla-carousel-vue'
  const [emblaRef, emblaApi] = emblaCarouselVue()
  function logSlidesInView(emblaApi) {    console.log(emblaApi.slidesInView())  }
  onMounted(() => {    if (emblaApi.value) emblaApi.value.on('slidesInView', logSlidesInView)  })
  // ...</script>
```

Copy code snippet to clipboardCopy

```prism-code jsx
import { onMount } from 'solid-js'import createEmblaCarousel from 'embla-carousel-solid'
export function EmblaCarousel() {  const [emblaRef, emblaApi] = createEmblaCarousel()
  function logSlidesInView(emblaApi) {    console.log(emblaApi.slidesInView())  }
  onMount(() => {    const api = emblaApi()    if (api) api.on('slidesInView', logSlidesInView)  })
  // ...}
```

Copy code snippet to clipboardCopy

```prism-code html
<script>  import emblaCarouselSvelte from 'embla-carousel-svelte'
  let emblaApi
  function logSlidesInView(emblaApi) {    console.log(emblaApi.slidesInView())  }
  function onInit(event) {    emblaApi = event.detail    emblaApi.on('slidesInView', logSlidesInView)  }</script>
<div class="embla" use:emblaCarouselSvelte onemblaInit="{onInit}">...</div>
```

**Note:** Starting with Svelte 5, the `on:` event handlers have been deprecated. However, `on:emblaInit` will remain for backward compatibility.

### [removing event listeners permalink](https://www.embla-carousel.com/api/events/\#removing-event-listeners) Removing event listeners

In order to remove an event listener, you'll have to call the [off](https://www.embla-carousel.com/api/methods/#off) method and make sure to pass the **same callback reference** you passed to the [on](https://www.embla-carousel.com/api/methods/#off) method:

VanillaVanillaReactReactVueVueSolidSolidSvelteSvelte

Copy code snippet to clipboardCopy

```prism-code js
import EmblaCarousel from 'embla-carousel'
const emblaNode = document.querySelector('.embla')const emblaApi = EmblaCarousel(emblaNode)
function logSlidesInViewOnce(emblaApi) {  console.log(emblaApi.slidesInView())  emblaApi.off('slidesInView', logSlidesInViewOnce)}
emblaApi.on('slidesInView', logSlidesInViewOnce)
```

Copy code snippet to clipboardCopy

```prism-code jsx
import { useCallback, useEffect } from 'react'import useEmblaCarousel from 'embla-carousel-react'
export function EmblaCarousel() {  const [emblaRef, emblaApi] = useEmblaCarousel()
  const logSlidesInViewOnce = useCallback((emblaApi) => {    console.log(emblaApi.slidesInView())    emblaApi.off('slidesInView', logSlidesInViewOnce)  }, [])
  useEffect(() => {    if (emblaApi) emblaApi.on('slidesInView', logSlidesInViewOnce)  }, [emblaApi, logSlidesInViewOnce])
  // ...}
```

Copy code snippet to clipboardCopy

```prism-code html
<script setup>  import { onMounted } from 'vue'  import emblaCarouselVue from 'embla-carousel-vue'
  const [emblaRef, emblaApi] = emblaCarouselVue()
  function logSlidesInViewOnce(emblaApi) {    console.log(emblaApi.slidesInView())    emblaApi.off('slidesInView', logSlidesInViewOnce)  }
  onMounted(() => {    if (emblaApi.value) emblaApi.value.on('slidesInView', logSlidesInViewOnce)  })
  // ...</script>
```

Copy code snippet to clipboardCopy

```prism-code jsx
import { onMount } from 'solid-js'import createEmblaCarousel from 'embla-carousel-solid'
export function EmblaCarousel() {  const [emblaRef, emblaApi] = createEmblaCarousel()
  function logSlidesInViewOnce(emblaApi) {    console.log(emblaApi.slidesInView())    emblaApi.off('slidesInView', logSlidesInViewOnce)  }
  onMount(() => {    const api = emblaApi()    if (api) api.on('slidesInView', logSlidesInViewOnce)  })
  // ...}
```

Copy code snippet to clipboardCopy

```prism-code html
<script>  import emblaCarouselSvelte from 'embla-carousel-svelte'
  let emblaApi
  function logSlidesInViewOnce(emblaApi) {    console.log(emblaApi.slidesInView())    emblaApi.off('slidesInView', logSlidesInViewOnce)  }
  function onInit(event) {    emblaApi = event.detail    emblaApi.on('slidesInView', logSlidesInViewOnce)  }</script>
<div class="embla" use:emblaCarouselSvelte onemblaInit="{onInit}">...</div>
```

**Note:** Starting with Svelte 5, the `on:` event handlers have been deprecated. However, `on:emblaInit` will remain for backward compatibility.

### [typescript permalink](https://www.embla-carousel.com/api/events/\#typescript) TypeScript

The `EmblaEventType` is obtained directly from the **core package** `embla-carousel` and used like so:

VanillaVanillaReactReactVueVueSolidSolidSvelteSvelte

Copy code snippet to clipboardCopy

```prism-code tsx
import EmblaCarousel, {  EmblaCarouselType,  EmblaEventType} from 'embla-carousel'
const emblaNode = document.querySelector('.embla')const emblaApi = EmblaCarousel(emblaNode)
function logEmblaEvent(  emblaApi: EmblaCarouselType,  eventName: EmblaEventType): void {  console.log(`Embla just triggered ${eventName}!`)}
emblaApi.on('slidesInView', logEmblaEvent)
```

Copy code snippet to clipboardCopy

```prism-code tsx
import React, { useCallback } from 'react'import { EmblaCarouselType, EmblaEventType } from 'embla-carousel'import useEmblaCarousel from 'embla-carousel-react'
export function EmblaCarousel() {  const [emblaRef, emblaApi] = useEmblaCarousel()
  const logEmblaEvent = useCallback(    (emblaApi: EmblaCarouselType, eventName: EmblaEventType) => {      console.log(`Embla just triggered ${eventName}!`)    },    []  )
  useEffect(() => {    if (emblaApi) emblaApi.on('slidesInView', logEmblaEvent)  }, [emblaApi, logEmblaEvent])
  // ...}
```

If you're using `pnpm`, you need to install `embla-carousel` as a
**devDependency** when importing types from it like demonstrated above.

This is because even though `embla-carousel-react` has `embla-carousel` as a
dependency, `pnpm` makes nested dependencies inaccessible by design.

Copy code snippet to clipboardCopy

```prism-code html
<script setup>  import { onMounted } from 'vue'  import { EmblaCarouselType, EmblaEventType } from 'embla-carousel'  import emblaCarouselVue from 'embla-carousel-vue'
  const [emblaRef] = emblaCarouselVue()
  function logEmblaEvent(    emblaApi: EmblaCarouselType,    eventName: EmblaEventType  ): void {    console.log(`Embla just triggered ${eventName}!`)  }
  onMounted(() => {    if (emblaApi.value) emblaApi.value.on('slidesInView', logEmblaEvent)  })
  // ...</script>
```

If you're using `pnpm`, you need to install `embla-carousel` as a
**devDependency** when importing types from it like demonstrated above.

This is because even though `embla-carousel-vue` has `embla-carousel` as a
dependency, `pnpm` makes nested dependencies inaccessible by design.

Copy code snippet to clipboardCopy

```prism-code jsx
import { onMount } from 'solid-js'import { EmblaCarouselType, EmblaEventType } from 'embla-carousel'import createEmblaCarousel from 'embla-carousel-solid'
export function EmblaCarousel() {  const [emblaRef, emblaApi] = createEmblaCarousel()
  function logEmblaEvent(    emblaApi: EmblaCarouselType,    eventName: EmblaEventType  ): void {    console.log(`Embla just triggered ${eventName}!`)  }
  onMount(() => {    const api = emblaApi()    if (api) api.on('slidesInView', logEmblaEvent)  })
  // ...}
```

If you're using `pnpm`, you need to install `embla-carousel` as a
**devDependency** when importing types from it like demonstrated above.

This is because even though `embla-carousel-solid` has `embla-carousel` as a
dependency, `pnpm` makes nested dependencies inaccessible by design.

Copy code snippet to clipboardCopy

```prism-code html
<script>  import { EmblaCarouselType, EmblaEventType } from 'embla-carousel'  import emblaCarouselSvelte from 'embla-carousel-svelte'
  let emblaApi: EmblaCarouselType
  function logEmblaEvent(    emblaApi: EmblaCarouselType,    eventName: EmblaEventType  ): void {    console.log(`Embla just triggered ${eventName}!`)  }
  function onInit(event: CustomEvent<EmblaCarouselType>): void {    emblaApi = event.detail    emblaApi.on('slidesInView', logEmblaEvent)  }</script>
<div class="embla" use:emblaCarouselSvelte onemblaInit="{onInit}">...</div>
```

**Note:** Starting with Svelte 5, the `on:` event handlers have been deprecated. However, `on:emblaInit` will remain for backward compatibility.

If you're using `pnpm`, you need to install `embla-carousel` as a
**devDependency** when importing types from it like demonstrated above.

This is because even though `embla-carousel-svelte` has `embla-carousel` as a
dependency, `pnpm` makes nested dependencies inaccessible by design.

## [reference permalink](https://www.embla-carousel.com/api/events/\#reference) Reference

Below follows an exhaustive **list of all** Embla Carousel **events** together with information about how they work.

* * *

### [init permalink](https://www.embla-carousel.com/api/events/\#init) init

Once: `yes`

Runs when the carousel mounts for the first time. This only fires once which means that it won't fire when the carousel is re-initialized using the [reInit](https://www.embla-carousel.com/api/methods/#reinit) method.

* * *

### [reinit permalink](https://www.embla-carousel.com/api/events/\#reinit) reInit

Once: `no`

Runs when the [reInit](https://www.embla-carousel.com/api/methods/#reinit) method is called. When the window is resized, Embla Carousel automatically calls the [reInit](https://www.embla-carousel.com/api/methods/#reinit) method which will also fire this event.

* * *

### [destroy permalink](https://www.embla-carousel.com/api/events/\#destroy) destroy

Once: `yes`

Runs when the carousel has been destroyed using the [destroy](https://www.embla-carousel.com/api/methods/#destroy) method. This only fires once and will be the last event the carousel fires.

* * *

### [select permalink](https://www.embla-carousel.com/api/events/\#select) select

Once: `no`

Runs when the selected scroll snap changes. The select event is triggered by drag interactions or the [scrollNext](https://www.embla-carousel.com/api/methods/#scrollnext), [scrollPrev](https://www.embla-carousel.com/api/methods/#scrollPrev) or [scrollTo](https://www.embla-carousel.com/api/methods/#scrollto) methods.

* * *

### [scroll permalink](https://www.embla-carousel.com/api/events/\#scroll) scroll

Once: `no`

Runs when the carousel is scrolling. It might be a good idea to throttle this if you're doing expensive stuff in your callback function.

* * *

### [settle permalink](https://www.embla-carousel.com/api/events/\#settle) settle

Once: `no`

Runs when the carousel has settled after scroll has been triggered. Please note that this can take longer than you think when [dragFree](https://www.embla-carousel.com/api/options/#dragfree) is enabled or when using slow [transitions](https://www.embla-carousel.com/api/options/#duration).

* * *

### [resize permalink](https://www.embla-carousel.com/api/events/\#resize) resize

Once: `no`

Runs when the carousel container or the slide sizes change. It's using [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) under the hood.

* * *

### [slidesinview permalink](https://www.embla-carousel.com/api/events/\#slidesinview) slidesInView

Once: `no`

Runs when any slide has **entered** or **exited** the viewport. This event is intended to be used together with the [slidesInView](https://www.embla-carousel.com/api/methods/#slidesinview) and/or [slidesNotInView](https://www.embla-carousel.com/api/methods/#slidesnotinview) methods.

* * *

### [slideschanged permalink](https://www.embla-carousel.com/api/events/\#slideschanged) slidesChanged

Once: `no`

Runs when slides are added to, or removed from the carousel [container](https://www.embla-carousel.com/api/options/#container). It's using [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) under the hood.

* * *

### [slidefocus permalink](https://www.embla-carousel.com/api/events/\#slidefocus) slideFocus

Once: `no`

Runs when a slide receives focus. For example, when a focusable element like a button, link or input receives focus inside a slide.

* * *

### [pointerdown permalink](https://www.embla-carousel.com/api/events/\#pointerdown) pointerDown

Once: `no`

Runs when the user has a pointer down on the carousel. It's triggered by a `touchstart` or a `mousedown` event.

* * *

### [pointerup permalink](https://www.embla-carousel.com/api/events/\#pointerup) pointerUp

Once: `no`

Runs when the user has released the pointer from the carousel. It's triggered by a `touchend` or a `mouseup` event.

* * *

[Edit this page on GitHub](https://github.com/davidjerleke/embla-carousel/blob/master/packages/embla-carousel-docs/src/content/pages/api/events.mdx)