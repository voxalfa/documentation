# Overview

Voxalfa is a declarative, line-based language. Voxalfa files use the `.vfa` extension. Declarations never span multiple lines, and each one starts with a short marker in square brackets, such as `[#]`. The marker says what the line is for. There are no indentation or space-based rules.

## Markers

| Marker                     | Meaning                                                        |
| -------------------------- | -------------------------------------------------------------- |
| `[#]`                      | Header metadata.                                               |
| `[$]`                      | Parameters, either in the header or at the start of a section. |
| `[S]`, `[A]`, `[T]`, `[B]` | Solfa lines for the voices declared in the [header](./header/parameters.md#voices). |
| `[1]`, `[2]`, `[3]`, ...   | Lyrics for the corresponding verse.                            |
| `[*]`                      | Wildcard lyrics, shared by every verse.                        |

## Declarations

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

The **body** contains sections. Each section holds one or more sub-sections with solfa lines and their lyrics. Sections are separated by `--`, `<<`, or `==`, and sub-sections by `++`. These separators are covered in [Body](./body.md).

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
