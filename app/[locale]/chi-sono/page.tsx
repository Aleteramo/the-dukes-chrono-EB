// app/chi-sono/page.tsx
import AnimatedHeading from '../components/ui/animated-heading';
import AnimatedSection from '../components/ui/animated-section';

const approachItems = [
  "Selezione accurata di ogni pezzo",
  "Verifica dell'autenticità",
  "Documentazione completa",
  "Assistenza personalizzata"
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 pt-24 pb-8">
        <AnimatedHeading className="text-4xl md:text-6xl font-serif mb-8">
          Chi Sono
        </AnimatedHeading>
        
        <AnimatedSection className="prose prose-invert max-w-none">
          <p className="text-xl mb-6">
            Appassionato di orologeria vintage, mi dedico alla ricerca e selezione di pezzi unici e rari.
          </p>

          <div className="grid md:grid-cols-2 gap-12 my-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif mb-4">La mia storia</h2>
              <p>
                La passione per gli orologi vintage è nata dall&apos;amore per la meccanica di precisione 
                e dall&apos;apprezzamento per l&apos;artigianato di alta qualità.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-serif mb-4">La mia missione</h2>
              <p>
                Il mio obiettivo è portare l&apos;eccellenza dell&apos;orologeria vintage 
                agli appassionati, garantendo autenticità e qualità in ogni pezzo.
              </p>
            </div>
          </div>

          <div className="my-12">
            <h2 className="text-2xl md:text-3xl font-serif mb-4">Il mio approccio</h2>
            <ul className="space-y-4">
              {approachItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="my-12">
            <h2 className="text-2xl md:text-3xl font-serif mb-4">Contattami</h2>
            <p>
              Se sei interessato a saperne di più o vuoi discutere di un pezzo particolare,
              non esitare a contattarmi. La mia esperienza è a tua disposizione per guidarti
              nella scelta dell&apos;orologio perfetto per te.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </main>
  )
}