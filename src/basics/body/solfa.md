# Solfa

Solfa lines use a voice marker and end with `||`:

```voxalfa fragment
[S] |d .r :m .f !s .l :t .d+1 ||
```

The voice must be declared in `voices` in the header. The marker selects which voice the line belongs to:

```voxalfa fragment
[S] |d :r !m :f ||
[A] |d :r !m :f ||
[T] |d :r !m :f ||
[B] |d :r !m :f ||
```

## Pulses and accents

A **pulse** is the basic rhythmic unit of a solfa line. Each pulse starts with an accent:

| Accent | Meaning |
| --- | --- |
| `\|` | Strong accent, normally at the beginning of a measure. |
| `!` | Medium accent, normally on the second or third beat depending on the time signature. |
| `:` | Weak accent. |

```voxalfa fragment
[S] |d :r !m :f ||
;    ^  ^  ^  ^
;    |  :  !  :
```

## Empty pulses

A pulse with an accent but no note is an empty pulse. Empty pulses are rests: they occupy time and count as lyric cells.

```voxalfa fragment
[S] |d : !m :f ||
```

In `2/4`, `| :` is an empty measure: an empty strong pulse followed by an empty weak pulse. Empty measures can be chained:

```voxalfa fragment
[S] | : | : |d :r ||
```

A pulse can also be partially empty. In `: .s`, the weak pulse has an empty first half and `s` on the second half:

```voxalfa fragment
[S] |d : .s ||
```

Empty pulses matter for timed parameters and lyrics: they advance the timeline and occupy a lyric cell. Use placeholders such as `~` or `~@4` in lyrics to reserve empty cells without rendering text (see [Lyrics](./lyrics.md#placeholders)).

## Notes

A note has three parts:

```text
base + optional variation + optional octave
```

The base notes are:

- `d`: do.
- `r`: re.
- `m`: mi.
- `f`: fa.
- `s`: sol.
- `l`: la.
- `t`: ti.

A variation lowers or raises the note:

| Variation | Meaning | Example |
| --- | --- | --- |
| `a` | Lowered | `da` |
| `i` | Raised | `di` |

An octave moves the note up or down:

| Octave | Meaning | Example |
| --- | --- | --- |
| `+1` | One octave up | `d+1` |
| `-1` | One octave down | `d-1` |

The parts can be combined:

```voxalfa fragment
[S] |d da di d+1 da-1 :r ri r+1 !m mi m-1 ||
```

## Beat dividers

A pulse can contain multiple notes. Beat dividers describe how the pulse is divided:

| Divider | Duration |
| --- | --- |
| `,` | Quarter (1/4). |
| `.` | Half (1/2). |
| `.,` | Three quarters (3/4), followed by one quarter. |

Successive notes without a divider are divided equally:

```voxalfa fragment
[S] |d .r :m .f !s .l :t .d+1 ||
;    |--|  |--|  |--|  |----|
;    1/2   1/2   1/2    1/2
```

`|d .r` is equivalent to `|dr`. Both divide the pulse into two halves.

Three consecutive notes form an implicit triplet:

```voxalfa fragment
[S] |d r m :f .s !l t d+1 :r ||
```

The same result can be written with explicit quarter marks:

```voxalfa fragment
[S] |d ,r ,m :f .s !l ,t ,d+1 :r ||
```

A dotted rhythm uses a half division followed by a quarter division:

```voxalfa fragment
[S] |d .,r :m .,f !s .,l :t .,d+1 ||
```

## Prolongation and slurs

A hyphen `-` prolongs the previous note:

```voxalfa fragment
[S] |d :- !m - :f ||
```

A backtick marks a slur. Surround a range with two backticks to slur the notes inside it. A slur indicates that the notes should be played legato, as one connected group:

```voxalfa fragment
[S] |`d :r !m :f` ||
```

In lyrics, the same marker underlines the text that corresponds to the slur:

```voxalfa fragment
[1] `do re mi fa`
```

## Time signature and accents

The time signature determines where strong and medium accents belong. In `4/4`, the first pulse is strong (`|`), the third is medium (`!`), and the remaining pulses are weak (`:`):

```voxalfa fragment
;    1    2    3    4
[S] |d   :r   !m   :f ||
```

In `3/4`, the first pulse is strong and the second and third are weak:

```voxalfa fragment
;    1    2    3
[S] |d   :r   :m ||
```

The compiler and renderer use the time signature to validate and display the score, but the accents are written explicitly in the solfa line.
