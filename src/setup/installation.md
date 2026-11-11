# Installation

The `voxalfa` command-line tool provides formatting, validation, and conversion to MIDI, SVG, and PDF.

Voxalfa is currently in alpha stage and there is no stable release yet. We recommend using nightly builds for the moment.

## Nightly binaries

Prebuilt binaries are published under the [`nightly` release](https://github.com/voxalfa/voxalfa/releases/tag/nightly):

| Platform            | Asset                         |
| ------------------- | ----------------------------- |
| Linux x86-64        | `voxalfa-linux-x86_64.tar.gz` |
| macOS Intel         | `voxalfa-macos-x86_64.tar.gz` |
| macOS Apple Silicon | `voxalfa-macos-arm64.tar.gz`  |
| Windows x86-64      | `voxalfa-windows-x86_64.zip`  |

Download and extract the binary for your platform, make it executable if necessary, and place it somewhere on your `PATH`.

Example on Linux:

```bash
chmod +x voxalfa-linux-x86_64
mv voxalfa-linux-x86_64 ~/.local/bin/voxalfa
voxalfa --version
```

Nightly builds track the `main` branch and may contain breaking changes.

## Build from source

Voxalfa is a [Rust](https://rust-lang.org/) project, so you can easily build it from source with the Rust [toolchain](https://rustup.rs/).

```bash
git clone https://github.com/voxalfa/voxalfa.git
cd voxalfa
cargo install --path voxalfa-cli
```

Alternatively, build without installing:

```bash
cargo build --release -p voxalfa-cli
./target/release/voxalfa --help
```

## Verify the installation

```bash
voxalfa --version
voxalfa --help
```

## Command overview

| Command                                 | Description                                |
| --------------------------------------- | ------------------------------------------ |
| `voxalfa check <files>`                 | Validate partitions and print diagnostics. |
| `voxalfa format <files>`                | Format partitions in place.                |
| `voxalfa format --check <files>`        | Check whether files are already formatted. |
| `voxalfa midi <files>`                  | Convert partitions to MIDI files.          |
| `voxalfa svg <files>`                   | Render partitions to SVG pages.            |
| `voxalfa pdf <files>`                   | Render partitions to PDF.                  |
| `voxalfa lyrics --voice <voice> <file>` | Extract the resolved lyrics for one voice. |

For example:

```bash
voxalfa check score.vfa
voxalfa midi score.vfa
voxalfa svg score.vfa -o score.svg
voxalfa pdf score.vfa -o score.pdf
```

When no output path is given, the converter writes next to the source file using the matching extension.
