# Parameters

Initial parameters use the `[$]` marker and set the starting key, time signature, tempo, and available voices. Key, time, and tempo can be overridden later in sections.

| Parameter | Type                    | Description                                                 |
| --------- | ----------------------- | ----------------------------------------------------------- |
| `key`     | key                     | Initial [key signature](../builtins.md#keys).             |
| `time`    | number list of length 2 | Time signature, for example `{4,4}`.                        |
| `tempo`   | static tempo            | Initial [tempo](../builtins.md#tempos) name or BPM value. |
| `voices`  | voice list              | [Voices](../builtins.md#voices) available in the body.    |

Header parameters are not indexed. `time` and `voices` are required when the body contains solfa lines. For playback, `key` and `tempo` are also required.

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

See [Keys](../builtins.md#keys) for the full syntax.

## Time signature

The time signature is a two-element list: the number of beats per measure and the note value that receives one beat.

```voxalfa fragment
[$] time={4,4}
[$] time={3,4}
[$] time={6,8}
```

The time signature sets the number of pulses in a measure and the accents expected inside it. See [Pulses and accents](../body/solfa.md#pulses-and-accents) for how accents are written.

## Tempo

```voxalfa fragment
[$] tempo={adagio}
[$] tempo={100}
```

See [Tempos](../builtins.md#tempos) for the available names.

## Voices

```voxalfa fragment
[$] voices={S,A,T,B}
[$] voices={S,A}
```

The `voices` list is an ordered pattern of soprano, alto, tenor, and bass parts. It is not limited to SATB: use any sequence, such as `{S,A,T}` or `{S,S,A,A,T,T}` (SSAATT). Solfa lines in each section must appear in the same order as this list. See [Voices](../builtins.md#voices) for the available voice names.
