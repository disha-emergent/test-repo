import { motion } from "framer-motion";

const CHAPTERS = [
  {
    n: "02",
    title: "The Primal Act of Counting",
    body: "Before language, there was tally. A notch in bone, a stone in a pocket. Counting is the oldest interface ever designed — one input, one output, absolute clarity. This button honours that lineage.",
  },
  {
    n: "03",
    title: "Kinetic Accumulation",
    body: "Each press is a small explosion of physics: the spring compresses, particles scatter, the number springs upward. Motion is not decoration here — it is the proof that something happened.",
    image:
      "https://images.unsplash.com/photo-1694540784497-ed3697d41952?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  },
  {
    n: "04",
    title: "The Ephemeral State",
    body: "There is no database. No account. No memory. Refresh the page and the count returns to zero — a digital sand mandala. What you accumulate here exists only in the present tense.",
  },
  {
    n: "05",
    title: "Architectural Harmony",
    body: "Bone-white space, charcoal ink, one violent orange. Restraint is the loudest aesthetic decision. Every element earns its place or is removed.",
    image:
      "https://images.unsplash.com/photo-1648218466069-bb93310f97b7?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  },
];

export default function ManifestoSection() {
  return (
    <section className="py-24 md:py-36" data-testid="manifesto-chapters-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono-s text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[var(--accent)] mb-4"
        >
          Manifesto
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold tracking-tight text-[var(--ink)] text-3xl sm:text-4xl md:text-5xl mb-20 max-w-2xl"
        >
          Four chapters on the philosophy of a single button.
        </motion.h2>

        <div className="flex flex-col gap-20 md:gap-28">
          {CHAPTERS.map((c, i) => (
            <motion.article
              key={c.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
              className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-start ${i % 2 === 1 ? "md:text-right" : ""}`}
            >
              <div className={`md:col-span-2 ${i % 2 === 1 ? "md:order-3" : ""}`}>
                <span className="font-mono-s text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
                  CH. {c.n}
                </span>
              </div>
              <div className="md:col-span-5">
                <h3 className="font-display font-bold tracking-tight text-[var(--ink)] text-2xl sm:text-3xl mb-4 hover:text-[var(--accent)] transition-colors duration-300">
                  {c.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[var(--ink2)]">{c.body}</p>
              </div>
              <div className="md:col-span-5">
                {c.image ? (
                  <div className="relative overflow-hidden group" style={{ clipPath: "polygon(0 0, 100% 4%, 96% 100%, 0% 96%)" }}>
                    <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)] pointer-events-none" />
                    <img
                      src={c.image}
                      alt={c.title}
                      loading="lazy"
                      className="w-full h-64 md:h-80 object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-[filter,transform] duration-700"
                    />
                  </div>
                ) : (
                  <div className="h-full min-h-32 border border-[var(--line)] flex items-end p-5">
                    <span className="font-mono-s text-[10px] uppercase tracking-[0.3em] text-[var(--muted2)]">
                      Fig. {c.n} — intentionally blank
                    </span>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
