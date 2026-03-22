<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Button from '$lib/components/ui/Button.svelte';
	import AiParticles from '$lib/components/ui/AiParticles.svelte';
	import { scrollReveal } from '$lib/animations/actions/scrollReveal';
	import { tiltCard } from '$lib/animations/actions/tiltCard';
	import { textScramble } from '$lib/animations/actions/textScramble';
	import { counterUp } from '$lib/animations/actions/counterUp';

	// FAQ accordion state
	let openFaq = $state(-1);
	function toggleFaq(i: number) {
		openFaq = openFaq === i ? -1 : i;
	}

	const services = [
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a5 5 0 1 0 5 5"/><circle cx="12" cy="7" r="5"/><path d="M2 22c0-5.523 4.477-10 10-10s10 4.477 10 10"/><circle cx="18" cy="8" r="3"/></svg>`,
			title: 'Machine Learning & Predictive Analytics',
			desc: 'Custom ML models for demand forecasting, churn prediction, anomaly detection, and recommendation engines — built on your data, deployed in your infrastructure.',
			color: '#8b5cf6'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
			title: 'Data Engineering & Pipelines',
			desc: 'End-to-end data infrastructure — ingestion, transformation, orchestration, and quality monitoring using modern lakehouse architecture.',
			color: '#3b82f6'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`,
			title: 'BI & Executive Dashboards',
			desc: 'Interactive dashboards and automated reporting in Power BI, Tableau, and Looker — giving leaders real-time visibility into KPIs that matter.',
			color: '#00e5ff'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
			title: 'Real-time Data Streaming',
			desc: 'Event-driven architectures with Apache Kafka, Confluent, and Flink for real-time processing of IoT telemetry, transactions, and operational data.',
			color: '#8b5cf6'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.96-4.03A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.96-4.03A2.5 2.5 0 0 0 14.5 2Z"/></svg>`,
			title: 'Generative AI & LLM Integration',
			desc: 'Enterprise GPT deployments, RAG pipelines, intelligent document processing, and AI-powered chatbots built on OpenAI, Claude, and open-source models.',
			color: '#3b82f6'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
			title: 'Computer Vision & NLP',
			desc: 'Image recognition, object detection, OCR, sentiment analysis, and text extraction — applied to quality control, document processing, and customer insights.',
			color: '#00e5ff'
		}
	];

	const processSteps = [
		{ num: '01', title: 'Data Assessment', desc: 'Audit your data landscape — sources, quality, governance, and readiness for ML/AI workloads.' },
		{ num: '02', title: 'Architecture Design', desc: 'Design the optimal data stack and ML pipeline architecture for your scale and compliance requirements.' },
		{ num: '03', title: 'Model Development', desc: 'Build, train, and validate ML models using your data with rigorous testing and bias evaluation.' },
		{ num: '04', title: 'Production Deploy', desc: 'Deploy models to production with monitoring, A/B testing, automated retraining, and rollback capabilities.' },
		{ num: '05', title: 'Monitor & Optimize', desc: 'Continuous model performance monitoring, data drift detection, and iterative improvement cycles.' }
	];

	const faqs = [
		{ q: 'Do we need a data team already in place?', a: 'No. We can operate as your outsourced data team or work alongside your existing engineers. Many clients start with us building the foundation and gradually hire internally as the practice matures.' },
		{ q: 'What cloud platforms do you support?', a: 'We work across AWS (SageMaker, Redshift, Glue), Azure (Synapse, ML Studio, Fabric), and GCP (BigQuery, Vertex AI). We also support on-premise and hybrid deployments for regulated industries.' },
		{ q: 'How do you handle data security and compliance?', a: 'All our engagements follow SOC 2 practices. We implement encryption at rest and in transit, role-based access controls, audit logging, and can work within GDPR, HIPAA, and local data residency requirements.' },
		{ q: 'What is the typical timeline for an ML project?', a: 'A proof-of-concept typically takes 4-6 weeks. Production deployment adds another 4-8 weeks depending on integration complexity. We always start with a PoC to validate business value before committing to full deployment.' },
		{ q: 'Can you work with our existing BI tools?', a: 'Yes. We integrate with Power BI, Tableau, Looker, and Metabase. If you already have dashboards, we can enhance them with ML-powered predictions and anomaly alerts without disrupting existing workflows.' },
		{ q: 'How do you price AI/ML projects?', a: 'We offer three models: fixed-price PoC engagements (starting at $15K), monthly retainers for ongoing data engineering and model maintenance, and dedicated team augmentation. We will recommend the best model after the initial assessment.' }
	];

	let activeStep = $state(0);
	onMount(() => {
		const t = setInterval(() => {
			activeStep = (activeStep + 1) % processSteps.length;
		}, 3000);
		return () => clearInterval(t);
	});
