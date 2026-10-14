# Tesla Supercharger Fleet & Battery Storage Platform

## Overview

Frontend application developed for the Midterm Exam of the Open Source course. The system monitors Tesla charging stations and manages vehicle charging sessions using Angular, Angular Material, and a Domain-Driven Design (DDD) layered architecture.

## Authorship

- Student: Frank Huingo
- Student Code: u202319057
- Course: Open Source / Web Applications Development (1ASI0729)
- Section / NRC: 7760
- Academic Term: 2026-2

## Technical Stack

- Angular (Standalone Components)
- TypeScript
- Angular Material
- Angular Signals (State Management)
- @ngx-translate (i18n)
- json-server (Mock Backend)
- NHTSA VPIC API (Vehicle Makes)

## Architecture

The project is structured following Domain-Driven Design (DDD) principles:
- `shared`: Base classes, common layout, language switcher, footer, and shared views (Home, 404).
- `stations`: Core domain entities, API endpoints, reactive store with signals, station summary cards, and new vehicle charge form.
- `vehicles`: NHTSA API integration to load vehicle makes dynamically.

## Getting Started

### 1. Install Dependencies

npm install


### 2. Start the Mock Server

npm run server

The mock backend runs at `http://localhost:3000`.

### 3. Run the Application

npm start

Navigate to `http://localhost:4200/`.

### 4. Build for Production

npm run build

