# Sections

The body is divided into sections. A section owns its notes, lyrics, and local parameters. It can span any number of pulses and can be split into sub-sections.

Some parameters require starting a new section because they apply relative to its beginning or end: time signature, key, tempo, marks, and jumps. Each section holds its solfa lines and lyrics. To give voices separate lyrics or independent `dynamics` markings, split the section into sub-sections.

Sections are independent of the final rendering. The renderer decides where to break systems and pages, except where a major section is explicitly marked.

The separator between sections also determines whether pulse indices restart or continue. See [Pulse indices](../data-types.md#pulse-indices).

## New sections with `--`

`--` starts a new section and restarts pulse indices at `0`:

```voxalfa fragment
;    0  1  2  3
[S] |d :r !m :f ||

--

;    0  1  2  3
[S] |s :l !t :d+1 ||
```

## Merged sections with `<<`

`<<` starts a new section but continues the pulse indices from the previous section:

```voxalfa fragment
;    0  1  2  3
[S] |d :r !m :f ||

<<

;    4  5  6  7
[S] |s :l !t :d+1 ||
```

A merged section must contain the same voices, in the same order, as the section it continues.

Merging is mainly useful for pulse indexing: it lets a dynamic range continue across a section boundary. If you only want a new section, use `--` or `==`. See [Pulse indices across sections](../data-types.md#pulse-indices-across-sections).

## Major sections with `==`

`==` marks a major section break, a larger structural boundary than an ordinary section. It renders a double barline at the end of the preceding section, while ordinary section breaks do not. Pulse indices restart in the following section:

```voxalfa fragment
;    0  1  2  3
[S] |d :r !m :f ||

==

;    0  1  2  3
[S] |s :l !t :d+1 ||
```

## Sub-sections with `++`

Sub-sections are how per-voice lyrics and independent `dynamics` markings are written. `++` splits the declarations of one section into sub-sections. Pulse indices continue across sub-sections, but each sub-section can contain a different set of voices and lyrics:

```voxalfa fragment
[S] |d :r !m :f ||
[A] |d :r !m :f ||

[1] do re mi fa

++

[T] |d :r !m :f ||
[B] |d :r !m :f ||

[1] do re mi fa
```
