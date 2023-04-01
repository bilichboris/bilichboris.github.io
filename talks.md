---
layout: page
title: Talks
permalink: /talks/
---

{% assign sorted_talks = site.talks | default: "" %}
{% if sorted_talks != "" %}
  {% assign sorted_talks = sorted_talks | sort: 'date' | reverse %}
  {% for talk in sorted_talks %}
- **{{ talk.date | date: '%B %-d, %Y' }}**: [{{ talk.title }}]({{ talk.url }}), {{ talk.event }}, {{ talk.location }}
  {% endfor %}
{% else %}
  No talks available.
{% endif %}
