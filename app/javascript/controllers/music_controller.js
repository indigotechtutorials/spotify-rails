import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="music"
export default class extends Controller {
  static targets = ["play", "pause"]
  static values = { url: String }

  connect() {
    if (!window.audio) {
      window.audio = new Audio()
    }
  }
  
  toggle(e) {
    e.preventDefault()
    if (window.audio.src != this.urlValue) {
      window.audio.pause()
      window.audio.currentTime = 0
      window.audio.src = this.urlValue
    }

    window.dispatchEvent(new CustomEvent("audio-player-switched", {
      detail: {
        audio_src: this.urlValue,
      },
    }))

    this.playTarget.classList.toggle("hidden")
    this.pauseTarget.classList.toggle("hidden")

    if (!window.audio.paused) {
      window.audio.pause()
    } else {
      window.audio.play()
    }
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
}
