<script setup lang="ts">
const canvas = ref<HTMLCanvasElement | null>(null)
const status = ref('Loading core')
const error = ref('')
const paused = ref(false)
const muted = ref(false)

type Emulator = {
  FSInit: () => Promise<void>
  FS: { writeFile: (path: string, data: Uint8Array) => void }
  filePaths: () => { gamePath: string }
  loadGame: (path: string) => boolean
  pauseGame: () => void
  resumeGame: () => void
  setCoreSettings: (settings: { autoSaveStateEnable?: boolean; restoreAutoSaveStateOnLoad?: boolean }) => void
  setVolume: (volume: number) => void
  quitGame: () => void
}

const emulator = shallowRef<Emulator | null>(null)
let disposed = false
let romRequest: AbortController | null = null
let romPath = ''

function errorMessage(cause: unknown, fallback: string) {
  const message = cause instanceof Error ? cause.message : fallback

  if (/WebAssembly\.Memory\(\): could not allocate memory/i.test(message)) {
    return "Couldn't start the emulator. This browser wasn't able to reserve the memory it needs. Close unused tabs or apps and reload the page. If the issue persists, clear site data for bonka.dev or try another browser."
  }

  return message
}

function stop(instance: Emulator | null) {
  if (!instance) return

  try {
    instance.quitGame()
  } catch {
    // Teardown can race with mGBA's initialization; no further action is needed.
  }

  if (emulator.value === instance) emulator.value = null
}

async function start() {
  if (!canvas.value) return

  if (!crossOriginIsolated) {
    error.value = 'The emulator needs cross-origin isolation.'
    return
  }

  try {
    status.value = 'Loading ROM'
    const coreUrl = '/_mgba/mgba.js'
    const { default: createMGBA } = (await import(/* @vite-ignore */ coreUrl)) as {
      default: (options: { canvas: HTMLCanvasElement }) => Promise<Emulator>
    }
    romRequest = new AbortController()
    const response = await fetch('/roms/bonka_welcome.gba', { signal: romRequest.signal })

    if (!response.ok) throw new Error('The Welcome ROM could not be loaded.')

    const instance = await createMGBA({ canvas: canvas.value })
    if (disposed) {
      stop(instance)
      return
    }

    emulator.value = instance
    await instance.FSInit()
    if (disposed) {
      stop(instance)
      return
    }

    instance.setCoreSettings({ autoSaveStateEnable: false, restoreAutoSaveStateOnLoad: false })
    romPath = `${instance.filePaths().gamePath}/bonka_welcome.gba`
    instance.FS.writeFile(romPath, new Uint8Array(await response.arrayBuffer()))
    if (disposed) {
      stop(instance)
      return
    }

    if (!instance.loadGame(romPath)) throw new Error('The Welcome ROM could not be started.')

    status.value = 'Running'
  } catch (cause) {
    if (disposed || (cause instanceof DOMException && cause.name === 'AbortError')) return
    error.value = errorMessage(cause, 'The emulator could not be started.')
  } finally {
    romRequest = null
  }
}

function togglePause() {
  if (!emulator.value) return

  paused.value = !paused.value
  if (paused.value) emulator.value.pauseGame()
  else emulator.value.resumeGame()
  status.value = paused.value ? 'Paused' : 'Running'
}

function restart() {
  const instance = emulator.value
  if (!instance || !romPath) return

  try {
    instance.quitGame()
    instance.setCoreSettings({ autoSaveStateEnable: false, restoreAutoSaveStateOnLoad: false })
    if (!instance.loadGame(romPath)) throw new Error('The Welcome ROM could not be restarted.')

    error.value = ''
    paused.value = false
    status.value = 'Running'
  } catch (cause) {
    error.value = errorMessage(cause, 'The Welcome ROM could not be restarted.')
  }
}

function toggleMute() {
  if (!emulator.value) return

  muted.value = !muted.value
  emulator.value.setVolume(muted.value ? 0 : 1)
}

onMounted(start)
onBeforeUnmount(() => {
  disposed = true
  romRequest?.abort()
  stop(emulator.value)
})
</script>

<template>
  <div class="welcome-emulator">
    <div class="emulator-screen">
      <canvas ref="canvas" width="240" height="160" aria-label="Bonka Welcome ROM" />
      <p v-if="!error && !emulator" class="emulator-loading">{{ status }}<span /></p>
      <p v-if="error" class="emulator-error">{{ error }}</p>
    </div>
    <div class="emulator-status">
      <span><i :class="{ paused }" /> {{ status.toUpperCase() }}</span>
      <span>bonka_welcome.gba</span>
      <div class="emulator-controls">
        <button type="button" :disabled="!emulator" @click="togglePause">{{ paused ? 'Resume' : 'Pause' }}</button>
        <button type="button" :disabled="!emulator" @click="restart">Restart</button>
        <button type="button" :disabled="!emulator" @click="toggleMute">{{ muted ? 'Unmute' : 'Mute' }}</button>
      </div>
    </div>
  </div>
</template>
