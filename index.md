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
<!--br>
<b>Please note that this website is currently being updated and some of the information may no longer be correct.</b--> 

### Club newsletters
<p> Find out what's been happening at our club by downloading our most recent newsletters. Just click on the links below:
<p>
<a href="https://drive.google.com/file/d/1UatDsN2y8wiQhSoQZ5qmJ0MDxiMhkKMk/view?usp=sharing">December 2022</a>.
<p>
<a href="https://drive.google.com/file/d/1TStQOfHDLuJ-uTIPbAs8nIJCJiuDsdXI/view?usp=sharing">August 2022</a>.
<p>
<a href="https://drive.google.com/file/d/1ZR0n5q0LHi9--hnlL-2KCl53EQbIMfUv/view?usp=sharing">June 2022</a>.
<p>
<a href="https://drive.google.com/file/d/1Dk7SYb557t3XwlY6L7nTaMOU7XhZqTBZ/view?usp=sharing">March 2022</a>.
<p>
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
