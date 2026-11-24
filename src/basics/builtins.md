# Builtins

> This page is reference material. You can read Header and Body first and return here when you need a specific builtin value.

Builtins are predefined constants written without quotes. Each builtin belongs to a specific parameter or metadata field.

Most builtins can target a specific note. Indexing is the syntax used for this: write a value as `value:index`, where the index selects the note's position on the pulse grid. This applies to `key`, `tempo`, `dynamics`, `touches`, `jump`, `mark`, and `barline`; see the [indexing system](./body/indexing.md) for how to choose a note.

```voxalfa fragment
[$] key={C, G:4}
[$] tempo={adagio, 120:4}
```

### Keys

The key sets the tonal center used to interpret solfa notes and to render the key signature.

Natural keys:

- `C`: C major or A minor.
- `D`: D major or B minor.
- `E`: E major or C-sharp minor.
- `F`: F major or D minor.
- `G`: G major or E minor.
- `A`: A major or F-sharp minor.
- `B`: B major or G-sharp minor.

Sharp keys:

- `C#`, `D#`, `E#`, `F#`, `G#`, `A#`, `B#`

Flat keys:

- `Cb`, `Db`, `Eb`, `Fb`, `Gb`, `Ab`, `Bb`

```voxalfa fragment
[$] key={Eb}
[$] key={F#}
```

Keys can change inside a section by giving an index:

```voxalfa fragment
[$] key={C, G:4}
```

### Tempos

Tempos control playback speed. A tempo can be a named static tempo, an explicit BPM number, or a gradual change.

#### Static tempos

- `grave`: very slow, 40 BPM.
- `largo`: broad, 50 BPM.
- `adagio`: slow, 70 BPM.
- `andante`: walking pace, 90 BPM.
- `moderato`: moderate, 110 BPM.
- `allegro`: fast, 130 BPM.
- `vivace`: lively, 160 BPM.
- `presto`: very fast, 180 BPM.
- Any integer: an explicit BPM value, for example `96`.

```voxalfa fragment
[$] tempo={adagio}
[$] tempo={96}
```

#### Extended tempos

- `rit`: ritardando; gradually slower.
- `rall`: rallentando; gradually slower.
- `accel`: accelerando; gradually faster.

```voxalfa fragment
[$] tempo={rit:2..5}
[$] tempo={rall:1..3}
[$] tempo={accel:4..7}
```

`rit`, `rall`, and `accel` take a [range](./body/indexing.md#ranges) and interpolate between its start and end. Without an explicit range they span the whole section:

```voxalfa fragment
[$] tempo={rit}
```

Static tempos and BPM values also accept an index to start at a specific note:

```voxalfa fragment
[$] tempo={adagio, 96:2, allegro:4}
```

### Voices

Voices select which part of the score a solfa line belongs to.

- `S`: soprano.
- `A`: alto.
- `T`: tenor.
- `B`: bass.

The `voices` list is an ordered pattern and is not limited to SATB. Use any sequence, such as `{S,A,T}` for three voices or `{S,S,A,A,T,T}` for SSAATT. Solfa lines must follow the same order in each section.

```voxalfa fragment
[$] voices={S,A,T,B}
[$] voices={S,S,A,A,T,T}
```

### Jumps

Jumps control navigation during playback and are rendered as jump labels.

- `DS`: dal segno; jump back to the segno.
- `DC`: da capo; jump back to the beginning.
- `DSC`: dal segno al coda; jump to the segno, then to the coda.
- `DSF`: dal segno al fine; jump to the segno, then to the fine.
- `DCC`: da capo al coda; jump to the beginning, then to the coda.
- `DCF`: da capo al fine; jump to the beginning, then to the fine.

```voxalfa fragment
[$] jump={DS}
[$] jump={DCF:8}
```

Without an index, a jump is placed at the end of its section. With an index, it is placed after the specified note.

### Marks

Marks identify the targets used by jumps and are rendered as symbols or labels.

- `S`: segno.
- `C`: coda.
- `TC`: to coda.
- `F`: fine.

```voxalfa fragment
[$] mark={S}
[$] mark={F}
[$] mark={TC:6}
```

Segno and coda default to the start of the section. Fine and to-coda default to the end of the section. An explicit index places the mark at another note. See [Navigation](./body/parameters.md#navigation).

### Barlines

Barlines mark structural boundaries:

- `double`: a double barline.

```voxalfa fragment
[$] barline={double}
[$] barline={double:2}
```

A barline is placed before its target note. With no index, it targets the first note of the section. An index can target any note, including notes inside a pulse.

### Touches

Touches are articulations: they describe how a note is played rather than how loud or how long the whole section is. A touch applies to a single note, selected with an [index](./body/indexing.md).

- `staccato`: play the note short and detached.
- `fermata`: hold the note longer than its written value.
- `marcato`: play the note with a strong accent.

```voxalfa fragment
[$] touches={fermata:4}
```

### Dynamics

Dynamics control loudness and are rendered as dynamic markings.

- `ppp`: pianississimo; very, very soft.
- `pp`: pianissimo; very soft.
- `p`: piano; soft.
- `mp`: mezzo-piano; moderately soft.
- `mf`: mezzo-forte; moderately loud.
- `f`: forte; loud.
- `ff`: fortissimo; very loud.
- `fff`: fortississimo; very, very loud.
- `cresc`: crescendo; gradually louder.
- `decresc`: decrescendo; gradually softer.
- `dim`: diminuendo; gradually softer (same as `decresc`).

```voxalfa fragment
[$] dynamics={p:2}
```

A dynamic can also span a range. The range is inclusive, so the end note receives the final value:

```voxalfa fragment
[$] dynamics={cresc:1..3}
```

See [ranges](./body/indexing.md#ranges) for more details.
