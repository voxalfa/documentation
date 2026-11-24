# Sections

The body is divided into sections. A section owns its notes and lyrics, and can override the current parameters. It can span any number of pulses and can be split into sub-sections.

Time signatures are declared at a section boundary and stay in effect until changed. Endings apply to one section. Indexed values such as key, tempo, marks, and jumps can change inside a section using [indices](./indexing.md). A new section resets those indices. Each section holds its solfa lines and lyrics. To give voices separate lyrics or independent `dynamics` markings, split the section into sub-sections.

Sections are independent of the final rendering. The renderer decides where to break systems and pages.

The separator between sections also determines whether indices restart or continue. See [Indexing system](./indexing.md).

## New sections with `--`

`--` starts a new section and restarts the index at `0`:

```voxalfa fragment
;    0  1  2  3
[S] |d :r !m :f ||

--

;    0  1  2  3
[S] |s :l !t :d+1 ||
```

## Merged sections with `<<`

`<<` starts a new section but continues the indices from the previous section:

```voxalfa fragment
;    0  1  2  3
[S] |d :r !m :f ||

<<

;    4  5  6  7
[S] |s :l !t :d+1 ||
```

A merged section must contain the same voices, in the same order, as the section it continues.

Merging is mainly useful for indexing: it lets a dynamic range continue across a section boundary. If you only want a new section, use `--`. See [Indexing across sections](./indexing.md#across-sections).

## Sub-sections with `++`

Sub-sections are how per-voice lyrics and independent `dynamics` markings are written. `++` splits the declarations of one section into sub-sections. Indices continue across sub-sections, but each sub-section can contain a different set of voices and lyrics:

```voxalfa fragment
[S] |d :r !m :f ||
[A] |d :r !m :f ||

[1] do re mi fa

++

[T] |d :r !m :f ||
[B] |d :r !m :f ||

[1] do re mi fa
```
