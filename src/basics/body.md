# Body

The body is the part of a Voxalfa file after the `---` separator. It is composed of sections, each containing solfa lines, lyrics, and the parameters that change during the score.

## Sections

Sections are the building blocks of a score. Each section groups the voices and lyrics that belong together, keeping the score modular and reusable; page and system breaks are left to the renderer.

Sections can also override parameters. Key, time signature, and tempo stay in effect from that section onward until changed again:

```voxalfa fragment
[$] key={C} | tempo={100}

[S] |d :r !m :f ||

[1] do re mi fa @@

--

[$] key={G} | tempo={120}

[S] |s :l !t :d+1 ||

[1] so la ti do @@
```

See [Sections](./body/sections.md) to learn more.

## Section parameters

Parameters at the start of a section use the `[$]` marker and can override the header:

```voxalfa fragment
[$] key={G} | time={3,4} | tempo={110} | label="Verse" | mark={S}
```

`key`, `tempo`, `jump`, `mark`, `touches`, `barline`, and `dynamics` are indexable and can target a specific note with an [index](./body/indexing.md).

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
