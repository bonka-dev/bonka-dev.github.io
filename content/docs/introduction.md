---
title: Introduction
description: What Bonka is, what it creates, and where it fits in a GBA project.
---

# Introduction

Bonka is an experimental, browser-based editor and Game Boy Advance development toolkit. It helps you author isometric scenes, tilesets, metatiles, layers, objects and generic entities in a clear project format.

Designed as a local workflow, it has no server and sends no project data anywhere: your project stays on your computer in the folder you select, which the editor accesses directly through the File System Access API.

It is built for the creative part of a GBA workflow: arranging the world before you build the game around it.

## What Bonka does

- Imports PNG tilesets and presents a searchable tile palette.
- Lets you compose reusable metatiles and mark collision cells.
- Paints isometric scenes with layers, groups, offsets and flips.
- Stores authored data as separate JSON documents.
- Generates Butano build inputs below `.bonka/`.

## What Bonka does not do

Bonka is not a game runtime, engine or browser game exporter. It does not define player behaviour, enemies, combat, scripting or gameplay rules. Butano remains the C++ framework that builds the ROM.

## Current status

Version 0.3.0 introduces Project Format v1 and the first complete browser-editor-to-GBA-generator workflow. The toolset is experimental and currently targets the Game Boy Advance only.

Continue with [Installation](/docs/installation) to prepare a local workspace.
