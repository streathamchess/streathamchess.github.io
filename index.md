---
title: Welcome
layout: default
---

{% include image.html url="/assets/chessart/soldier.jpg" description="Jean Metzinger, Soldat jouant aux échecs (Soldier at a Game of Chess)" %}

## Chess while coronavirus continues

As of July 19th, face-to-face chess is cautiously restarting, with clubs and leagues considering how and when to play over the board again. However, S&BCC’s social and competition chess at Streatham Library remains suspended while the Mark Bennett Streatham Centre is used for COVID-19 testing.

While face to face chess recovers, Streatham and Brixton Chess Club will remain active as follows:

- We will maintain teams in online leagues.
- We will continue with friendly matches online and/or face to face at away venues.
- We will continue to hold internal tournaments both informal and more serious - online and/or face-to-face if it becomes possible.

Membership fees will start up again as things get back to normal. 

### Getting started with online chess

To get started playing with clubmates and in club-organised events, do the following:

#### 1) Create an account on lichess.org

Register with lichess  [(https://lichess.org/)](https://lichess.org/), and create an online user name (if possible one that other members will be able to easily recognize). You can start playing casual games straightaway. 

#### 2) Join our online club

Join our lichess online club by visiting [https://lichess.org/team/streatham--brixton-chess-club](https://lichess.org/team/streatham--brixton-chess-club) and hit ‘Join’. Note that it might take a day or so for your membership request to be processed by club officers.

Joining the online group will help you find fellow members and enable you to play in club-only events.

Keep an eye on the club's lichess forum: [https://lichess.org/forum/team-streatham--brixton-chess-club](https://lichess.org/forum/team-streatham--brixton-chess-club)

Here we will post messages about what will be happening online for our members.

#### 3) Mobile apps

Once you are all set up on lichess you might want to get a mobile app. These are available in the normal Apple and Google app stores. Some information about the mobile apps can be found here:  [https://lichess.org/mobile](https://lichess.org/mobile)

Be aware that not all lichess features can be accessed via the apps, so you may prefer to play using the lichess website, even when using a phone or tablet.

<hr>

## Welcome

Welcome – you’ve arrived at Streatham & Brixton Chess Club’s website.
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
