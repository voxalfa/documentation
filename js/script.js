document.querySelectorAll("[data-score-toggle]").forEach((button) => {
  const actions = button.closest(".score-viewer-actions");
  let source = actions?.nextElementSibling;

  while (source && source.tagName !== "PRE") {
    source = source.nextElementSibling;
  }

  if (!source) {
    return;
  }

  const name = button.dataset.scoreToggle;
  const image = document.createElement("img");

  source.id = `score-viewer-${name}`;
  source.classList.add("score-viewer");

  image.className = "score-viewer-image";
  image.src = button.dataset.scoreSvg;
  image.alt = button.dataset.scoreAlt || "";
  source.append(image);

  button.setAttribute("aria-controls", source.id);

  button.addEventListener("click", () => {
    const showing = source.classList.toggle("show-image");
    button.textContent = showing ? "View source" : "View rendered score";
    button.setAttribute("aria-pressed", showing);
  });
});

let activePlayback = null;
let loadingButton = null;
let requestCounter = 0;

function resetPlayButton(button) {
  button.disabled = false;
  button.textContent = "Play MIDI";
  button.setAttribute("aria-pressed", "false");
}

function stopPlayback() {
  requestCounter += 1;

  if (loadingButton) {
    resetPlayButton(loadingButton);
    loadingButton = null;
  }

  if (!activePlayback) {
    return;
  }

  const { button, part, synth, timeout } = activePlayback;
  activePlayback = null;

  clearTimeout(timeout);
  part.stop();
  part.dispose();
  synth.dispose();
  Tone.Transport.stop();
  Tone.Transport.cancel();
  resetPlayButton(button);
}

document.querySelectorAll("[data-midi]").forEach((button) => {
  button.addEventListener("click", async () => {
    if (activePlayback?.button === button) {
      stopPlayback();
      return;
    }

    stopPlayback();

    const request = ++requestCounter;
    loadingButton = button;
    button.disabled = true;
    button.textContent = "Loading…";

    try {
      await Tone.start();

      const midi = await Midi.fromUrl(button.dataset.midi);
      await Tone.start();

      if (request !== requestCounter) {
        return;
      }

      const notes = midi.tracks
        .flatMap((track) =>
          track.notes.map((note) => ({
            time: note.time,
            name: note.name,
            duration: note.duration,
            velocity: note.velocity,
          })),
        )
        .sort((a, b) => a.time - b.time);

      const duration = Math.max(
        ...notes.map((note) => note.time + note.duration),
      );

      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      synth.volume.value = -8;

      Tone.Transport.stop();
      Tone.Transport.cancel();
      Tone.Transport.position = 0;

      const part = new Tone.Part((time, note) => {
        synth.triggerAttackRelease(
          note.name,
          note.duration,
          time,
          note.velocity,
        );
      }, notes).start(0);

      Tone.Transport.start();

      const timeout = setTimeout(
        () => {
          if (activePlayback?.button === button) {
            stopPlayback();
          }
        },
        (duration + 0.5) * 1000,
      );

      activePlayback = { button, part, synth, timeout };
      loadingButton = null;
      button.disabled = false;
      button.textContent = "Stop MIDI";
      button.setAttribute("aria-pressed", "true");
    } catch (error) {
      if (request === requestCounter) {
        loadingButton = null;
        resetPlayButton(button);
      }
      console.error(error);
    }
  });
});
