---
title: GBA pipeline
description: Generate Butano build inputs from a validated Bonka project.
---

# GBA pipeline

Bonka’s official target turns a Project Format v1 workspace into build inputs for [Butano](https://github.com/GValiente/butano), the Game Boy Advance engine and toolchain.

## Output flow

```text
Bonka project → validation → .bonka/ → Butano → GBA ROM
```

The generator reads the project, validates the resource graph and renders visible tile layers. It respects group structure, offsets, opacity and whole-metatile flips.

## Generated data

The GBA target creates its outputs only below `.bonka/`:

- Deduplicated 8 × 8 BPP8 tile-bank images.
- Butano metadata for tile graphics.
- Screenblock-ordered map data and map headers.
- C++ headers for the generated output.

Treat this directory as generated build data. It is safe to remove and regenerate, and should not be edited by hand.

## Target limits

The current regular-background generator requires 256 × 256 or 512 × 512 pixel backgrounds. A rendered result may use at most 256 colors and 512 unique 8 × 8 BPP8 tiles.

Your source tileset images must be PNG files for the GBA generator.

## Build the ROM

With the Docker environment running, use:

```bash
docker compose exec -T gba make
```

Bonka produces input data. Butano owns the actual ROM build and game runtime.
