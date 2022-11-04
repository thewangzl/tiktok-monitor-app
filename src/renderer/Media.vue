<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TitleBar from '/@/components/TitleBar.vue'
import Player from '/@/components/Player.vue'
import Playlist from '/@/components/Playlist.vue'
import useIpcRendererOn from './hook/useIpcRendererOn'
import { getVideoInfoList } from './utils/video'

import { VideoFile, VideoInfo } from '../common/types'
import { IpcEvents } from '../common/ipcEvents'

const player = ref<InstanceType<typeof Player> | null>(null)
const playlist = ref<InstanceType<typeof Playlist> | null>(null)
const videoName = ref<string>('')

const togglePlaylist = (): void => {
  playlist.value?.toggle()
}

const playVideo = (video: VideoInfo): void => {
  console.dir(video)
  videoName.value = video.name
  player.value?.play(video)
}

useIpcRendererOn(IpcEvents.EV_PLAY, async (_, videos: VideoFile[]) => {
  const videoInfoList = await getVideoInfoList(videos)
  window.electron.ipcRenderer.send(IpcEvents.EV_ADD_VIDEOS, videoInfoList)
})

useIpcRendererOn(IpcEvents.EV_PAUSE, () => {
  player.value?.pause()
})

onMounted(() => {
  console.dir(location.href)
})
</script>

<template>
  <div class="app">
    <TitleBar :title="videoName" @toggle-playlist="togglePlaylist"></TitleBar>
  <div class="main">
    <Player ref="player"></Player>
    <Playlist ref="playlist" @click="playVideo"></Playlist>
  </div>
  </div>
</template>

<style lang="less">
@import './assets/css/styles.less';
@import './assets/font/codicon.less';

.main {
  flex: 1;
  display: flex;
}
</style>
