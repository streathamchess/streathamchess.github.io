---
title: Noticeboard
layout: default
---
<ul>
{% for post in site.posts %}
  
    <li>
    	<a href="{{ post.url }}">{{ post.title }}</a>
    	<p>
    		{{ post.description }}
    	</p>
    	<p>
    		{{ post.date | date_to_long_string }}
    	</p>
    </li>
  
{% endfor %}
</ul>