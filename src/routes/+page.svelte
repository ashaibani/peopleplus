<script>
	import ConnectFour from '$lib/components/ConnectFour.svelte';
</script>

<!-- Container for demo purpose -->

<!-- Section: Design Block -->
<div class="container my-24 mx-auto">
	<section class="text-center">
		<div class="flex justify-center">
			<div class="max-w-[800px]">
				<h2 class="mb-12 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
					SvelteKit &<br />
					<span class="text-primary dark:text-primary-400">Cloudflare Pages</span>
				</h2>
				<p class="text-lg">
					A simple demo to show how I can use sveltekit and cloudflare pages to build a game of
					connect four.
				</p>
			</div>
		</div>
		<ConnectFour />
	</section>
</div>
