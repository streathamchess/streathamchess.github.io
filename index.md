---
title: Welcome
layout: default
---

{% include image.html url="/assets/chessart/soldier.jpg" description="Jean Metzinger, Soldat jouant aux échecs (Soldier at a Game of Chess)" %}

You’ve arrived at Streatham & Brixton Chess Club’s website.
We hope you’ll take a few moments to find out more about us – we’re a lively chess club
with a fast-growing membership and we provide opportunities for chess players of all
abilities.

We’re keen to attract new players of all kinds: experienced players who are looking for serious competitive chess,
casual players who want to play friendly social chess, and newcomers to the game who want
to develop their chess skills.

We offer one of the best-value membership packages in London with a special reduced rate
for the first year of membership. If all you want is to play ungraded games of friendly
chess, you won't have to pay anything at all.

So read on to learn a little more [about us](/about/index.html), [where we play](/about/venues.html) and [how to join](/join.html). Feel free to simply drop by at one our Tuesday sessions at Streatham Library, or [get in touch](contact.html) for more information on the club.

### Enter our Anniversary Rapidplay now, while there are still places left!
We’re holding a one day rapidplay on Saturday 17 September 2022 at Streatham Library to mark the conclusion of our 150th anniversary celebrations:
- Six rounds of 25 minutes plus 5 seconds per move.
- Two sections - Major (under 2400) and Minor (under 1750).
- Entry fee just £20 for ECF Silver members.
- Winners and runners-up in each section will receive £100/£50; further prizes subject to entries.

For more information, and to enter online, visit the [tournament website](http://congress.org.uk/congress/187/home).


<br/>

<hr>

<style>
    #latestarticles {
        color:  white;
        background-color: darkslategrey;
        padding-top: 10px;
        padding-left: 5px;
    }
   
   
</style>
<div id="latestarticles">

<h2>Latest Articles</h2>

Catch up on club news by downloading our most recent newsletters, just click on the links below:
<br/>    
[August 2022](https://drive.google.com/file/d/1TStQOfHDLuJ-uTIPbAs8nIJCJiuDsdXI/view?usp=sharing).
<br/>
[June 2022](https://drive.google.com/file/d/1ZR0n5q0LHi9--hnlL-2KCl53EQbIMfUv/view?usp=sharing).
<br/>
[March 2022](https://drive.google.com/file/d/1Dk7SYb557t3XwlY6L7nTaMOU7XhZqTBZ/view?usp=sharing).
<ul>
{% for post in site.posts limit:3 %}

    <li>
    	<h4><a href="{{ post.url }}">{{ post.title }}</a>  &nbsp; <small>{{ post.date | date_to_long_string }}</small></h4>
    	<p>
    		{{ post.description }}
    	</p>
    	<p>

    	</p>
    </li>

{% endfor %}
</ul>
<br><br>
 </div>
