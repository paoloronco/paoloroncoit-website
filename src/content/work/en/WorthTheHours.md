---
title: "WorthTheHours"
summary: "An Android app that converts an item's price into the working hours needed to afford it, making the cost more tangible."
category: "tool"
stack: ["Kotlin", "Jetpack Compose", "Room", "Hilt"]
problem: "A monetary amount alone does not always communicate how much working time it represents for an individual."
solution: "The app calculates an hourly value from salary details, stores items for evaluation, and automatically translates every price into hours and minutes of work."
outcome: "A local, private tool for comparing purchases in terms of time, with a Material 3 interface and on-device persistence."
featured: false
order: 10
draft: false
links:
  - label: "GitHub repository"
    href: "https://github.com/paoloronco/WorthTheHours"
  - label: "Project website"
    href: "https://paoloronco.github.io/WorthTheHours/"
---

## From money to time

WorthTheHours starts from salary and working schedule data to calculate the time cost of saved items. The list makes it possible to compare purchases using the same personal metric.

## Android architecture

The project uses MVVM, Jetpack Compose, Hilt, Coroutines, and Flow. Preferences and items remain on the device through DataStore and local persistence.
