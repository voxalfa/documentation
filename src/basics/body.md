# Body

The body is the part of a document after the `---` separator. It contains the music: solfa lines, lyrics, and the parameters that change during the score.

## Sections

Sections are purely arbitrary building blocks. They organize source lines and control how time indices continue, but they are independent of the final rendering: the renderer decides where to break systems and pages, except where a major section is explicitly marked.

A section can contain a single pulse or many pulses. It is a logical grouping, not a fixed number of measures.

Some parameters require starting a new section because they apply relative to its beginning or end: time signature, key, tempo, marks, and jumps. Other declarations, such as solfa lines and lyrics, can be split across sub-sections inside the same section.

### New sections with `--`

`--` starts a new section and restarts time indices at `0`:

```voxalfa fragment
;    0  1  2  3
[S] |d :r !m :f ||

--

;    0  1  2  3
[S] |s :l !t :d+1 ||
```

### Merged sections with `<<`

`<<` starts a new section but continues the time line from the previous section:

```voxalfa fragment
;    0  1  2  3
[S] |d :r !m :f ||

<<

;    4  5  6  7
[S] |s :l !t :d+1 ||
```

A merged section must use the same voice structure as the section it continues.

Merging is mainly useful for timed indexing: it lets a dynamic or touch range continue across a section boundary. If you only want a new section, use `--` or `==`. See [Indices across sections](./data-types.md#indices-across-sections).

### Major sections with `==`

`==` starts a major section. The previous section ends a larger structural block, and time indices restart:

```voxalfa fragment
;    0  1  2  3
[S] |d :r !m :f ||

==

;    0  1  2  3
[S] |s :l !t :d+1 ||
```

### Sub-sections with `++`

`++` splits the declarations of one section into sub-sections. Time indices continue across sub-sections, but each sub-section can contain a different set of voices and lyrics:

```voxalfa fragment
[S] |d :r !m :f ||
[A] |d :r !m :f ||

[1] do re mi fa

++

[T] |d :r !m :f ||
[B] |d :r !m :f ||

[1] do re mi fa
```

Sub-sections are also how per-voice lyrics and independent `dynamics` markings are written.

## Section parameters

Parameters at the start of a section use the `[$]` marker and can override the header:

```voxalfa fragment
[$] key={G} | time={3,4} | tempo={110} | label="Verse" | mark={S}
```

See [Body Parameters](./body/parameters.md) for the complete list.

## Solfa and lyrics

Solfa lines use a voice marker such as `[S]` and end with `||`:

```voxalfa fragment
[S] |d .r :m .f !s .l :t .d+1 ||
```

Lyrics use a verse marker and are attached to notes. Numbered markers select one verse, while `[*]` declares a wildcard line shared by every verse:

```voxalfa fragment
[1] do re mi fa so la ti do
```

Read more about [Solfa](./body/solfa.md) and [Lyrics](./body/lyrics.md).
