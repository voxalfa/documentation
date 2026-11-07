# Parameters

Initial parameters use the `[$]` marker and control how the score is played. They may only appear in the header.

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | key | Initial [key signature](../data-types.md#keys). |
| `time` | number list of length 2 | Time signature, for example `{4,4}`. |
| `tempo` | static tempo | Initial [tempo](../data-types.md#tempos) name or BPM value. |
| `voices` | voice list | [Voices](../data-types.md#voices) available in the body. |

`time` and `voices` are required when the body contains solfa lines.

```voxalfa fragment
[$] key={Eb} | time={3,4} | tempo={70} | voices={S,A,T,B}
```

`voices` defines which voices may be used by solfa lines. Every parameter except `voices` can be overridden later in the body at section level.

## Key

```voxalfa fragment
[$] key={C}
[$] key={F#}
[$] key={Bb}
```

See [Keys](../data-types.md#keys) for the full syntax.

## Time signature

The time signature is a two-element list: the number of beats per measure and the note value that receives one beat.

```voxalfa fragment
[$] time={4,4}
[$] time={3,4}
[$] time={6,8}
```

The time signature determines the expected accents inside each measure. In `4/4`, the first pulse is strong (`|`), the third is medium (`!`), and the others are weak (`:`).

## Tempo

```voxalfa fragment
[$] tempo={adagio}
[$] tempo={100}
```

See [Tempos](../data-types.md#tempos) for the available names.

## Voices

```voxalfa fragment
[$] voices={S,A,T,B}
[$] voices={S,A}
```

Each voice used in the body must be listed here. See [Voices](../data-types.md#voices) for the available voice names.
