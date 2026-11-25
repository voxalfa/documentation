# Directives

Directives provide compiler and rendering context. They use the `;; @` prefix and are placed in the header:

```voxalfa fragment
;; @version 0.1.0-alpha

;; @page width={200} | height={1000}
;; @style name="lyrics-text" | font-size={10} | font-style="italic"
```

A directive starts with `;; @`, followed by its name and a value:

```text
;; @name value
```

Two value forms are supported:

- **Assignments** for styling directives, with one or more `key=value` pairs separated by `|`.
- **A single value** for directives such as `version`.

Values use the same [data types](./data-types.md) as metadata and parameters: strings are quoted, numbers are written in braces, and builtins are unquoted.

## Version

The optional `version` directive declares which compiler version the file targets:

```voxalfa fragment
;; @version 0.1.0-alpha
```

It is validated when present. A file written for an incompatible version produces a diagnostic.

Page, style, and header layout directives are covered in [Styling](./styling.md).
