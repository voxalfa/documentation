# Overview

Voxalfa is a declarative, data-oriented, line-based language. It is divided into a header and a body, which share the same assignment syntax. This keeps the format uniform and makes header metadata easy to validate. There are no indentation or space-based rules. Voxalfa files use the `.vfa` extension.

## Declarations

A declaration starts with a marker in square brackets. The marker says what the line is for:

| Marker                     | Meaning                                                                             |
| -------------------------- | ----------------------------------------------------------------------------------- |
| `[#]`                      | Header metadata.                                                                    |
| `[$]`                      | Parameters, either in the header or at the start of a section.                      |
| `[S]`, `[A]`, `[T]`, `[B]` | Solfa lines for the voices declared in the [header](./header/parameters.md#voices). |
| `[1]`, `[2]`, `[3]`, ...   | Lyrics for the corresponding verse.                                                 |
| `[*]`                      | Wildcard lyrics, shared by every verse.                                             |

A marker is followed by either assignments or content.

- **Assignments** use `key=value`, such as `key={C}` or `title="Hello"`.
- **Solfa and lyric lines** use their own token syntax, such as `|d :r !m :f ||`.

You can put several assignments on one line, separated by `|`:

```voxalfa fragment
[#] title="Hello" | language="en" | verses={1}
[$] key={C} | time={4,4} | tempo={100} | voices={S,A}
```

## Comments and directives

Ordinary comments start with `;` and run to the end of the line:

```voxalfa fragment
[S] |d :r !m :f ||  ; this is an inline comment
```

Language directives start with `;; @` and are documented in [Directives](./directives.md):

```voxalfa fragment
;; @version 0.1.0-alpha
```

## Header and body

A Voxalfa file has two parts separated by `---`:

```voxalfa
;; @version 0.1.0-alpha

[#] title="Hello, Voxalfa"
[#] verses={1}

[$] key={C} | time={4,4} | tempo={100} | voices={S}

---

[S] |d :r !m :f ||

[1] do re mi fa
```

The **header** contains metadata (`[#]`), initial parameters (`[$]`), and language directives (`;; @`). It describes the score but does not contain notes.

The **body** contains sections. Each section holds one or more sub-sections with solfa lines and their lyrics. Sections are separated by `--` or `<<`, and sub-sections by `++`. These separators are covered in [Body](./body.md).

## Annotations

A score often needs directions on individual notes: a crescendo starting here, a fermata there, or a change later in the passage. Voxalfa calls these annotations. They include dynamics, articulations, key and tempo changes, jumps, and marks.

To choose where an annotation applies, Voxalfa uses a simple indexing system:

```voxalfa fragment
[$] dynamics={cresc:1..2} | touches={fermata:3} | jump={DS}

;    0  1  2  3
[S] |d :r !m :f ||
```

See the [Indexing system](./body/indexing.md) for the full explanation.

## Whitespace and alignment

Spacing is only for readability. These deliberately misaligned lines describe the same music:

```voxalfa fragment
[S] |d     .,d   :t-1     .,t-1 !d    : ||
[A] |s-1 .,s-1 :s-1 .,s-1 !s-1 : ||
[T] |m .,m        :f .,f !m : ||
[B] |s-1        .,s-1 :s-1        .,s-1 !d-1 : ||
```

You can align them by hand, or let `voxalfa format` normalize the spacing.

Lyrics do not have to be aligned with the solfa line either. They are matched to notes from left to right:

```voxalfa fragment
[S] |d .r :m .f !s .l :t .d+1 ||
[1]       do   re   mi   fa   so   la   ti   do
```

The example above is equivalent to writing the lyric tokens directly under the notes. Alignment is only a readability aid.

## Design and trade-offs

Voxalfa models how a piece is performed, not how it is laid out on a page. The source describes notes, pulses, voices, navigation, and parameter changes. Page and system breaks are left to the renderer.

Voxalfa keeps the source close to the musical structure of the printed sheet, while treating layout as a rendering concern. Pulse accents are explicit, voices share the same pulse positions, and lyrics stay aligned in the source. This keeps the musical structure visible while editing.

Inline annotation syntax keeps marks beside the notes, but several marks on one note can clutter the melody and interrupt reading:

```text
S: {rit.}{p} d  r.m  f {fermata} s
```

Ranges are harder to express inline. A crescendo needs a start marker and an end marker, and every voice needs its own markers. Inline annotations also mix musical content with presentation and are easy to misalign.

Voxalfa keeps the voices clean and states the range once. The same pulse grid applies to every voice, and lyrics stay aligned with the notes:

```voxalfa fragment
[$] touches={fermata:3} | dynamics={cresc:0..2} | jump={DS}

[S] |d   :r   !m   :f   ||
[A] |m   :f   !s   :l   ||
[T] |s   :l   !d+1 :r   ||
[B] |d   :f   !m   :r   ||

[1] do   re   mi   fa
```

The trade-off is that annotations need an index. In practice, you only index annotations, many are implicit (such as a jump at the end of its section), and choosing an index is just counting pulses.
