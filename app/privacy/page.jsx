import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | JerCommerce",
  description:
    "Informativa sulla privacy e sul trattamento dei dati personali di JerCommerce",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <main className="max-w-4xl mx-auto px-6 md:px-8">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 font-playfair">
          PRIVACY POLICY
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">1. Introduzione</h2>
            <p>
              <strong>Nome del sito:</strong> JerCommerce
            </p>
            <p>
              La presente Privacy Policy ha lo scopo di descrivere le modalità
              di gestione del sito in riferimento al trattamento dei dati
              personali degli utenti che lo consultano e che interagiscono con i
              servizi web accessibili per via telematica. L'informativa è resa
              solo per il sito JerCommerce e non anche per altri siti web
              eventualmente consultati dall'utente tramite link.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              2. Titolare del trattamento
            </h2>
            <p>
              <strong>Nome:</strong> Gerardo Nastri
            </p>
            <p>
              <strong>Email:</strong> gerardonastri.dev@gmail.com
            </p>
            <p>
              <strong>Telefono:</strong> 3459945818
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              3. Dati personali trattati
            </h2>
            <p>
              Durante la navigazione e l'utilizzo dei servizi offerti da
              JerCommerce, potremmo raccogliere i seguenti dati personali:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nome, cognome, email, numero di telefono</li>
              <li>Dati di accesso (Google/email-password)</li>
              <li>Indirizzo di spedizione/fatturazione</li>
              <li>Prodotti aggiunti al carrello</li>
              <li>Storico ordini e pagamenti</li>
              <li>Dati di pagamento (tramite Stripe, tokenizzati)</li>
              <li>Dati tecnici (IP, browser, cookie, analytics)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              4. Finalità del trattamento
            </h2>
            <p>
              I dati personali sono raccolti e utilizzati per le seguenti
              finalità:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Registrazione e login utente</li>
              <li>Gestione ordini e pagamenti</li>
              <li>Invio email di conferma e aggiornamento ordine</li>
              <li>Analisi statistica anonima per miglioramento del servizio</li>
              <li>
                Invio promozioni o newsletter (solo previo consenso esplicito)
              </li>
              <li>Adempimenti fiscali e legali</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              5. Base giuridica del trattamento
            </h2>
            <p>
              Il trattamento dei dati personali si fonda sulle seguenti basi
              giuridiche:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Consenso dell'interessato</li>
              <li>Esecuzione del contratto di acquisto</li>
              <li>Obblighi legali (es. contabili e fiscali)</li>
              <li>Legittimo interesse per miglioramento del servizio</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              6. Condivisione dei dati
            </h2>
            <p>I dati personali potrebbero essere condivisi con:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Stripe per i pagamenti</li>
              <li>Google per login OAuth (se usi Google Sign-In)</li>
              <li>Fornitori tecnici (es. hosting, email service provider)</li>
              <li>Autorità fiscali in caso di obbligo di legge</li>
            </ul>
            <p className="mt-4">
              Tutti i fornitori di servizi sono selezionati tra quelli che
              forniscono garanzie adeguate, come previsto dall'art. 28 del
              Regolamento UE 2016/679.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              7. Modalità del trattamento
            </h2>
            <p>
              I dati personali sono trattati con strumenti elettronici e anche
              mediante cookies per il tempo strettamente necessario a conseguire
              gli scopi per cui sono stati raccolti.
            </p>
            <p className="mt-2">
              Specifiche misure di sicurezza sono osservate per prevenire la
              perdita dei dati, usi illeciti o non corretti ed accessi non
              autorizzati.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              8. Conservazione dei dati
            </h2>
            <p>I dati personali sono conservati per i seguenti periodi:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Dati account: fino a cancellazione dell'account</li>
              <li>Dati ordini: 10 anni (obbligo fiscale)</li>
              <li>Dati marketing: fino a revoca del consenso</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">9. Diritti dell'utente</h2>
            <p>In qualità di interessato, hai il diritto di:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Accedere ai tuoi dati personali</li>
              <li>Ottenere la rettifica o la cancellazione degli stessi</li>
              <li>Richiedere la limitazione del trattamento</li>
              <li>Opporti al trattamento</li>
              <li>Richiedere la portabilità dei dati</li>
              <li>
                Revocare il consenso in qualsiasi momento, senza pregiudicare la
                liceità del trattamento basata sul consenso prestato prima della
                revoca
              </li>
              <li>
                Proporre reclamo al Garante per la Protezione dei Dati Personali
              </li>
            </ul>
            <p className="mt-4">
              Per esercitare i tuoi diritti, puoi contattare il Titolare del
              trattamento all'indirizzo email: gerardonastri.dev@gmail.com
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">10. Cookie</h2>
            <p>Il nostro sito utilizza:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cookie tecnici necessari per il funzionamento del sito</li>
              <li>
                Cookie di terze parti per analisi e marketing (previo consenso)
              </li>
            </ul>
            <p className="mt-4">
              Per maggiori informazioni sui cookie utilizzati, consulta la
              nostra{" "}
              <Link
                href="/cookie"
                className="text-black underline hover:no-underline"
              >
                Cookie Policy
              </Link>
              .
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              11. Modifiche alla presente informativa
            </h2>
            <p>
              Il Titolare del trattamento si riserva il diritto di apportare
              modifiche alla presente privacy policy in qualunque momento,
              dandone pubblicità agli Utenti su questa pagina. Si prega dunque
              di consultare spesso questa pagina, prendendo come riferimento la
              data di ultima modifica indicata in fondo.
            </p>
            <p className="mt-2">
              Nel caso di mancata accettazione delle modifiche apportate alla
              presente privacy policy, l'Utente è tenuto a cessare l'utilizzo di
              questo sito e può richiedere al Titolare del trattamento di
              rimuovere i propri dati personali.
            </p>
            <p className="mt-2">
              Salvo quanto diversamente specificato, la precedente privacy
              policy continuerà ad applicarsi ai dati personali sino a quel
              momento raccolti.
            </p>
          </section>

          <div className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-600">
            <p>Ultimo aggiornamento: 23 Aprile 2024</p>
          </div>
        </div>
      </main>
    </div>
  );
}
