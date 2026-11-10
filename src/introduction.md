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

```voxalfa
;; @version 0.1.0-alpha

[#] title="Follow me"
[#] author="Daniel Batchellor"
[#] description="A sample song from the Tonic Sol-Fa music course for schools."
[#] verses={1}
[#] language="en"
[#] tags={"example","practice"}

[$] key={G} | time={4,4} | tempo={adagio} | voices={S,A}

;; @title-text margin-bottom={20}
;; @note-text font-size={16}
;; @lyrics-text font-size={12} | color="#333333"

---

[$] mark={S}

[S] |d   :t-1 !d   :r   |m   :f   !m   :r   ||

[1] Fol_ low, me   come Fol_ low  me,  and  @@

++

[A] |    :    !    :    |d   :t-1 !d   :r   ||

[1] ~@4                 We   will fol_ low  @@

--

[$] ending={1} | jump={DS}

[S] |d   :t-1 !d   :r   |m   :f   !m   :    ||

[1] we   will sing in   har_ mo_  ny.@2\    @@

++

[A] |m   :f   !m   :r   |d   :t-1 !d   :    ||

[1] we   will sing in   har_ mo_  ny.@2\    @@

--

[$] ending={2}

[S] |d   :t-1 !d   :r   |m   :f   !m   :-   ||

[1] we   will sing in   har_ mo_  ny.@2

++

[A] |m   :f   !m   :r   |d   :t-1 !d   :-   ||

[1] we   will sing in   har_ mo_  ny!@2
```

Voxalfa is still in early development. Syntax and features may change before the first stable release. It is open-source and available on [GitHub](https://voxalfa/voxalfa).
