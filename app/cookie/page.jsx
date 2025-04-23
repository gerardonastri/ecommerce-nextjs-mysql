import Link from "next/link";

export const metadata = {
  title: "Cookie Policy | JerCommerce",
  description: "Informativa sull'utilizzo dei cookie di JerCommerce",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <main className="max-w-4xl mx-auto px-6 md:px-8">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 font-playfair">
          COOKIE POLICY
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Cosa sono i cookie</h2>
            <p>
              I cookie sono piccoli file di testo che i siti visitati dagli
              utenti inviano ai loro terminali, dove vengono memorizzati per
              essere ritrasmessi agli stessi siti in occasione di visite
              successive. I cookie sono utilizzati per diverse finalità, hanno
              caratteristiche diverse, e possono essere utilizzati sia dal
              titolare del sito che si sta visitando, sia da terze parti.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              Tipologie di cookie utilizzati da JerCommerce
            </h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Cookie tecnici</h3>
            <p>
              Questi cookie sono necessari per il corretto funzionamento del
              sito e per permettere la navigazione e l'utilizzo delle sue
              funzionalità. Senza questi cookie, alcune funzioni del sito
              potrebbero essere compromesse.
            </p>
            <p className="mt-2">
              Includono, ad esempio, cookie che consentono di accedere ad aree
              protette del sito, di memorizzare gli articoli nel carrello, di
              ricordare le preferenze di visualizzazione, ecc.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">
              Cookie analitici
            </h3>
            <p>
              Questi cookie raccolgono informazioni su come gli utenti
              utilizzano il sito, ad esempio quali pagine vengono visitate più
              spesso e se ricevono messaggi di errore. Questi cookie non
              raccolgono informazioni che identificano un visitatore. Tutte le
              informazioni raccolte da questi cookie sono aggregate e quindi
              anonime. Vengono utilizzati solo per migliorare il funzionamento
              del sito.
            </p>
            <p className="mt-2">
              Utilizziamo Google Analytics per raccogliere dati statistici
              anonimi sull'utilizzo del sito.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">
              Cookie di profilazione
            </h3>
            <p>
              Questi cookie sono utilizzati per tracciare la navigazione
              dell'utente in rete e creare profili sui suoi gusti, abitudini,
              scelte, ecc. Con questi cookie possono essere trasmessi al
              terminale dell'utente messaggi pubblicitari in linea con le
              preferenze già manifestate dallo stesso utente nella navigazione
              online.
            </p>
            <p className="mt-2">
              JerCommerce utilizza cookie di profilazione solo previo consenso
              esplicito dell'utente.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">
              Cookie di terze parti
            </h3>
            <p>
              Durante la navigazione su JerCommerce, potresti ricevere sul tuo
              terminale anche cookie inviati da siti o da web server diversi
              (c.d. cookie di "terze parti"). Le terze parti potrebbero
              utilizzare i loro cookie per finalità proprie e con modalità
              diverse rispetto a quanto specificato nella presente Cookie
              Policy.
            </p>
            <p className="mt-2">
              Le terze parti che potrebbero impostare cookie durante la
              navigazione sul nostro sito includono:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Google (Analytics, reCAPTCHA, Maps)</li>
              <li>Stripe (pagamenti)</li>
              <li>Social media (se utilizzi i pulsanti di condivisione)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Gestione dei cookie</h2>
            <p>
              Puoi decidere se accettare o meno i cookie utilizzando il banner
              che appare quando accedi al sito per la prima volta.
            </p>
            <p className="mt-2">
              Inoltre, puoi gestire le preferenze relative ai cookie
              direttamente dal tuo browser:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <strong>Google Chrome</strong>: Menu → Impostazioni → Mostra
                impostazioni avanzate → Privacy → Impostazioni contenuti
              </li>
              <li>
                <strong>Mozilla Firefox</strong>: Menu → Opzioni → Privacy →
                Utilizza impostazioni personalizzate
              </li>
              <li>
                <strong>Internet Explorer</strong>: Menu → Strumenti → Opzioni
                Internet → Privacy
              </li>
              <li>
                <strong>Safari</strong>: Menu → Preferenze → Privacy
              </li>
              <li>
                <strong>Opera</strong>: Menu → Preferenze → Avanzate → Cookie
              </li>
              <li>
                <strong>Safari iOS</strong>: Impostazioni → Safari → Blocca
                Cookie
              </li>
              <li>
                <strong>Android</strong>: Browser → Impostazioni → Privacy e
                sicurezza → Accetta cookie
              </li>
            </ul>
            <p className="mt-4">
              Ricorda che disabilitare i cookie tecnici potrebbe compromettere
              il funzionamento del sito.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              Modifiche alla Cookie Policy
            </h2>
            <p>
              La presente Cookie Policy potrebbe essere soggetta a modifiche nel
              tempo. Si consiglia di consultare periodicamente questa pagina per
              essere sempre aggiornati sulle caratteristiche dei cookie
              utilizzati da JerCommerce.
            </p>
          </section>

          <div className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-600">
            <p>Ultimo aggiornamento: 23 Aprile 2024</p>
            <p className="mt-4">
              Per ulteriori informazioni sul trattamento dei dati personali,
              consulta la nostra{" "}
              <Link
                href="/privacy"
                className="text-black underline hover:no-underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
