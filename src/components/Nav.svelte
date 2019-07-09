<script>
	export let segment;
</script>

<style>
	nav {
		font-weight: 300;
		padding: 0 1em;
		max-width: 1280px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
		margin-left: 3em;
	}

	.selected {
		position: relative;
		display: inline-block;
	}

	.selected::after {
		position: absolute;
		content: '';
		width: 100%;
		height: 2px;
		background-color: #EFEFEF;
		display: block;
		bottom: 0;
	}

	a {
		text-decoration: none;
		padding: 0.3em 0em;
		display: block;
		font-weight: 700;
		font-size: 18px;
		margin: 1.5em 0;
	}
</style>

<nav>
	<a href="/">
		<img src="/javascript_hub_logo.svg" alt="JavaScript Hub">
	</a>
	<ul>
		<!-- <li><a class='{segment === undefined ? "selected" : ""}' href='.'>home</a></li>
		<li><a class='{segment === "about" ? "selected" : ""}' href='about'>about</a></li> -->

		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<!-- <li><a rel=prefetch class='{segment === "blog" ? "selected" : ""}' href='blog'>blog</a></li> -->
		<li><a class="selected" href="/coding_interview">coding interview</a></li>
		<li><a href="/about">about</a></li>
		<li><a href="https://dezineleo.com" target="_blank">dezineleo.com</a></li>
	</ul>
</nav>