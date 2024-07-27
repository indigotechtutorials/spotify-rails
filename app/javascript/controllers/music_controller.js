import { Controller } from "@hotwired/stimulus"
import { post } from "@rails/request.js"

// Connects to data-controller="music"
export default class extends Controller {
  static targets = ["play", "pause"]
  static values = { url: String, audioPlayerUrl: String }

  connect() {
    if (!window.audio) {
      window.audio = new Audio()
    }
  }
  
  toggle(e) {
    e.preventDefault()
    if (window.audio.src != this.urlValue) {
      // Switching song | Initializing new song
      window.audio.pause()
      window.audio.currentTime = 0
      window.audio.src = this.urlValue
      window.dispatchEvent(new CustomEvent("audio-player-switched", {
        detail: {
          audio_src: this.urlValue,
        },
      }))
      // Make a post request to audioPlayerUrl
      this.updateAudioPlayer()
    }

    this.playTarget.classList.toggle("hidden")
    this.pauseTarget.classList.toggle("hidden")

    if (!window.audio.paused) {
      window.audio.pause()
    } else {
      window.audio.play()
    }

    window.dispatchEvent(new CustomEvent("music:toggled", {
      detail: {
        audio_src: this.urlValue,
      },
    }))
  }

  async updateAudioPlayer() {
    await post(this.audioPlayerUrlValue, {
      responseKind: 'turbo-stream'
    })
  }

  audioChanged(e) {
    let newUrl = e.detail.audio_src
    if (newUrl != this.urlValue) {
      if (this.playTarget.classList.contains("hidden")) {
        this.playTarget.classList.remove("hidden")
        this.pauseTarget.classList.add("hidden")
      }
    }
  }

  audioToggled(e) {
    let newUrl = e.detail.audio_src
    if (newUrl == this.urlValue) {
      if (window.audio.paused) {
        this.playTarget.classList.remove("hidden")
        if (!this.pauseTarget.classList.contains("hidden")) {
          this.pauseTarget.classList.add("hidden")
        }
      } else {
        this.pauseTarget.classList.remove("hidden")
        if (!this.playTarget.classList.contains("hidden")) {
          this.playTarget.classList.add("hidden")
        }
      }
    }
  }
}
