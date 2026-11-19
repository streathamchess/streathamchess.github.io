---
title: Latest Members Grades
layout: default
seo_title: "Members' ECF Grades - Streatham & Brixton Chess Club"
description: "Current ECF standard, rapid and blitz ratings of Streatham & Brixton Chess Club players, highest standard rating first."
---
{% assign grades = site.data.ecf_grades %}
These are the ECF ratings of the players the ECF lists for our club, highest Standard rating first. It is a copy of the [ECF rating list for the club]({{ grades.source }}) ({{ grades.rating_list }} list), refreshed every Monday. Over-the-board ratings only; a blank means the player has no rating of that kind. Click a name to see that player's full ECF record.

<div class="table-responsive">
<table class="table table-striped table-condensed" style="width:auto">
<thead>
<tr><th>&nbsp;</th><th>Player</th><th class="text-right">Standard</th><th class="text-right">Rapid</th><th class="text-right">Blitz</th></tr>
</thead>
<tbody>
{%- for p in grades.players %}
<tr><td class="text-muted">{{ forloop.index }}</td><td><a href="https://rating.englishchess.org.uk/players?ECF_code={{ p.code }}">{% if p.title != '' %}{{ p.title }} {% endif %}{{ p.name }}</a></td><td class="text-right">{{ p.std }}</td><td class="text-right">{{ p.rapid }}</td><td class="text-right">{{ p.blitz }}</td></tr>
{%- endfor %}
</tbody>
</table>
</div>

If you would like to know how ratings are calculated, see the
[ECF rating database](https://rating.englishchess.org.uk/).
