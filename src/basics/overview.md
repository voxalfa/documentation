# Overview

Voxalfa is a directive, line-based language. Every line starts with a **marker** in square brackets that selects the kind of declaration; the rest of the line contains the declaration itself. This keeps the syntax regular and independent of indentation or visual alignment.

## Markers

| Marker | Meaning |
| --- | --- |
| `[#]` | Header metadata. |
| `[$]` | Parameters, either in the header or at the start of a section. |
| `[S]`, `[A]`, `[T]`, `[B]` | Solfa lines for the voices declared in `voices`. |
| `[1]`, `[2]`, `[3]`, ... | Lyrics for the corresponding verse. |

A marker is followed by either a key-value list or a token list:

- **Key-value declarations** assign values to names, for example `key={C}` or `title="Hello"`.
- **Token-list declarations** use the custom syntax of solfa and lyric lines, for example `|d :r !m :f ||`.

Multiple key-value assignments can be chained on one line with `|`:

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

A document has two parts separated by `---`:

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

The **body** contains sections. Each section holds one or more sub-sections with solfa lines and their lyrics. Sections are separated by `--`, `<<`, or `==`, and sub-sections by `++`. These separators are covered in [Body](./body.md).

## Whitespace and alignment

Voxalfa is line-oriented, but alignment inside a line is purely visual. Extra spaces between tokens do not change the meaning of a score. The four lines below are deliberately misaligned:

```voxalfa fragment
[S] |d     .,d   :t-1     .,t-1 !d    : ||
[A] |s-1 .,s-1 :s-1 .,s-1 !s-1 : ||
[T] |m .,m        :f .,f !m : ||
[B] |s-1        .,s-1 :s-1        .,s-1 !d-1 : ||
```

They still describe the same four pulses for each voice. You can align them by hand for readability, or let the formatter normalize the spacing with `voxalfa format`.

Lyrics do not have to be aligned with the solfa line either. They are matched to notes from left to right:

```voxalfa fragment
[S] |d .r :m .f !s .l :t .d+1 ||
[1]       do   re   mi   fa   so   la   ti   do
```

The example above is equivalent to writing the lyric tokens directly under the notes. Alignment is only a readability aid.