</script>

<svelte:head>
	<title>AI & Data Science Services | Asiateknologi</title>
	<meta name="description" content="Enterprise AI, machine learning, and data engineering services. From predictive analytics to generative AI — helping businesses across Southeast Asia turn data into competitive advantage." />
</svelte:head>

<!-- ===== HERO ===== -->
<section class="relative min-h-[90vh] overflow-hidden bg-dark-950 pt-32 pb-20">
	<!-- Aurora gradient background -->
	<div class="pointer-events-none absolute inset-0">
		<div class="aurora-blob-1 absolute -left-40 top-10 h-[600px] w-[600px] rounded-full opacity-25 blur-[150px]"
			style="background: radial-gradient(circle, rgba(139,92,246,0.7), transparent 70%);"></div>
		<div class="aurora-blob-2 absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full opacity-20 blur-[130px]"
			style="background: radial-gradient(circle, rgba(0,229,255,0.5), transparent 70%);"></div>
		<div class="aurora-blob-3 absolute bottom-0 left-1/3 h-[450px] w-[450px] rounded-full opacity-15 blur-[120px]"
			style="background: radial-gradient(circle, rgba(59,130,246,0.6), transparent 70%);"></div>
	</div>

	<!-- Particle network -->
	{#if browser}
		<AiParticles />
	{/if}

	<!-- Grid pattern overlay -->
	<div class="pointer-events-none absolute inset-0 opacity-[0.03]"
		style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 60px 60px;"></div>

	<div class="relative mx-auto max-w-7xl px-6 lg:px-8">
		<!-- Breadcrumb -->
		<nav class="mb-12 flex items-center gap-2 font-mono text-xs text-dark-500" use:scrollReveal>
			<a href="/" class="transition-colors hover:text-dark-300">Home</a>
			<span>/</span>
			<a href="/services" class="transition-colors hover:text-dark-300">Services</a>
			<span>/</span>
			<span class="text-accent-purple">AI & Data Science</span>
		</nav>

		<div class="grid items-center gap-16 lg:grid-cols-2">
			<div use:scrollReveal>
				<div class="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-purple/20 bg-accent-purple/5 px-4 py-1.5">
					<div class="h-2 w-2 animate-pulse rounded-full bg-accent-purple"></div>
					<span class="font-mono text-xs font-semibold uppercase tracking-wider text-accent-purple">AI-Powered Solutions</span>
				</div>
				<h1 class="text-5xl font-bold leading-[1.1] text-white md:text-6xl lg:text-7xl" use:textScramble>
					Turn Raw Data Into
					<span class="bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan bg-clip-text text-transparent">
						Predictive Intelligence
					</span>
				</h1>
				<p class="mt-6 max-w-xl text-lg leading-relaxed text-dark-400">
					We build end-to-end data and AI pipelines — from raw ingestion to production ML models and real-time dashboards — helping enterprises in Southeast Asia make faster, smarter decisions.
				</p>
				<div class="mt-10 flex flex-wrap gap-4">
					<Button href="/contact?service=ai-data-science" variant="primary" size="lg">Book a Data Audit</Button>
					<Button href="#services" variant="secondary" size="lg">Explore Capabilities</Button>
				</div>

				<!-- Quick stats -->
				<div class="mt-12 flex flex-wrap gap-8 border-t border-dark-800 pt-8">
					{#each [
						{ value: 40, suffix: '+', label: 'ML Models in Production' },
						{ value: 10, suffix: 'TB+', label: 'Data Processed Daily' },
						{ value: 99.5, suffix: '%', label: 'Pipeline Uptime' }
					] as stat}
						<div>
							<p class="text-3xl font-bold text-white">
								<span use:counterUp={{ target: stat.value, duration: 2000 }}>{stat.value}</span>{stat.suffix}
							</p>
							<p class="font-mono text-xs text-dark-500">{stat.label}</p>
						</div>
					{/each}
				</div>
			</div>

			<!-- Hero visual — animated data pipeline -->
			<div class="relative hidden lg:block" use:scrollReveal={{ delay: 0.3 }}>
				<div class="relative h-[500px]">
					<!-- Central glow -->
					<div class="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-purple/10 blur-[80px]"></div>

					<!-- Data pipeline visualization cards -->
					<div class="absolute left-0 top-4 rounded-2xl border border-dark-700/50 bg-dark-900/80 p-5 backdrop-blur-md" style="animation: float-ai 7s ease-in-out infinite;">
						<p class="font-mono text-[10px] uppercase tracking-wider text-dark-500">Raw Data Sources</p>
						<div class="mt-3 flex gap-2">
							{#each ['IoT', 'CRM', 'ERP', 'API'] as src}
								<span class="rounded bg-accent-purple/10 px-2 py-1 text-[10px] font-semibold text-accent-purple">{src}</span>
							{/each}
						</div>
						<div class="mt-3 flex items-center gap-1 text-xs text-green-400">
							<div class="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400"></div>
							Streaming
						</div>
					</div>

					<div class="absolute right-4 top-12 rounded-2xl border border-dark-700/50 bg-dark-900/80 p-5 backdrop-blur-md" style="animation: float-ai 6s ease-in-out infinite 1s;">
						<p class="font-mono text-[10px] uppercase tracking-wider text-dark-500">Model Accuracy</p>
						<p class="mt-1 text-2xl font-bold text-accent-cyan">94.7%</p>
						<p class="mt-1 text-xs text-green-400">+2.3% after retraining</p>
					</div>

					<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-accent-purple/20 bg-dark-900/90 p-6 backdrop-blur-md" style="animation: float-ai 5s ease-in-out infinite 0.5s;">
						<p class="font-mono text-[10px] uppercase tracking-wider text-accent-purple">Neural Network</p>
						<div class="mt-3 grid grid-cols-4 gap-1.5">
							{#each Array(16) as _, i}
								<div class="h-3 w-3 rounded-full transition-colors duration-300"
									style="background: {['#8b5cf6', '#3b82f6', '#00e5ff', '#10b981'][i % 4]}; opacity: {0.3 + Math.random() * 0.7};"></div>
							{/each}
						</div>
					</div>

					<div class="absolute bottom-20 left-4 rounded-2xl border border-dark-700/50 bg-dark-900/80 p-5 backdrop-blur-md" style="animation: float-ai 8s ease-in-out infinite 2s;">
						<p class="font-mono text-[10px] uppercase tracking-wider text-dark-500">Predictions Today</p>
						<p class="mt-1 text-2xl font-bold text-accent-blue">12,847</p>
						<div class="mt-2 flex gap-0.5">
							{#each Array(10) as _, i}
								<div class="w-2 rounded-sm bg-gradient-to-t from-accent-blue to-accent-cyan" style="height: {6 + Math.random() * 24}px; opacity: {0.4 + i/15};"></div>
							{/each}
						</div>
					</div>

					<div class="absolute bottom-4 right-8 rounded-2xl border border-dark-700/50 bg-dark-900/80 p-5 backdrop-blur-md" style="animation: float-ai 6s ease-in-out infinite 1.5s;">
						<p class="font-mono text-[10px] uppercase tracking-wider text-dark-500">Data Quality</p>
						<div class="mt-2 flex items-center gap-2">
							<div class="h-2 w-24 overflow-hidden rounded-full bg-dark-700">
								<div class="h-full w-[96%] rounded-full bg-gradient-to-r from-accent-purple to-accent-cyan"></div>
							</div>
							<span class="text-xs font-bold text-accent-cyan">96%</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ===== PAIN POINTS ===== -->
<section class="relative bg-dark-900 py-24">
	<div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent"></div>

	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mb-16 text-center" use:scrollReveal>
			<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-dark-500">Common Challenges</span>
			<h2 class="mt-4 text-3xl font-bold text-white md:text-4xl">Sound Familiar?</h2>
		</div>

		<div class="grid gap-6 md:grid-cols-3">
			{#each [
				{ icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>`, title: 'Data Silos Everywhere', desc: 'Critical business data is trapped in disconnected systems — ERP, CRM, spreadsheets — making it impossible to get a unified view of your operations.' },
				{ icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`, title: 'Decisions Without Data', desc: 'Your team relies on gut feeling and outdated reports. By the time insights reach leadership, the opportunity window has already closed.' },
				{ icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14"/></svg>`, title: 'AI Hype, No Roadmap', desc: 'The board wants AI. Your team bought tools. But nobody has a clear strategy for which use cases will actually drive ROI in your specific business context.' }
			] as pain, i}
				<div
					class="group rounded-2xl border border-dark-700/40 bg-dark-800/30 p-7 transition-all duration-300 hover:border-accent-purple/20 hover:bg-dark-800/60"
					use:scrollReveal={{ delay: i * 0.1 }}
				>
					<div class="mb-4 inline-flex rounded-xl bg-accent-purple/10 p-3 text-accent-purple">
						{@html pain.icon}
					</div>
					<h3 class="mb-2 text-lg font-semibold text-white">{pain.title}</h3>
					<p class="text-sm leading-relaxed text-dark-400">{pain.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ===== SERVICES ===== -->
<section id="services" class="relative bg-dark-950 py-28">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mb-16" use:scrollReveal>
			<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-purple">Our Capabilities</span>
			<h2 class="mt-4 text-3xl font-bold text-white md:text-4xl">End-to-End AI & Data Services</h2>
			<p class="mt-4 max-w-2xl text-dark-400">From raw data ingestion to production ML models — everything you need to become a data-driven organization.</p>
		</div>

		<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each services as svc, i}
				<div
					class="group relative overflow-hidden rounded-2xl border border-dark-700/40 bg-dark-900/60 p-7 transition-all duration-500 hover:border-white/10"
					use:tiltCard={{ maxTilt: 8 }}
					use:scrollReveal={{ delay: i * 0.08 }}
				>
					<div class="absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
						style="background: linear-gradient(90deg, transparent, {svc.color}, transparent);"></div>
					<div class="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-20"
						style="background: {svc.color};"></div>

					<div class="relative">
						<div class="mb-4 inline-flex rounded-xl p-3 transition-colors duration-300"
							style="background: {svc.color}12; color: {svc.color};">
							{@html svc.icon}
						</div>
						<h3 class="mb-2 text-lg font-semibold text-dark-100 transition-colors group-hover:text-white">{svc.title}</h3>
						<p class="text-sm leading-relaxed text-dark-400">{svc.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ===== INDUSTRY USE CASES ===== -->
<section class="relative bg-dark-900 py-28">
	<div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent"></div>

	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mb-16" use:scrollReveal>
			<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">Industry Applications</span>
			<h2 class="mt-4 text-3xl font-bold text-white md:text-4xl">AI That Solves Real Problems</h2>
		</div>

		<div class="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
			{#each [
				{ industry: 'Mining', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20l4-4m0 0l4 4m-4-4v-8l6-6 6 6v8m0 0l4 4m-4-4l-4 4m4-4"/></svg>`, useCase: 'Predictive equipment failure detection from IoT sensors — reducing unplanned downtime by 40%.', color: '#8b5cf6' },
				{ industry: 'Finance', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>`, useCase: 'Real-time fraud detection and regulatory reporting dashboards for banking compliance.', color: '#3b82f6' },
				{ industry: 'Healthcare', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`, useCase: 'Patient outcome prediction and clinical data lakes with HL7 FHIR-compliant pipelines.', color: '#00e5ff' },
				{ industry: 'Manufacturing', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20a2 2 0 002 2h16a2 2 0 002-2V8l-7 5V8l-7 5V4a2 2 0 00-2-2H4a2 2 0 00-2 2z"/></svg>`, useCase: 'Computer vision quality inspection and supply chain demand forecasting with 95% accuracy.', color: '#10b981' }
			] as uc, i}
				<div
					class="group relative overflow-hidden rounded-2xl border border-dark-700/40 bg-dark-800/40 p-6 transition-all duration-300 hover:border-white/10"
					use:scrollReveal={{ delay: i * 0.1 }}
				>
					<div class="absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
						style="background: linear-gradient(90deg, transparent, {uc.color}, transparent);"></div>
					<div class="mb-3 inline-flex items-center gap-2 rounded-full border border-dark-600/60 bg-dark-800/60 px-3 py-1.5"
						style="color: {uc.color};">
						{@html uc.icon}
						<span class="font-mono text-xs font-semibold">{uc.industry}</span>
					</div>
					<p class="text-sm leading-relaxed text-dark-400 group-hover:text-dark-300 transition-colors">{uc.useCase}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ===== PROCESS ===== -->
<section class="relative bg-dark-950 py-28">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mb-16 text-center" use:scrollReveal>
			<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-dark-500">Our Process</span>
			<h2 class="mt-4 text-3xl font-bold text-white md:text-4xl">From Data to Decisions in 5 Steps</h2>
		</div>

		<div class="grid gap-4 md:grid-cols-5">
			{#each processSteps as step, i}
				<button
					class="group relative cursor-pointer rounded-2xl border p-6 text-left transition-all duration-500 {activeStep === i ? 'border-accent-purple/40 bg-accent-purple/5' : 'border-dark-700/40 bg-dark-900/40 hover:border-dark-600'}"
					onclick={() => { activeStep = i; }}
					use:scrollReveal={{ delay: i * 0.08 }}
				>
					<div class="absolute inset-x-0 top-0 h-0.5 transition-all duration-500 {activeStep === i ? 'opacity-100' : 'opacity-0'}"
						style="background: linear-gradient(90deg, transparent, #8b5cf6, transparent);"></div>
					<span class="font-mono text-2xl font-bold {activeStep === i ? 'text-accent-purple' : 'text-dark-700'} transition-colors duration-300">{step.num}</span>
					<h3 class="mt-2 text-sm font-semibold {activeStep === i ? 'text-white' : 'text-dark-300'} transition-colors">{step.title}</h3>
					<p class="mt-2 text-xs leading-relaxed {activeStep === i ? 'text-dark-300' : 'text-dark-500'} transition-colors">{step.desc}</p>
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- ===== RESULTS ===== -->
<section class="relative bg-dark-900 py-28">
	<div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent"></div>

	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mb-16 text-center" use:scrollReveal>
			<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-dark-500">Impact</span>
			<h2 class="mt-4 text-3xl font-bold text-white md:text-4xl">Measurable Business Outcomes</h2>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each [
				{ value: 40, suffix: '%', label: 'Reduced Downtime', desc: 'Average reduction in unplanned downtime through predictive maintenance' },
				{ value: 10, suffix: 'x', label: 'Faster Reporting', desc: 'From weeks of manual reporting to real-time automated dashboards' },
				{ value: 95, suffix: '%', label: 'Model Accuracy', desc: 'Average production model accuracy across classification tasks' },
				{ value: 3, suffix: 'M+', label: 'Rows Processed/sec', desc: 'Streaming pipeline throughput for real-time analytics workloads' }
			] as stat, i}
				<div
					class="group rounded-2xl border border-dark-700/40 bg-dark-800/30 p-7 text-center transition-all duration-300 hover:border-accent-purple/20"
					use:scrollReveal={{ delay: i * 0.1 }}
				>
					<p class="bg-gradient-to-r from-accent-purple to-accent-cyan bg-clip-text text-5xl font-bold text-transparent">
						<span use:counterUp={{ target: stat.value, duration: 2500 }}>{stat.value}</span>{stat.suffix}
					</p>
					<p class="mt-2 text-sm font-semibold text-white">{stat.label}</p>
					<p class="mt-1 text-xs text-dark-500">{stat.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ===== TECH STACK ===== -->
<section class="relative bg-dark-950 py-20">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<p class="mb-8 text-center font-mono text-xs font-semibold uppercase tracking-[0.2em] text-dark-500" use:scrollReveal>
			Technologies & Platforms
		</p>
		<div class="flex flex-wrap items-center justify-center gap-3" use:scrollReveal={{ delay: 0.1 }}>
			{#each ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Databricks', 'Snowflake', 'Apache Kafka', 'Apache Spark', 'dbt', 'Airflow', 'Power BI', 'Tableau', 'AWS SageMaker', 'Azure ML', 'OpenAI', 'LangChain'] as tool}
				<span class="rounded-full border border-dark-700/60 bg-dark-900/60 px-4 py-2 font-mono text-xs text-dark-400 transition-colors hover:border-accent-purple/30 hover:text-dark-200">
					{tool}
				</span>
			{/each}
		</div>
	</div>
</section>

<!-- ===== FAQ ===== -->
<section class="relative bg-dark-900 py-28">
	<div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-dark-700 to-transparent"></div>

	<div class="mx-auto max-w-3xl px-6 lg:px-8">
		<div class="mb-16 text-center" use:scrollReveal>
			<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-dark-500">FAQ</span>
			<h2 class="mt-4 text-3xl font-bold text-white md:text-4xl">Common Questions</h2>
		</div>

		<div class="space-y-3" use:scrollReveal={{ delay: 0.1 }}>
			{#each faqs as faq, i}
				<div class="overflow-hidden rounded-xl border transition-colors duration-300 {openFaq === i ? 'border-accent-purple/30 bg-dark-800/60' : 'border-dark-700/40 bg-dark-800/20'}">
					<button
						class="flex w-full items-center justify-between px-6 py-5 text-left"
						onclick={() => toggleFaq(i)}
					>
						<span class="pr-4 text-sm font-semibold {openFaq === i ? 'text-white' : 'text-dark-200'}">{faq.q}</span>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0 text-dark-500 transition-transform duration-300 {openFaq === i ? 'rotate-180' : ''}">
							<polyline points="6 9 12 15 18 9"/>
						</svg>
					</button>
					{#if openFaq === i}
						<div class="px-6 pb-5">
							<p class="text-sm leading-relaxed text-dark-400">{faq.a}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ===== FINAL CTA ===== -->
<section class="relative overflow-hidden bg-dark-950 py-28">
	<div class="pointer-events-none absolute inset-0">
		<div class="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-[150px]"
			style="background: radial-gradient(circle, rgba(139,92,246,0.5), transparent 70%);"></div>
	</div>

	<div class="relative mx-auto max-w-3xl px-6 text-center lg:px-8" use:scrollReveal>
		<h2 class="text-4xl font-bold text-white md:text-5xl">
			Ready to Become
			<span class="bg-gradient-to-r from-accent-purple to-accent-cyan bg-clip-text text-transparent">Data-Driven?</span>
		</h2>
		<p class="mt-6 text-lg text-dark-400">
			Start with a free data readiness assessment. We will evaluate your current data landscape, identify high-impact use cases, and outline a practical AI roadmap — no commitment required.
		</p>
		<div class="mt-10 flex flex-wrap justify-center gap-4">
			<Button href="/contact?service=ai-data-science" variant="primary" size="lg">Book a Free Assessment</Button>
			<Button href="/case-studies" variant="secondary" size="lg">View Case Studies</Button>
		</div>
	</div>
</section>

<style>
	@keyframes float-ai {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-14px); }
	}
</style>
