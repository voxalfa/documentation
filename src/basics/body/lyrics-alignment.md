# Advanced lyric alignment

The basic lyric rules cover one token per note. This page covers tokens that span several notes, voices with different pulse divisions, grouping, and special formatting.

## Explicit spans

The span modifier `@N` makes one lyric token cover `N` notes:

```voxalfa fragment
[S] |m :- .m |s : .s ||
[1] June,@2 now ground,@2 The
```

- `June,@2` covers the `m` and its prolongation (`-`).
- `ground,@2` covers the `s` and the empty half of `: .s`.

A trailing empty note counts too:

```voxalfa fragment
[S] |m : ||
[1] sound@2
```

The compiler does **not** infer spans from spacing. If you omit `@N`, later tokens shift left and the text is no longer aligned. Add spans explicitly when a token covers:

- a note plus a prolongation,
- a note plus an empty note,
- a slurred group,
- any other group of notes.

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

The first pulse has two soprano notes and one alto note. The lyric token `do` covers the whole pulse, so it is sung over both soprano notes and the single alto note. The same rule applies whenever voices have different beat divisions inside a pulse. This pulse-wide attachment is the main exception to the default one-token-per-note rule.

## Grouping

Parentheses group multiple words under a single note:

```voxalfa fragment
[S] |d :r !m :f ||
[1] (do o) re mi fa
```

Operators may be used inside a group.

## Underlining and slurs

Backticks underline the text that corresponds to a slur. Surround a range to underline it:

```voxalfa fragment
[S] |`d :r !m :f` ||
[1] `do re mi fa`
```

If the slurred group spans multiple notes and has a single lyric token, put the span outside the backticks:

```voxalfa fragment
[S] |`s .d+1` :t .r+1 ||
[1] `notes`@2 of the
```

## Special characters

Some characters have a syntactic meaning in lyrics. Use the corresponding escape when they must appear as text:

| Escape | Character |
| ------ | --------- |
| `&bls` | `\`       |
| `&tld` | `~`       |
| `&btk` | `` ` ``   |
| `&lpr` | `(`       |
| `&rpr` | `)`       |
| `&atr` | `@`       |
| `&amp` | `&`       |
| `&scl` | `;`       |

```voxalfa fragment
[S] |d :r !m :f ||
[1] do re&amp mi fa
```

Special characters are written as separate tokens. They do not consume an extra note. Keep an operator around them: `&scl The` and `&scl @@`, not `&sclThe` or `&scl@@`.

## Formatting

The formatter aligns lyrics for readability, but it does not add spans for you. Write `@N` in the source; formatting only changes whitespace.
