import Image from "next/image"; // For project images

// Props for the project card
interface Props {
  title: string; 
  description: string;
  tech: string[];
  image?: string;
  href?: string;
}

// Card for each project
export default function ProjectCard({ title, description, tech, image = "/next.svg", href }: Props) {
  return (
    <article className="bg-[var(--card)]/80 border-2 border-white rounded-xl p-4 hover:scale-[1.01] transition w-full h-full flex flex-col justify-between">
      {/* Project image */}
      <div className="w-full h-40 relative rounded-md overflow-hidden mb-3">
        <Image src={image} alt={title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-contain p-4" />
      </div>

      {/* Project title */}
      <h3 className="font-semibold">{title}</h3>
      {/* Project description */}
      <p className="text-sm text-[var(--muted)] mt-2">{description}</p>

      {/* Technologies used */}
      <div className="mt-3 flex flex-wrap gap-2">
        {tech.map((t) => (
          <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/3">{t}</span>
        ))}
      </div>

      {/* Link to project */}
      {href ? (
        <a href={href} className="mt-3 inline-block text-sm text-[var(--accent)]">Learn more </a>
      ) : null}
    </article>
  );
}
