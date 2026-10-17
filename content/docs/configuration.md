---
title: Configuration
description: Understand a Bonka Project Format v1 workspace and editor workflow.
---

# Configuration

Every Bonka workspace begins with a Project Format v1 project document. It lists the project name, start scene and paths to its resource documents.

## Create a project

1. Start the Bonka editor in a Chromium-based desktop browser.
2. Choose **New project** and grant access to an empty folder.
3. Give the project a name.
4. Import a PNG tileset from the Assets panel.
5. Compose a metatile, then select it and paint into a scene.

The editor saves resources as individual JSON documents so the project can be reviewed and versioned alongside its source images.

## Project root

The project document contains its format version, engine, start scene and all resource paths:

```json
{
  "formatVersion": 1,
  "name": "old-road",
  "engine": "butano",
  "startScene": "old-road",
  "resources": {
    "scenes": ["scenes/old-road.scene.json"],
    "tilesets": ["tilesets/forest.tileset.json"],
    "metatiles": ["metatiles/path.metatile.json"],
    "sprites": [],
    "entities": []
  }
}
```

All resource paths are relative, use forward slashes and stay inside the project root. See [Project Format v1](/docs/project-format) for the complete model.
