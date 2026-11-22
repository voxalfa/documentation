# Body

The body is the part of a Voxalfa file after the `---` separator. It contains the music: solfa lines, lyrics, and the parameters that change during the score.

## Sections

The body is divided into sections, and sections can be split into sub-sections. Separators define how the music is grouped and how pulse indices continue.

| Separator | Meaning                                                       |
| --------- | ------------------------------------------------------------- |
| `--`      | Start a new section and restart pulse indices.                |
| `<<`      | Start a merged section and continue pulse indices.            |
| `==`      | Major section break, rendered as a double barline.            |
| `++`      | Start a sub-section; pulse indices continue.                  |

See [Sections](./body/sections.md) for merged sections, major sections, sub-sections, and pulse indexing.

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
