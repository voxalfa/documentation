# Introduction

Voxalfa is a declarative, data-oriented language for composing and storing [Tonic sol-fa](https://en.wikipedia.org/wiki/Tonic_sol-fa) scores in a compact, human-readable format.

A Voxalfa file can currently be converted to MIDI, SVG, and PDF; MusicXML support is planned.

## Key Features

- **Human-Readable & Ergonomic:** Clear, uniform syntax with no whitespace-based rules.
- **Easy to write:** Faimiliar and intuitive syntax for writing lines of notes.
- **Data-Oriented:** Fully typed data structure ensuring consistency across documents.
- **Multiple Output Targets:** Compile seamlessly to SVG, MIDI, and more.
- **Granular Control:** Full support for dynamics, multiple endings, and all kinds of directives.
- **Rich Lyrics Support:** Simple lyrics templating and alignment system.
- **Developer-First Tooling:** Built from the ground up with developer tools in mind.

## A minimal score

Below is a simple Voxalfa score illustrating how metadata, per voice lyrics, and multiple endings endings are represented in a compact way. It also demonstrates Voxalfa’s CSS-like directive system for custom visual styling.

Download: [MIDI](assets/midi/follow-me.mid) · [PDF](assets/pdf/follow-me.pdf)

<div class="score-viewer-actions">
  <button type="button" class="score-viewer-button" data-score-toggle="follow-me" data-score-svg="assets/svg/follow-me.svg" data-score-alt="Sheet music for Follow me" aria-pressed="false">
    View rendered score
  </button>
  <button type="button" class="score-viewer-button" data-midi="assets/midi/follow-me.mid" aria-pressed="false">
    Play MIDI
  </button>
</div>

```voxalfa
{{#include assets/vfa/follow-me.vfa}}
```

Voxalfa is still in early development. Syntax and features may change before the first stable release. It is open-source and available on [GitHub](https://github.com/voxalfa/voxalfa).
