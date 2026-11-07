# Metadata

Metadata lines use the `[#]` marker and describe the score. They are fully typed and may only appear in the header.

| Field | Type | Description |
| --- | --- | --- |
| `title` | string | Score title. |
| `author` | string or string list | Lyricist or text author. |
| `composer` | string or string list | Composer. |
| `verses` | number | Number of lyric verses. |
| `meter` | number list | Metrical structure, when relevant. |
| `release` | number | Release year. |
| `language` | string | Language code, for example `en` or `mg`. |
| `description` | string | Short description. |
| `tags` | string list | Searchable tags. |

## Example

```voxalfa fragment
[#] title="Ry Tanindrazanay Malala ô!"
[#] author={"Norbert Raharisoa", "Pasteur Rahajason"}
[#] description="The national anthem of Madagascar"
[#] verses={1}
[#] release={1958}
[#] language="mg"
[#] tags={"anthem", "madagascar"}
```

Multiple metadata lines can be used. Values may also be grouped on one line with `|`:

```voxalfa fragment
[#] title="Hello" | language="en" | verses={1}
```
