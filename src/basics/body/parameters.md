# Parameters

Section parameters use the `[$]` marker at the top of a section, inside its first sub-section. They override the initial header parameters and can add navigation or articulation information.

Key, time signature, and tempo overrides remain in effect from that section onward until changed again. Other parameters apply to their section or to the notes they target.

Some parameters are indexed: they accept an [index](./indexing.md) and are placed at a note.

| Parameter  | Type                    | Indexable | Description                                                                  |
| ---------- | ----------------------- | --------- | ---------------------------------------------------------------------------- |
| `label`    | string                  | no        | Text label for the section.                                                  |
| `time`     | number list of length 2 | no        | Time signature from this section onward.                                     |
| `tempo`    | extended tempo list     | yes       | [Tempo](../builtins.md#tempos) from this section onward.                   |
| `ending`   | number                  | no        | Ending (volta) number.                                                       |
| `key`      | key list                | yes       | [Key signatures](../builtins.md#keys) from this section onward.            |
| `jump`     | jump list               | yes       | [Jump](../builtins.md#jumps) instruction such as `DS` or `DC`.             |
| `mark`     | mark list               | yes       | [Mark](../builtins.md#marks) such as segno, coda, fine, or to-coda.        |
| `touches`  | touch list              | yes       | [Articulations](../builtins.md#touches) attached to notes.                 |
| `barline`  | barline list            | yes       | [Barline](../builtins.md#barlines) such as a major double barline.           |
| `repeat`   | number                  | no        | Number of times the jump is taken.                                           |
| `dynamics` | dynamic list            | yes       | [Dynamic levels and changes](../builtins.md#dynamics) (sub-section only).  |

```voxalfa fragment
[$] key={G} | time={3,4} | tempo={allegro} | label="Verse"
```

## Tempo changes

`tempo` accepts the same static values as the header, plus `rit`, `rall`, and `accel` for gradual changes:

```voxalfa fragment
[$] tempo={96, 120:2}
[$] tempo={rit:2..5}
[$] tempo={accel}
```

Static tempos can start at a specific note. `rit`, `rall`, and `accel` interpolate over their [range](./indexing.md#ranges); without an explicit range they span the whole section.

## Navigation

Jumps and marks describe repeats and navigation in the rendered score:

```voxalfa fragment
; first section: segno mark (used with DS or DSF)
[$] mark={S}

; ...

--

; second section: ignored on the first run
[$] mark={F}

; ...

--

; final section: jump back to the segno and stop at the fine
[$] jump={DSF}

; ...
```

Marks and jumps are placed at notes. Without an index, a segno or coda is placed at the start of the section, while a jump or an end mark such as fine or to-coda is placed at the end. Add an [index](./indexing.md) to place them at another note:

```voxalfa fragment
[$] mark={S, TC:6}
[$] jump={DS:6}
```

The `repeat` parameter is always tied to a jump. It specifies how many times the jump is taken; for example, `jump={DS} | repeat={2}` means take the DS jump twice. It is only meaningful on the section that declares the jump.

```voxalfa fragment
[$] mark={S}

; ...

--

[$] jump={DS} | repeat={2}

; ...
```

See [Jumps](../builtins.md#jumps) and [Marks](../builtins.md#marks) for the available values.

## Touches

Touches attach an articulation to a single note:

```voxalfa fragment
[$] touches={staccato:2, marcato:3, fermata:4}
```

Indices target notes; they are zero-based and relative to the section start, just like dynamics. Rests and prolongations still advance the index. See [Indexing system](./indexing.md).

## Dynamics

Dynamics are declared at sub-section level. They can be repeated in every sub-section of a section:

```voxalfa fragment
[$] dynamics={p, cresc:1..2, f:3}

[S] |d :r !m :f ||
[A] |d :r !m :f ||
```

`p` sets a piano dynamic at the first note, `cresc:1..2` starts a crescendo at the second note and includes the third note, and `f:3` sets forte at the fourth note. A value without an index is placed at the first note. Indices describe a note’s position in the pulse grid, not its ordinal number; see [Indexing system](./indexing.md).

`decresc` and `dim` are equivalent (both gradually soften).

Because dynamics belong to a sub-section, different voices can have independent dynamic markings: put the voices in separate sub-sections and give each sub-section its own `[$] dynamics` line.
