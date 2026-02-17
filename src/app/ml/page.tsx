import Link from "next/link";
import { subjects } from "@/lib/subjects";

export default function MLPage() {
  const subject = subjects.find((s) => s.slug === "ml")!;

  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          {subject.icon} {subject.name}
        </h1>
        <p className="text-lg text-muted max-w-2xl">{subject.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subject.topics.map((topic) => (
          <Link
            key={topic.slug}
            href={`${subject.basePath}/${topic.slug}`}
            className="group rounded-xl border border-card-border bg-card-bg p-5 transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted uppercase tracking-wider">
                {topic.category}
              </span>
              {topic.complexity && (
                <span className="rounded-full bg-accent-light px-2.5 py-0.5 text-xs font-medium text-accent">
                  {topic.complexity}
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
              {topic.name}
            </h3>
            <p className="text-sm text-muted mt-2">{topic.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
