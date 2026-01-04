import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Rocket,
  Shield,
  Zap,
  Brain,
  Sparkles,
  Code2,
  GitBranch,
  Terminal,
  Target,
  ChevronRight,
  Play,
  CheckCircle,
  Bot,
  Cpu,
  Activity,
  ArrowRight,
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-cosmic text-white relative overflow-hidden">
      <div className="starfield" />
      
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary glow-violet">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-lg tracking-tight">SpaceChildDev</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-white/70 hover:text-white transition-colors" data-testid="link-features">
                Agent Fleet
              </a>
              <a href="#workflow" className="text-sm text-white/70 hover:text-white transition-colors" data-testid="link-workflow">
                Mission Control
              </a>
              <a href="#metrics" className="text-sm text-white/70 hover:text-white transition-colors" data-testid="link-metrics">
                Quality Radar
              </a>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link href="/auth">
                <Button variant="ghost" size="sm" className="text-white/80" data-testid="button-login">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth">
                <Button size="sm" className="gap-2 glow-violet" data-testid="button-launch">
                  <Rocket className="h-4 w-4" />
                  Launch Mission
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
                <Sparkles className="h-4 w-4 text-[hsl(var(--neon-cyan))]" />
                <span className="text-white/80">Powered by GPT-5 AI</span>
                <Badge variant="secondary" className="text-xs">New</Badge>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.1]">
                <span className="text-gradient">Command</span> the Future of{" "}
                <span className="text-white">Quality Engineering</span>
              </h1>
              
              <p className="text-xl text-white/60 font-light max-w-xl leading-relaxed">
                Deploy an autonomous fleet of 31 QE agents. Master 41 testing skills. 
                Let AI-driven quality assurance transform your development workflow.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/ide">
                  <Button size="lg" className="gap-2 glow-violet text-base" data-testid="button-explore-ide">
                    <Play className="h-5 w-5" />
                    Explore IDE
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button size="lg" variant="outline" className="gap-2 text-base border-white/20 text-white hover:bg-white/10" data-testid="button-start-mission">
                    <Rocket className="h-5 w-5" />
                    Start Mission
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <CheckCircle className="h-4 w-4 text-[hsl(var(--tdd-green))]" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <CheckCircle className="h-4 w-4 text-[hsl(var(--tdd-green))]" />
                  <span>No credit card</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <CheckCircle className="h-4 w-4 text-[hsl(var(--tdd-green))]" />
                  <span>Deploy in 5min</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-card p-1 animate-float">
                <div className="rounded-xl overflow-hidden bg-[hsl(var(--midnight-navy))] border border-white/5">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--tdd-red))]" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--tdd-green))]" />
                    </div>
                    <span className="text-xs text-white/50 font-mono ml-2">mission-control.tsx</span>
                  </div>
                  <div className="p-4 font-mono text-sm space-y-2">
                    <div className="text-white/40">{"// AI-powered quality engineering"}</div>
                    <div>
                      <span className="text-[hsl(var(--magenta-pulse))]">import</span>
                      <span className="text-white"> {"{ "}</span>
                      <span className="text-[hsl(var(--neon-cyan))]">QEAgent</span>
                      <span className="text-white">{" }"}</span>
                      <span className="text-[hsl(var(--magenta-pulse))]"> from</span>
                      <span className="text-[hsl(var(--tdd-green))]"> '@spacechilddev/agents'</span>
                    </div>
                    <div className="text-white/20">{"..."}</div>
                    <div>
                      <span className="text-[hsl(var(--magenta-pulse))]">const</span>
                      <span className="text-[hsl(var(--neon-cyan))]"> agent</span>
                      <span className="text-white"> = </span>
                      <span className="text-[hsl(var(--aurora-violet))]">QEAgent</span>
                      <span className="text-white">.deploy({"{"}</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-white">skill: </span>
                      <span className="text-[hsl(var(--tdd-green))]">'mutation-testing'</span>
                      <span className="text-white">,</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-white">coverage: </span>
                      <span className="text-[hsl(var(--neon-cyan))]">95</span>
                      <span className="text-white">,</span>
                    </div>
                    <div>
                      <span className="text-white">{"})"}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 glass-card px-4 py-3 animate-pulse-glow">
                <div className="flex items-center gap-3">
                  <Bot className="h-5 w-5 text-[hsl(var(--neon-cyan))]" />
                  <div>
                    <div className="text-sm font-medium">31 Agents Active</div>
                    <div className="text-xs text-white/50">All systems nominal</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 glass-card px-4 py-3">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-[hsl(var(--tdd-green))]" />
                  <div>
                    <div className="text-sm font-medium">98.5% Coverage</div>
                    <div className="text-xs text-white/50">Quality score: A+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="border-white/20 text-white/70">Agent Fleet</Badge>
            <h2 className="text-4xl md:text-5xl font-light">
              Your <span className="text-gradient">Autonomous QE Army</span>
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto font-light">
              Deploy specialized agents that learn, adapt, and evolve with your codebase.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Test Guardian",
                description: "Autonomous test generation with 95%+ coverage. Mutation testing that finds bugs before they find you.",
                color: "tdd-green",
                badge: "Core Agent"
              },
              {
                icon: Brain,
                title: "AI Co-Pilot",
                description: "GPT-5 powered code assistance. Context-aware suggestions that understand your entire codebase.",
                color: "aurora-violet",
                badge: "AI Powered"
              },
              {
                icon: Zap,
                title: "Performance Sentinel",
                description: "Real-time performance monitoring. Chaos engineering that ensures resilience under pressure.",
                color: "neon-cyan",
                badge: "Real-time"
              },
              {
                icon: Target,
                title: "Coverage Hunter",
                description: "Finds untested code paths. Generates tests for edge cases humans often miss.",
                color: "magenta-pulse",
                badge: "Smart"
              },
              {
                icon: GitBranch,
                title: "Regression Guard",
                description: "Monitors code changes. Runs targeted tests on affected components automatically.",
                color: "tdd-refactor",
                badge: "Automated"
              },
              {
                icon: Terminal,
                title: "Debug Agent",
                description: "Root cause analysis powered by AI. Suggests fixes with confidence scores.",
                color: "neon-cyan",
                badge: "Diagnostic"
              }
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 group hover:scale-[1.02] transition-transform duration-300">
                <div className={`w-12 h-12 rounded-xl bg-[hsl(var(--${feature.color}))/0.2] flex items-center justify-center mb-6 group-hover:glow-${feature.color.includes('cyan') ? 'cyan' : 'violet'} transition-shadow`}>
                  <feature.icon className={`h-6 w-6 text-[hsl(var(--${feature.color}))]`} />
                </div>
                <Badge variant="secondary" className="mb-4 text-xs">{feature.badge}</Badge>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-white/50 font-light leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="py-20 md:py-32 relative bg-cosmic-gradient">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <Badge variant="outline" className="border-white/20 text-white/70">TDD Workflow</Badge>
              <h2 className="text-4xl md:text-5xl font-light">
                Red. Green. <span className="text-gradient-warm">Refactor.</span>
              </h2>
              <p className="text-xl text-white/50 font-light leading-relaxed">
                Experience test-driven development reimagined. Our AI understands your intent 
                and generates tests before you write a single line of implementation code.
              </p>
              
              <div className="space-y-4">
                {[
                  { step: "1", title: "Write Failing Test", desc: "AI suggests test cases based on your requirements", color: "tdd-red" },
                  { step: "2", title: "Make It Pass", desc: "Minimal implementation guided by AI suggestions", color: "tdd-green" },
                  { step: "3", title: "Refactor with Confidence", desc: "Clean up code knowing all tests still pass", color: "tdd-refactor" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 glass-card p-4">
                    <div className={`w-10 h-10 rounded-full bg-[hsl(var(--${item.color}))/0.2] flex items-center justify-center shrink-0`}>
                      <span className={`text-sm font-bold text-[hsl(var(--${item.color}))]`}>{item.step}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-white/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-card p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Quality Metrics</h3>
                <Badge variant="secondary" className="gap-1">
                  <Cpu className="h-3 w-3" />
                  Live
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Test Coverage", value: "94.2%", change: "+2.1%" },
                  { label: "Mutation Score", value: "87.5%", change: "+5.3%" },
                  { label: "Code Quality", value: "A+", change: "Stable" },
                  { label: "Tech Debt", value: "12h", change: "-3h" },
                ].map((metric, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-2xl font-light text-white">{metric.value}</div>
                    <div className="text-sm text-white/50">{metric.label}</div>
                    <div className="text-xs text-[hsl(var(--tdd-green))] mt-1">{metric.change}</div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">AI Cost Savings</span>
                  <span className="text-[hsl(var(--tdd-green))] font-medium">75% with Smart Routing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-6xl font-light">
              Ready to <span className="text-gradient">Launch</span>?
            </h2>
            <p className="text-xl text-white/50 font-light">
              Join thousands of developers who have transformed their quality engineering workflow.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/auth">
                <Button size="lg" className="gap-2 glow-violet text-base" data-testid="button-get-started">
                  <Rocket className="h-5 w-5" />
                  Start Free Mission
                </Button>
              </Link>
              <Link href="/ide">
                <Button size="lg" variant="outline" className="gap-2 text-base border-white/20 text-white hover:bg-white/10" data-testid="button-view-demo">
                  <Play className="h-5 w-5" />
                  View Live Demo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              <span className="font-semibold">SpaceChildDev</span>
            </div>
            <div className="text-sm text-white/40">
              Part of the Space Child ecosystem. Building the future of development.
            </div>
            <div className="flex items-center gap-4 text-sm text-white/50">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Docs</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
