---
title: Installation
description: Prepare Bonka, Butano and Docker for a local GBA workflow.
---

# Installation

The browser editor uses the File System Access API to work directly with project folders on your own computer.

> **Desktop app coming soon.** A desktop version of Bonka is in development.

## Requirements

- Git
- Docker and Docker Compose
- A local checkout of Butano
- An optional Game Boy Advance emulator for testing ROMs

Node.js 20 or newer is required when you run the editor outside Docker.

## Clone the repository

```bash
git clone https://github.com/bonka-dev/studio.git bonka-studio
cd bonka-studio
git clone https://github.com/GValiente/butano.git vendor/butano
```

## Start the development environment

```bash
docker compose up -d --build
```

Open the editor at [http://localhost:8000](http://localhost:8000).

## Build a ROM

After you have generated inputs from a project, run:

```bash
docker compose exec -T gba make
```

Generated inputs are disposable files below `.bonka/`. Do not edit them manually; regenerate them when the authored project changes.

Use [Configuration](/docs/configuration) next to understand the project workspace.
