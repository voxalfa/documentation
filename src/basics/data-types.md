# Data Types

As a data-oriented language, Voxalfa has a small set of primitive types to represent values. Strings are written directly after `=` with quotes. Non-delimited values such as numbers and builtins must be wrapped in braces, even when they are single values: `tempo={100}`, `key={C}`. Lists and structured values also use braces.

Examples in this chapter often show alternative values for the same key. In a real file, assign each key once per scope; reassigning a key produces a warning.

## Primitive types

| Type    | Examples                       | Notes                            |
| ------- | ------------------------------ | -------------------------------- |
| Number  | `100`, `1.5`, `3`              | Integers and floats.             |
| String  | `"Hello"`, `"mg"`              | Delimited by double quotes.      |
| Boolean | Reserved                       | Planned for future options.      |
| Builtin | `C`, `allegro`, `S`, `fermata` | Predefined constants; see [Builtins](./builtins.md). |

## Strings

Strings are always quoted:

```voxalfa fragment
[#] title="Ry Tanindrazanay Malala ô!"
[#] language="mg"
```

A string list uses braces and comma-separated values:

```voxalfa fragment
[#] author={"Norbert Raharisoa", "Pasteur Rahajason"}
[#] tags={"anthem", "madagascar"}
```

## Numbers

Integers and floats are written without quotes:

```voxalfa fragment
[#] verses={1}
[#] release={1958}
[$] tempo={100}
```

Some parameters expect a list of numbers, such as the time signature:

```voxalfa fragment
[$] time={4,4}
[$] time={3,4}
```

## Booleans

Boolean values are reserved for future options. No current metadata field or parameter uses them yet.

## Lists

Lists are comma-separated values inside braces:

```voxalfa fragment
[$] voices={S,A,T,B}
[#] tags={"anthem", "evangelic"}
[$] time={6,8}
```

## Builtins

Builtins are predefined constants such as keys, tempos, voices, jumps, marks, touches, and dynamics. They are documented separately in [Builtins](./builtins.md).
