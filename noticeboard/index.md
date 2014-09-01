---
title: Noticeboard
layout: default
---
<ul>
{% for post in site.posts %}
  
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