import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="audio-player"
export default class extends Controller {
  static targets = ["currentTime", "duration", "range", "play", "pause"]
  connect() {
    if (!window.audio) return
    this.updatePlayButton()
    this.rangeTarget.value = 0
    
    this.timeUpdateEventListener = window.audio.addEventListener("timeupdate", () => { 
      this.rangeTarget.value = window.audio.currentTime
      this.rangeTarget.max = window.audio.duration
      this.durationTarget.innerHTML = formatTime(window.audio.duration)
      this.currentTimeTarget.innerHTML = formatTime(window.audio.currentTime)
    })
  }

  toggle(e) {
    e.preventDefault()
    if (window.audio.paused) {
      window.audio.play()
    } else {
      window.audio.pause()
    }
    
    window.dispatchEvent(new CustomEvent("audio-player:toggled", {
      detail: {
        audio_src: window.audio.src,
      },
    }))

    this.updatePlayButton()
  }

  updatePlayButton() {
    if (window.audio.paused) {
      if (!this.pauseTarget.classList.contains("hidden")) {
        this.pauseTarget.classList.add("hidden")
      }
      this.playTarget.classList.remove("hidden")
    } else {
      if (!this.playTarget.classList.contains("hidden")) {
        this.playTarget.classList.add("hidden")
      }
      this.pauseTarget.classList.remove("hidden")
    }
  }

  currentTimeUpdated() {
    window.audio.currentTime = this.rangeTarget.value
  }

  disconnect() {
    window.audio.removeEventListener("timeupdate", this.timeUpdateEventListener)
  }
}
function formatTime(currentTime) {
  let minutes = "0" + Math.floor(currentTime / 60);
  let seconds = "0" +  Math.floor(currentTime - minutes * 60);
  let dur = minutes.substr(-2) + ":" + seconds.substr(-2);
  return dur
}