# Data Types

Voxalfa has a small set of primitive types. Values are written either directly after `=` or inside braces for lists and structured values.

Examples in this chapter often show alternative values for the same key. In a real file, assign each key once per scope; reassigning a key produces a warning.

## Primitive types

| Type    | Examples                       | Notes                            |
| ------- | ------------------------------ | -------------------------------- |
| Number  | `100`, `1.5`, `3`              | Integers and floats.             |
| String  | `"Hello"`, `"mg"`              | Delimited by double quotes.      |
| Boolean | Reserved                       | Planned for future options.      |
| Builtin | `C`, `allegro`, `S`, `fermata` | Predefined constants; see below. |

## Strings

Strings are always quoted:

```voxalfa fragment
[#] title="Ry Tanindrazanay Malala ô!"
[#] language="mg"
```

A string list uses braces and comma-separated values:

```voxalfa fragment
[#] author={"Norbert Raharisoa", "Pasteur Rahajason"}
[#] tags={"anthem", "madagascar"}
```

## Numbers

Integers and floats are written without quotes:

```voxalfa fragment
[#] verses={1}
[#] release={1958}
[$] tempo={100}
```

Some parameters expect a list of numbers, such as the time signature:

```voxalfa fragment
[$] time={4,4}
[$] time={3,4}
```

## Booleans

Boolean values are reserved for future options. No current metadata field or parameter uses them yet.

## Lists

Lists are comma-separated values inside braces:

```voxalfa fragment
[$] voices={S,A,T,B}
[#] tags={"anthem", "evangelic"}
[$] time={6,8}
```

## Builtins

Builtins are predefined constants written without quotes. Each builtin belongs to a specific parameter or metadata field.

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
[$] tempo={rit}
[$] tempo={rall}
[$] tempo={accel}
```

For now, `rit`, `rall`, and `accel` interpolate over the section in which they are declared: the tempo changes gradually across that section.

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
[$] jump={DCF}
```

Jumps do not take a pulse index. A jump is placed implicitly at the end of the section where it is declared.

### Marks

Marks identify the targets used by jumps and are rendered as symbols or labels.

- `S`: segno.
- `C`: coda.
- `TC`: to coda.
- `F`: fine.

```voxalfa fragment
[$] mark={S}
[$] mark={F}
```

Marks do not take a pulse index either. Segno and coda are placed implicitly at the start of their section; fine and to-coda are placed at the end. See [Navigation](./body/parameters.md#navigation).

### Touches

Touches are articulations: they describe how a note is played rather than how loud or how long the whole section is. A touch applies to a single note, indexed with a [pulse index](#pulse-indices).

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

## Pulse indices

Pulse indices are a way of indexing notes so that markers can be attached to a note or a range.

- Indices are zero-based and relative to the section start.
- One pulse counts as one unit.
- A value without an index defaults to `0`.
- Subdivisions are fractional parts of a pulse.
- Rests and prolongations still advance the index.
- Triplet positions can use `0.3` for `1/3` and `0.7` for `2/3`; `0.33` and `0.66` are not needed.

```voxalfa fragment
[$] dynamics={p:0, cresc:0.5..1, f:1.5}

;    p          cresc.......    f
;    0    0.25  0.5  0.75  1    1.5
[S] |d    ,r    .m   ,f    :s   .l ||
```

Here `p` is on `d`, the crescendo starts on `m` and includes `s`, and `f` is on `l`.

### Ranges

A range uses `..` and is inclusive: the note starting at the end index is included. Both endpoints must fall on a position where a note starts.

```voxalfa fragment
[$] dynamics={cresc:0.5..1}
```

In the example above, this range starts the crescendo on `m` and includes `s`; the crescendo ends after that note finishes.

### Pulse indices across sections

`--` and `==` restart the pulse index at `0` for the next section. `<<` continues it. Sub-sections created with `++` also continue the pulse index of their section.

Merged sections are mainly useful for ranges that must continue across a section boundary. For example, a crescendo that starts before the boundary and ends after it needs continuous indices:

```voxalfa fragment
[$] dynamics={p:2, cresc:2..5, f:5}

;          p cresc...
;    0  1  2  3
[S] |d :r !m :f ||

<<

;    ...f
;    4  5  6  7
[S] |s :l !t :d+1 ||
```

If you do not need continuous indexing, use `--` or `==` instead.

## Comments

Inline comments start with a single semicolon:

```voxalfa fragment
[S] |d :r !m :f ||  ; the text after the semicolon is ignored
```

## Directives

Compiler directives start with `;; @` and provide context to the compiler:

```voxalfa fragment
;; @version 0.1.0-alpha
;; @page width={200} | height={1000}
```

The `version` directive is validated against the compiler version. See [Directives](./directives.md) for directive syntax and [Styling](./directives/styling.md) for styling options.
