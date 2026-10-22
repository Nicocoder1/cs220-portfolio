import Image from "next/image";

export default function AboutSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
      <div className="sm:col-span-2 prose prose-invert max-w-none">
        <p>
          Hi, I'm Nicolas Soria Gomez. I'm 22 years old and originally from Guatemala, now based in Salt Lake City, Utah. I study computer science and am working toward a software engineering degree. I love learning about AI, backend and frontend development, machine learning, and innovation.
        </p>
        <p>
          Outside of tech, I enjoy outdoor activities like biking, running, going to the gym, and hiking. I also love watching movies, reading, and playing board games. I believe in creating things that make a difference and advancing technology while having fun along the way.
        </p>
      </div>

      <div className="sm:col-span-1 flex justify-center sm:justify-end">
        {/* Profile image from public folder */}
        <div className="w-64 h-64 rounded-full overflow-hidden border border-white/10 bg-black/10 flex items-center justify-center">
          <Image src="/nicolasfoto.jpg" alt="Nicolas Soria Gomez" width={256} height={256} />
        </div>
      </div>
    </div>
  );
}
