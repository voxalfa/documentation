# Indexing system

Music often needs directions attached to individual notes: a crescendo starting here, a fermata on one note, a key or tempo change later, or a jump after a particular note.

Voxalfa uses a simple indexing system to place these values. To choose the note where a value applies, give it an index. The values that accept indices are `key`, `tempo`, `jump`, `mark`, `touches`, `barline`, and `dynamics`.

## How indices work

Think of the section as a row of pulses. The first pulse is `0`, the next is `1`, and so on. The index depends on how many notes share a pulse.

One note in a pulse:

```voxalfa fragment
;    0
[S] |d ||
```

Two notes using a half division:

```voxalfa fragment
;    0   0.5
[S] |d  .r ||
```

Three notes using explicit thirds:

```voxalfa fragment
;    0   0.3 0.7
[S] |d  ,r  ,m ||
```

Triplets use the rounded values `0.3` and `0.7` for convenience instead of exact thirds.

Four notes using explicit quarters:

```voxalfa fragment
;    0   0.25 0.5  0.75
[S] |d  ,r   ,m   ,f ||
```

Dotted rhythm using `.,`:

```voxalfa fragment
;    0    0.75
[S] |d  .,r ||
```

Add the pulse number to find the final index. Here, the second note of pulse `2` is `2.5`:

```voxalfa fragment
;    0   0.5 1   1.5 2   2.5
[S] |d  .r  :m  .f  !s  .l ||
```

Rests and prolonged notes still take their place and move the count forward.

All indexed values in a section use the same grid. Use `value:index` for a single note or `value:start..end` for a range:

```voxalfa fragment
[$] key={C, G:4}
[$] tempo={adagio, 120:4}
[$] dynamics={p, cresc:2..5, f:5}
[$] touches={fermata:6}
```

```voxalfa fragment
[$] dynamics={p, cresc:0.5..1, f:1.5}

;    p          cresc.......    f
;    0    0.25  0.5  0.75  1    1.5
[S] |d    ,r    .m   ,f    :s   .l ||
```

Here `p` is on `d`, the crescendo starts at `m` and includes `s`, and `f` is on `l`.

## Default placement

When no index is written, the parameter uses its default position:

| Parameter       | Default position   |
| --------------- | ------------------ |
| `key`           | start of section   |
| `tempo` static  | start of section   |
| `tempo` gradual | whole section      |
| `dynamics`      | first note         |
| `touches`       | first note         |
| `mark={S/C}`    | start of section   |
| `mark={F/TC}`   | end of section     |
| `jump`          | end of section     |
| `barline`       | start of section   |

`label`, `time`, `ending`, and `repeat` are not indexed values.

## Ranges

A range uses `start..end` and is inclusive. Both endpoints must match note starts. The end note receives the final value.

```voxalfa fragment
[$] dynamics={cresc:0.5..1}
```

This starts the crescendo at `m` and includes `s`. Visually, the hairpin stops at the end note.

## Across sections

`--` restarts the index at `0` for the next section. `<<` continues it. Sub-sections created with `++` use the same indices as their section.

Merged sections are useful for ranges that continue across a section boundary:

```voxalfa fragment
[$] dynamics={p:2, cresc:2..5, f:5}

;          p cresc...
;    0  1  2  3
[S] |d :r !m :f ||

<<

;    ...f
;    4  5  6  7
[S] |s :l !t :d+1 ||
```

If you do not need continuous indexing, use `--` instead.
