# WuWa Echo Advisor

## Description
A static site for scoring Wuthering Waves echo builds. Substat priority and Sonata
Effect recommendations are sourced from prydwen.gg. Mark the characters you own,
enter your build (5 echoes: cost, main stat, 4 substats, Sonata Effect), and get a
numeric build score with concrete suggestions on what to improve.

## Features
- WuWa character roster with an "I own this" toggle (saved in the browser)
- Character page: recommended main stats, substat priority, recommended Sonata Effect
- Build input form (5 echoes) and scoring: per-echo score + overall score/rank (S/A/B/C)
- Detailed breakdown on click: what's right, what's worth re-rolling
- Build and roster are saved locally (localStorage), nothing is sent to a server

## Data Source
prydwen.gg (Wuthering Waves character build guides). Updated manually / on a schedule.
