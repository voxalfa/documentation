# Styling

Styling directives control page dimensions and the appearance of rendered elements. They use the `;; @` syntax described in [Directives](../directives.md) and are placed in the header.

```voxalfa fragment
;; @page width={200} | height={1000}
;; @note-text font-size={12}
;; @lyrics-text font-size={10} | font-style="italic"
```

## Page

The `page` directive controls the page dimensions and margins. Width and height are SVG user units; the default page is A4.

```voxalfa fragment
;; @page width={200} | height={1000} | margin={20}
```

Margins can also be set per side in the same directive:

```voxalfa fragment
;; @page width={200} | height={1000} | margin-top={30} | margin-right={20} | margin-bottom={30} | margin-left={20}
```

Only the last `@page` directive is used. Options omitted from it are not inherited from earlier `@page` directives: `width` and `height` fall back to the A4 defaults, and margins default to `0`. Put all page options in a single directive.

Page options:

| Option                                                       | Description                     |
| ------------------------------------------------------------ | ------------------------------- |
| `width`                                                      | Page width. Must be positive.   |
| `height`                                                     | Page height. Must be positive.  |
| `margin`                                                     | Margin on all sides.            |
| `margin-top`, `margin-right`, `margin-bottom`, `margin-left` | Individual margins.             |
| `margin-x`, `margin-y`                                       | Horizontal or vertical margins. |

## Layout blocks

The `header` and `system` directives control the space around the header block and around each system. They accept `margin` and `padding` with the same side modifiers as element styles. Only the vertical values affect page flow.

```voxalfa fragment
;; @header margin-top={0} | margin-bottom={20}
;; @system margin-top={0} | margin-bottom={10}
```

- Space before the header: `page` margin top + `header` margin top.
- Header to first system: `header` margin bottom + `system` margin top.
- Between systems: previous `system` margin bottom + next `system` margin top.

Padding is added inside the block, before its margins. Defaults are `header` margin-bottom `20` and `system` bottom `10`.

## Element styles

Element directives control typography and spacing for a specific part of the rendered score:

```voxalfa fragment
;; @title-text font-family="serif" | font-size={24} | font-weight="bold" | color="#222222"
;; @note-text font-size={12}
;; @lyrics-text font-size={10} | font-stretch="condensed" | font-style="italic" | color="#333333"
;; @bpm-label font-size={10} | font-style="normal"
```

Element directives:

| Directive       | Target                                |
| --------------- | ------------------------------------- |
| `title-text`    | Score title.                          |
| `author-text`   | Author line.                          |
| `composer-text` | Composer line.                        |
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

### Element properties

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
;; @title-text margin-bottom={12} | padding={4}
;; @lyrics-text margin-top={6} | margin-bottom={6}
```

If the same element directive is declared more than once, the last declaration replaces the earlier style entirely. Combine all properties for an element in one directive.
