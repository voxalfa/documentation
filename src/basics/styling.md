# Styling

Styling directives change how a score looks. They are written in the header, using the `;; @` syntax described in [Directives](./directives.md).

```voxalfa fragment
;; @page width={200} | height={1000}
;; @style name="title-text" | font-size={20}
;; @style name="lyrics-text" | font-style="italic"
```

There are four kinds of styling directive: page, block spacing, text styles, and header layout.

## Page

`@page` sets the page size and margins. Width and height are SVG user units.

```voxalfa fragment
;; @page width={200} | height={1000} | margin={20}
```

| Option                                                       | Description                     |
| ------------------------------------------------------------ | ------------------------------- |
| `width`                                                      | Page width. Must be positive.   |
| `height`                                                     | Page height. Must be positive.  |
| `margin`                                                     | Margin on all sides.            |
| `margin-top`, `margin-right`, `margin-bottom`, `margin-left` | Individual margins.             |
| `margin-x`, `margin-y`                                       | Horizontal or vertical margins. |

Without `@page`, the page is A4 with a margin of `56.7` on all sides. When `@page` is used, it replaces those defaults: omitted width and height fall back to A4, and omitted margins become `0`. Only the last `@page` is used, so put every page option in one directive.

## Block spacing

`@header` and `@system` control the space around the header and around each system. Both accept `margin` and `padding`, with the usual side modifiers. Only the vertical values affect the page flow; horizontal values have no effect here.

```voxalfa fragment
;; @header margin-top={0} | margin-bottom={20}
;; @system margin-top={0} | margin-bottom={10}
```

The vertical spacing is calculated as follows:

- Above the header: page top margin + `@header` top margin.
- Between the header and the first system: `@header` bottom margin + `@system` top margin.
- Between systems: previous `@system` bottom margin + next `@system` top margin.

Padding adds space inside the block, and margin adds space outside it. By default, the header has a bottom margin of `20` and each system has a bottom margin of `10`.

## Text styles

Use `@style` to change the font, color, and spacing of text. Every style needs a `name`.

```voxalfa fragment
;; @style name="title-text" | font-family="serif" | font-size={24} | font-weight="bold"
;; @style name="note-text" | font-size={12}
;; @style name="lyrics-text" | font-size={10} | font-style="italic" | color="#333333"
```

Built-in names target different parts of the score:

| Name            | Target                                |
| --------------- | ------------------------------------- |
| `title-text`    | Score title.                          |
| `author-text`   | Author line.                          |
| `composer-text` | Composer line.                        |
| `header-text`   | Generic custom header text.           |
| `header-row`    | Default header row spacing.           |
| `key-text`      | Key signature text.                   |
| `time-text`     | Time signature text.                  |
| `meter-text`    | Meter text.                           |
| `note-text`     | Solfa note text.                      |
| `octave-text`   | Octave numbers.                       |
| `lyrics-text`   | Lyrics.                               |
| `divider-text`  | Dividers and barlines.                |
| `footer-text`   | Footer page number.                   |
| `key-label`     | Key label.                            |
| `time-label`    | Time label.                           |
| `tempo-label`   | Named tempo label, such as `allegro`. |
| `bpm-label`     | Numeric tempo mark, such as `M. 120`. |
| `jump-label`    | Jump label.                           |
| `mark-label`    | Mark label.                           |
| `dynamic-label` | Dynamic label.                        |
| `volta-label`   | Volta label.                          |

You can also create a custom name and use it in a header row. See [Advanced styling](#advanced-styling).

### Style properties

| Property       | Value                    | Description                                                                                                                                        |
| -------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `font-family`  | string                   | Font family.                                                                                                                                       |
| `font-size`    | number                   | Font size. Must be positive.                                                                                                                       |
| `font-style`   | `"normal"` or `"italic"` | Font style.                                                                                                                                        |
| `font-stretch` | string                   | `ultra-condensed`, `extra-condensed`, `condensed`, `semi-condensed`, `normal`, `semi-expanded`, `expanded`, `extra-expanded`, or `ultra-expanded`. |
| `font-weight`  | string                   | `thin`, `extra-light`, `light`, `normal`, `medium`, `semibold`, `bold`, `extra-bold`, or `black`.                                                  |
| `color`        | string                   | Text color.                                                                                                                                        |
| `margin`       | number                   | Margin on all sides.                                                                                                                               |
| `padding`      | number                   | Padding on all sides.                                                                                                                              |

Margin and padding also accept side modifiers: `-top`, `-right`, `-bottom`, `-left`, `-x`, and `-y`.

```voxalfa fragment
;; @style name="title-text" | margin-bottom={12} | padding={4}
;; @style name="lyrics-text" | margin-top={6} | margin-bottom={6}
```

A style only changes the properties you list. Everything else keeps its built-in value. If you declare the same name twice, the last declaration replaces the earlier one.

## Advanced styling

The header layout can be replaced with custom rows. By default, the header has three rows:

1. Title, centered.
2. Author left, meter center, composer right.
3. Key, time, and tempo on the left.

Use `@header-row` to replace this layout with your own rows. Each row can have a `left`, `center`, and `right` cell.

```voxalfa fragment
;; @header-row center="{{title}}" | center-style="title-text"
;; @header-row left="Author: {{author}}" | left-style="author-text" | right="{{composer}}" | right-style="composer-text"
;; @header-row left={"{{key}}", "{{time}}", "{{tempo}}"} | left-style={"key-text", "time-text", "bpm-label"}
```

A cell contains one template or a list of templates. A template is a quoted string where `{{field}}` inserts metadata:

```text
{{title}} {{author}} {{composer}} {{key}} {{time}}
{{tempo}} {{meter}} {{language}} {{description}}
```

Single braces are normal text:

```voxalfa fragment
;; @header-row left="Author {{author}} {credit}"
```

### Cell styles

`left-style`, `center-style`, and `right-style` choose a style for each template, in order:

```voxalfa fragment
;; @header-row left={"Author: ", "{{author}}"} | left-style={"header-text", "author-text"}
```

Here, `Author: ` uses `header-text` and `{{author}}` uses `author-text`. If there are more templates than styles, the remaining templates use `header-text`. A style applies to every part of its template, so use several templates when you need different styles in one cell:

```voxalfa fragment
;; @header-row left={"{{key}}", "{{time}}", "{{tempo}}"} | left-style={"key-text", "time-text", "bpm-label"}
```

Use the style's margins and padding, or spaces in the template, to separate items.

### Row styles

A row can use a style for its own spacing:

```voxalfa fragment
;; @style name="row-gap" | margin-top={4} | margin-bottom={10} | padding-x={12}
;; @header-row left="{{author}}" | right="{{composer}}" | style="row-gap"
```

The row style's vertical margins and padding add space above and below the row. Its horizontal margins and padding inset the content. A row's bottom spacing is only added when another row follows it. The row style only controls spacing: each template's own style controls its text.

The default layout uses the `header-row` style for its first two rows. The default `key-text` and `time-text` styles also add a right margin between the key, time, and tempo chunks.

### Rows and wrapping

Header rows render in declaration order. Each row shares the printable width equally between its non-empty cells, and text wraps when it is too wide.

Any `@header-row` replaces the default header layout. The `@header` margin and padding still apply to the custom layout.
