---
layout: post
title: "The Ashley matrix is strong shift equivalent to (2)."
date: 2026-08-21
description: An explicit 69-step certificate resolves the long-standing Ashley matrix problem.
tags: [symbolic-dynamics, strong-shift-equivalence]
categories: [mathematics]
---

**Update (22 August 2026):** Emmanuel Jeandel contacted me to share that he found a strong shift equivalence certificate a year ago, although the result was not made public. His arXiv paper is expected to appear on 23 August 2026. The certificates are available [on his website](https://members.loria.fr/EJeandel/sse.html). His work covers a much broader class of matrices, including Baker matrices and their polynomial generalizations. I therefore claim no precedence; Emmanuel deserves full credit for the result.

It had been an open problem since 1989 whether Ashley's eight-by-eight matrix is strong shift equivalent to the one-by-one matrix \([2]\). Today, GPT-5.6 Sol found an SSE certificate of length 69! This gives more evidence that Williams' conjecture holds for full shifts by ruling out a long-standing counterexample candidate.

I was trying to find the certificate myself for some time. But honestly, I spent much more time trying to prove that no strong shift equivalence exists here. I am quite surprised that such a long certificate could be found in such a huge SSE graph. In the coming weeks, I will try to digest it and hope to return with an explanation of how this result was achieved.

The certificate and a self-contained checker are available below. The largest matrix in the SSE chain is of size 11. You can just download the Python code and open it to see that the verifier code is correct and that the target is indeed Ashley's matrix. You can also send either the JSON or the Python code to any LLM for verification.

- [Certificate (JSON)]({{ '/assets/json/sse_certificate_2_to_ashley_374865.json' | relative_url }})
- [Python checker]({{ '/assets/python/check_ashley_sse_minimal.py' | relative_url }})

**References:** Bruce P. Kitchens, [*Symbolic Dynamics: One-sided, Two-sided and Countable State Markov Shifts*](https://doi.org/10.1007/978-3-642-58822-8), Example 2.2.7 (Springer, 1998); Mike Boyle, [“Open Problems in Symbolic Dynamics”](https://doi.org/10.1090/conm/469/09161), *Contemporary Mathematics* **469** (2008), 69–118.
