# Lyrics

Lyrics use a verse marker and are attached to solfa cells by order. Numbered markers select a single verse, while `[*]` declares a wildcard line shared by every verse:

```voxalfa fragment
[S] |d .r :m .f !s .l :t .d+1 ||
[1] do re mi fa so la ti do
```

**By default, one lyric token takes exactly one cell.** Visual alignment is ignored: the compiler matches tokens to cells from left to right. You are responsible for writing spans whenever a token should cover more than one cell.

## Cells

A lyric token maps to a column in a solfa line. A column can be:

- a note (`d`, `r`, ...),
- a prolonged note (`-`),
- an empty pulse or the empty half of a pulse (a rest).

Empty pulses still occupy time and still count as lyric cells. This matters when a word should cover a rest, when a voice enters later, or when a note is followed by a prolongation. See [Empty pulses](./solfa.md#empty-pulses).

## Operators

Tokens are joined with operators that describe spacing, concatenation, and line breaks. The operators exist so that lyrics can be rendered as normal text outside the score: they tell the lyric renderer where spaces, joins, and line breaks belong, without relying on visual alignment.

| Operator | Meaning | Example |
| --- | --- | --- |
| space | Word space. | `do re` |
| `_` | Concatenate without a space. | `re_mi` |
| `\` | Line break. | `mi\fa` |

```voxalfa fragment
[S] |d :r !m :f ||
[1] do re_mi\fa
```

The lyrics render as:

```text
do remi
fa
```

## Explicit spans

The span modifier `@N` makes one lyric token cover `N` cells:

```voxalfa fragment
[S] |m :- .m |s : .s ||
[1] June,@2 now ground,@2 The
```

- `June,@2` covers the `m` and its prolongation (`-`).
- `ground,@2` covers the `s` and the empty half of `: .s`.

A trailing empty pulse counts too:

```voxalfa fragment
[S] |m : ||
[1] sound@2
```

The compiler does **not** infer spans from spacing. If you omit `@N`, later tokens shift left and the text is no longer aligned. Add spans explicitly when a token covers:

- a note plus a prolongation,
- a note plus an empty cell,
- a slurred group,
- any other group of cells.

## Slurs and spans

A slurred group uses backticks in the solfa line. Underline the matching lyric token and give it the same span:

```voxalfa fragment
[S] |`s .d+1` :t .r+1 ||
[1] `notes`@2 of the
```

The span comes after the closing backtick: `` `notes`@2 ``, not `` `notes@2` ``.

## Unaligned voices

When voices divide the same pulse differently, their notes cannot be aligned one-to-one. A lyric token then attaches to the whole pulse instead of a single note:

```voxalfa fragment
[S] |d .d :m !f ||
[A] |d    :m !f ||
[1] do    mi fa
```

The first pulse has two soprano notes and one alto note. The lyric token `do` covers the whole pulse, so it is sung over both soprano notes and the single alto note. The same rule applies whenever voices have different beat divisions inside a pulse. This pulse-wide attachment is the main exception to the default one-token-per-cell rule.

## Placeholders

The placeholder `~` reserves an **empty** cell without rendering text. It should be used for rests or empty pulses, not to skip a real note:

```voxalfa fragment
[S] |d : !m :f ||
[1] do ~ mi fa
```

Above, the second pulse is empty, so `~` reserves it and `mi`/`fa` stay aligned with the following notes.

Placeholders accept the span modifier too: `~@4` reserves four empty cells without text. This is useful when a voice has empty cells before its lyrics:

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

If a declared voice is silent in a section, still write its line with empty pulses and reserve its lyric cells with placeholders:

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

## Grouping

Parentheses group multiple words under a single note:

```voxalfa fragment
[S] |d :r !m :f ||
[1] (do o) re mi fa
```

Operators may be used inside a group.

## Anchors

The anchor `@@` links the last token of a lyric line to the first token of the next section. It must be preceded by an operator (space, `_`, or `\`).

In a document with multiple sections, **every lyric line in a non-final section must end with an anchor**, even if the text does not visually continue. The compiler enforces this. The final section must not have an anchor.

```voxalfa fragment
[S] |d :r !m :f ||
[1] do re mi fa @@

--

[S] |s :l !t :d+1 ||
[1] so la ti do
```

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

## Underlining and slurs

Backticks underline the text that corresponds to a slur. Surround a range to underline it:

```voxalfa fragment
[S] |`d :r !m :f` ||
[1] `do re mi fa`
```

If the slurred group spans multiple cells and has a single lyric token, put the span outside the backticks:

```voxalfa fragment
[S] |`s .d+1` :t .r+1 ||
[1] `notes`@2 of the
```

## Special characters

Some characters have a syntactic meaning in lyrics. Use the corresponding escape when they must appear as text:

| Escape | Character |
| --- | --- |
| `&bls` | `\` |
| `&tld` | `~` |
| `&btk` | `` ` `` |
| `&sls` | `/` |
| `&lpr` | `(` |
| `&rpr` | `)` |
| `&atr` | `@` |
| `&amp` | `&` |
| `&scl` | `;` |
| `&dot` | `.` |

```voxalfa fragment
[S] |d :r !m :f ||
[1] do re&amp mi fa
```

Special characters are written as separate tokens. They do not consume an extra note. Keep an operator around them: `&scl The` and `&scl @@`, not `&sclThe` or `&scl@@`.

## Formatting

The formatter aligns lyrics for readability, but it does not add spans for you. Write `@N` in the source; formatting only changes whitespace.
