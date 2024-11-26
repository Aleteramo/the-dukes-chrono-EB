'use client';

export default function Error() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gold mb-4">
          Qualcosa è andato storto
        </h2>
        <p className="text-gold/60">
          Si è verificato un errore nel caricamento del catalogo.
        </p>
      </div>
    </div>
  );
}
