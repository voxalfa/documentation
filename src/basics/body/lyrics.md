# Lyrics

Lyrics use a verse marker and are attached to solfa notes by order. Numbered markers select a single verse, while `[*]` declares a wildcard line shared by every verse:

```voxalfa fragment
[S] |d .r :m .f !s .l :t .d+1 ||
[1] do re mi fa so la ti do
```

The model is simple. A lyric token covers one note by default, and tokens are matched to notes from left to right. Empty notes and prolongations also count as notes. Placeholders reserve empty notes without text; advanced alignment is covered in [Advanced lyric alignment](./lyrics-alignment.md).

## Notes

A lyric token maps to a note in a solfa line. A note can be:

- a sounded note (`d`, `r`, ...),
- an empty note — a rest, either a full pulse or half of a pulse,
- a prolongation (`-`) of the previous note.

Empty notes and prolongations still occupy time and count as lyric notes. This matters when a word should cover a rest, when a voice enters later, or when a note is followed by a prolongation. See [Rests](./solfa.md#rests).

## Operators

Tokens are joined with operators that describe spacing, concatenation, and line breaks. The operators exist so that lyrics can be rendered as normal text outside the score: they tell the lyric renderer where spaces, joins, and line breaks belong, without relying on visual alignment.

| Operator | Meaning                      | Example |
| -------- | ---------------------------- | ------- |
| space    | Word space.                  | `do re` |
| `_`      | Concatenate without a space. | `re_mi` |
| `\`      | Line break.                  | `mi\fa` |

Spaces may follow `_` or `\` and are ignored for readability: `re_ mi` is equivalent to `re_mi`, and `mi\ fa` to `mi\fa`.

```voxalfa fragment
[S] |d :r !m :f ||
[1] do re_mi\fa
```

The lyrics render as:

```text
do remi
fa
```

## Placeholders

The placeholder `~` reserves a note without rendering text. It should be used for empty notes, not to skip a real note:

```voxalfa fragment
[S] |d : !m :f ||
[1] do ~ mi fa
```

Above, the second pulse is empty, so `~` reserves it and `mi`/`fa` stay aligned with the following notes.

Placeholders accept the span modifier too: `~@4` reserves four empty notes without text. This is useful when a voice has empty notes before its lyrics:

```voxalfa fragment
[S] | : | : |d :r .r ||
[1] ~@4 June, love_ly
```

## Per-voice lyrics

To give each voice its own lyrics, put each voice and its lyric line in a separate sub-section with `++`:

```voxalfa fragment
[S] |d :r !m :f ||
[1] do re mi fa

++

[A] |d :r !m :f ||
[1] la ti do re
```

Sub-sections are simultaneous: they split the declarations of one section, not the timeline. Use this when voices need different texts or independent dynamics.

If a declared voice is silent in a section, still write its line with rests and reserve its lyric notes with placeholders:

```voxalfa fragment
[S] | : | : |d :r .r ||
[1] ~@4 June, love_ly

++

[A] | : | : | : | : ||
[1] ~@8
```

## Wildcard lyrics

Use `[*]` instead of a verse number to declare one line that is sung on every verse:

```voxalfa
;; @version 0.1.0-alpha

[#] verses={2}

[$] key={C} | time={4,4} | voices={S}

---

[S] |d :r !m :f ||

[*] do re mi fa
```

The line is repeated for verse 1 and verse 2, so the score has two identical lyric rows. This is useful for refrains, or when every verse shares the same text.

Do not mix `[*]` with numbered lines in the same sub-section.

Per-voice lyrics can use a wildcard line in each sub-section:

```voxalfa fragment
[S] |d :r !m :f ||
[*] do re mi fa @@

++

[A] |d :r !m :f ||
[*] la ti do re @@

--

[S] |s :l !t :d+1 ||
[*] so la ti do
```

## Anchors

The anchor `@@` is needed to chain the trailing operator of a lyric line to the lyrics of the next section. This is especially important for a space, which has no visible character: without `@@`, the trailing space cannot be seen or carried across the boundary. It must be preceded by an operator (space, `_`, or `\`).

In a file with multiple sections, **every lyric line in a non-final section must end with an anchor**, even if the text does not visually continue. The final section must not have an anchor.

```voxalfa fragment
[S] |d :r !m :f ||
[1] do re mi fa\@@

--

[S] |s :l !t :d+1 ||
[1] so la ti do
```

The anchor carries the trailing operator into the next section; here `\` continues the lyrics on a new line.

With per-voice lyrics, each lyric line in each non-final sub-section needs its own anchor:

```voxalfa fragment
[S] |d :r !m :f ||
[1] do re mi fa @@

++

[A] |d :r !m :f ||
[1] la ti do re @@

--

[S] |s :l !t :d+1 ||
[1] so la ti do
```

Anchors are not needed only when the section is the last one. They are also how a word can continue across a section break.

Spans, unaligned voices, and special lyric formatting are covered in [Advanced lyric alignment](./lyrics-alignment.md).
