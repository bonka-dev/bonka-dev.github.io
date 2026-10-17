---
title: Project Format v1
description: The open, schema-validated data model behind Bonka projects.
---

# Project Format v1

Project Format v1 is Bonka’s public data boundary. It describes authored project data without prescribing a game runtime or target-specific behaviour.

The specification and JSON Schemas are licensed under Apache-2.0. The editor, core tooling and official GBA generator are GPL-3.0-or-later.

## Documents

Each document is UTF-8 JSON with `"formatVersion": 1`. Resource documents also have a `type` field.

| Document | Purpose                                                       |
| -------- | ------------------------------------------------------------- |
| Project  | The project root, resource lists and entry scene.             |
| Scene    | An isometric scene, its layers, objects and entity instances. |
| Tileset  | A source image and its tile layout.                           |
| Metatile | A reusable tile composition and collision cells.              |
| Sprite   | Animation frames and GBA source metadata.                     |
| Entity   | A reusable entity definition with optional components.        |

## Scenes and layers

Version 1 supports the `isometric` scene orientation. A scene is an ordered tree of layers:

- **Group layers** contain nested layers.
- **Tile layers** contain metatile placements and generic objects.
- **Object layers** contain generic objects and placements.

Each layer has visibility, opacity, an integer order and a pixel offset. A placement points to a standalone metatile and can request horizontal or vertical flips.

## Validation

Schemas verify the shape of an individual document. A project loader performs cross-document validation too: resource IDs, resource paths, scene bounds, tileset references, metatile dimensions, entity references and animation frames must all agree.

The format deliberately gives no special game meaning to player or enemy instances. Those are convenient editor presets, not built-in runtime roles.

For the normative specification and schemas, see the [Project Format package on GitHub](https://github.com/bonka-dev/studio/tree/master/packages/project-format).
