export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const topic = url.searchParams.get('topic') || 'Games';

		try {
			if (!env.AI) {
				return Response.json({
					topic,
					joke: `How do ${topic} developer stay in shape? They keep running lightweight functions all day!`,
				});
			}

			let simple = { prompt: `Tell me a joke about ${topic}` };
			let response = await env.AI.run('@cf/meta/llama-3-8b-instruct', simple);

			return Response.json({ topic, ...response });
		} catch (error) {
			return Response.json({ error: 'Failed to generate joke', message: error.message }, { status: 500 });
		}
	},
};
