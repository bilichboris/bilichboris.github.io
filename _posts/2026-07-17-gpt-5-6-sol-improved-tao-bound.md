---
layout: post
title: "GPT-5.6 Sol improved an upper bound from a 2019 paper by Terry Tao in just 13 minutes"
date: 2026-07-17
description: GPT-5.6 Sol improved Tao's commutator bound and formalized the result in Lean.
tags: [operator-theory, AI, Lean]
categories: [mathematics]
---

There is a classical result in operator theory with broad implications for quantum mechanics: the operator equation <em>[D, X] = 1</em> has no exact solutions for bounded operators. What if we want to solve it approximately?

Popa proved that, for a solution with error less than <em>ε</em>, the operators must have norm at least ½ log(1/<em>ε</em>). However, we do not yet know whether this bound is achievable. In 2019, Tao constructed a solution with norm <em>O</em>(log<sup>5</sup>(1/<em>ε</em>)). Today, GPT-5.6 Sol improved this result to <em>O</em>(log<sup>4</sup>(1/<em>ε</em>)) in just 13 minutes, then formalized it in Lean in less than three hours.

Perhaps the biggest highlight is that both the proof and the formalization were completed with just a Plus subscription, so you do not need Pro to obtain new results already. Could Tao or anyone else do it themselves? Definitely, but it would likely take much more time: Tao himself improved the exponent from 16 to 5 following reviewer comments.

**Challenge:** Can Pro achieve the conjectured <em>O</em>(log(1/<em>ε</em>)) bound?

- [Repository](https://github.com/bilichboris/TaoCommutators)
- [Paper (local PDF)]({{ '/assets/pdf/log4_commutators_revised.pdf' | relative_url }})
