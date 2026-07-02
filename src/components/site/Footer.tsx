import { Dumbbell, ArrowUpRight } from "lucide-react";

const cols = [
  { title: "Programs", links: ["Strength", "Weight Loss", "HIIT", "Yoga", "Athlete Performance"] },
  { title: "Company", links: ["About", "Trainers", "Membership", "Careers", "Contact"] },
  { title: "Resources", links: ["Blog", "Nutrition", "Recovery", "Community", "FAQ"] },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary">
                <Dumbbell className="h-5 w-5 text-primary-foreground" />
              </span>
              <span className="text-lg font-extrabold">ELEVATE<span className="text-gradient">.</span></span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Train Smarter. Live Stronger. A premium fitness experience built for
              your strongest self.
            </p>
            <form className="mt-6 flex max-w-sm overflow-hidden rounded-full glass p-1" onSubmit={(e) => e.preventDefault()}>
              <input placeholder="Your email" className="flex-1 bg-transparent px-4 text-sm outline-none" />
              <button className="flex items-center gap-1 rounded-full bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground" data-cursor="hover">
                Join <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-bold">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground" data-cursor="hover">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Elevate Fitness Club. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
