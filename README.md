# After the Door Closed

## Concept

This project explores how loss does not change the external world, but changes how the world is perceived.

Instead of representing loss as an event, the project focuses on its aftermath:
the subtle shift in perception where familiar objects lose their emotional meaning.

The same moment is shown twice:
- Before the perceptual break
- After the perceptual break

The difference is not in the environment, but in how it is experienced.

> "The world did not change. I did."

---

## Artistic Approach

The project avoids direct emotional language.

Instead, it uses:
- everyday objects (chair, cup, room)
- minimal description
- subtle differences

to express emotional transformation indirectly.

The goal is not to explain feeling, but to let it emerge through perception.

---

## AI Techniques Used

This project uses **two distinct AI techniques**:

### 1. Large Language Model (LLM)
- Generates two versions of the same moment
- Applies strict rules:
  - object-focused writing
  - no direct emotional words
  - minimal structure
- Used as a controlled generative system, not a free writer

### 2. Image Generation (Text-to-Image)
- Creates visual interpretations of both states
- Uses the same object in both images
- Differentiates through:
  - lighting
  - composition
  - atmosphere

Together, they simulate a perceptual shift across both text and image.

---

## System Architecture

User Input → Backend (Node.js) → OpenAI API → Response → Frontend Display

1. User writes a simple moment
2. Backend sends structured prompt
3. AI generates:
   - before scene
   - after scene
   - shared symbolic object
4. Image model generates:
   - before image
   - after image
5. Frontend displays comparison

---

## Design Decisions

### Why comparison?
Loss is not a replacement.
The past and present coexist.

### Why objects?
Objects remain when meaning changes.
They carry memory without explanation.

### Why minimal language?
Direct emotion reduces complexity.
Indirect expression increases interpretation.

### Why web interface?
The user becomes part of the artwork by providing input.

---

## How to Run

```bash

npm install

node server.js
