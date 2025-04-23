import Link from "next/link";

export const metadata = {
  title: "Termini di Servizio | JerCommerce",
  description: "Termini e condizioni di utilizzo di JerCommerce",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <main className="max-w-4xl mx-auto px-6 md:px-8">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 font-playfair">
          TERMINI DI SERVIZIO
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-sm text-gray-600 mb-6">
            Ultimo aggiornamento: 23 Aprile 2024
          </p>

          <p className="mb-8">
            Benvenuto su JerCommerce. Utilizzando il nostro sito web, accetti i
            presenti Termini di Servizio. Ti invitiamo a leggerli con attenzione
            prima di utilizzare la piattaforma.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              1. Informazioni Generali
            </h2>
            <p>JerCommerce è un sito di eCommerce gestito da:</p>
            <p className="mt-2">
              <strong>Gerardo Nastri</strong>
              <br />
              Email: gerardonastri.dev@gmail.com
              <br />
              Telefono: 3459945818
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              2. Accettazione dei Termini
            </h2>
            <p>
              Accedendo e utilizzando JerCommerce, accetti di essere vincolato
              dai presenti Termini di Servizio. Se non accetti tali termini, ti
              invitiamo a non utilizzare il sito.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              3. Requisiti per l'utilizzo
            </h2>
            <p>
              Per effettuare acquisti su JerCommerce, devi avere almeno 18 anni
              o essere autorizzato da un genitore/tutore. È inoltre richiesto
              l'inserimento di dati personali veritieri, completi e aggiornati.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">4. Account Utente</h2>
            <p>
              L'accesso ad alcune funzionalità richiede la creazione di un
              account tramite email e password oppure tramite Google. L'utente è
              responsabile della riservatezza delle credenziali e delle attività
              svolte con il proprio account.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">5. Ordini e Acquisti</h2>
            <p>
              Ogni ordine effettuato rappresenta un'offerta di acquisto
              vincolante. Riceverai una conferma via email una volta completato
              il pagamento. JerCommerce si riserva il diritto di rifiutare o
              annullare ordini in qualsiasi momento.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">6. Prezzi e Pagamenti</h2>
            <p>
              Tutti i prezzi sono espressi in euro e possono includere o meno
              l'IVA (specificato nella scheda prodotto). I pagamenti sono
              gestiti in modo sicuro tramite Stripe. JerCommerce non memorizza i
              dati della tua carta di credito.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              7. Spedizioni e Consegne
            </h2>
            <p>
              I tempi di spedizione e le modalità di consegna sono indicati
              nella scheda prodotto o al momento del checkout. Eventuali costi
              di spedizione saranno chiaramente visibili prima del pagamento.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              8. Resi, Rimborsi e Diritto di Recesso
            </h2>
            <p>
              Hai diritto di recedere dall'acquisto entro 14 giorni dalla
              ricezione del prodotto. Il prodotto dovrà essere restituito in
              condizioni originali. Per iniziare una procedura di reso o
              rimborso, contatta gerardonastri.dev@gmail.com.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              9. Proprietà Intellettuale
            </h2>
            <p>
              Tutti i contenuti del sito, inclusi testi, immagini, loghi e
              grafica, sono di proprietà di Gerardo Nastri o dei rispettivi
              titolari. È vietata la riproduzione non autorizzata di tali
              contenuti.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              10. Limitazione di Responsabilità
            </h2>
            <p>
              JerCommerce non è responsabile per eventuali danni diretti o
              indiretti derivanti dall'uso del sito o da ritardi nella consegna
              non imputabili alla nostra responsabilità.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              11. Modifiche ai Termini
            </h2>
            <p>
              Ci riserviamo il diritto di aggiornare i presenti Termini in
              qualsiasi momento. Le modifiche saranno efficaci a partire dalla
              loro pubblicazione sul sito. In caso di cambiamenti sostanziali,
              potresti ricevere una notifica.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              12. Legge Applicabile e Foro Competente
            </h2>
            <p>
              I presenti Termini sono regolati dalla legge italiana. Per
              qualsiasi controversia sarà competente il Foro di Salerno, salvo
              diversa disposizione di legge.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">13. Contatti</h2>
            <p>
              Per qualsiasi informazione, chiarimento o richiesta, puoi
              contattarci:
            </p>
            <p className="mt-2">
              <strong>Gerardo Nastri</strong>
              <br />
              📧 Email: gerardonastri.dev@gmail.com
              <br />
              📞 Telefono: 3459945818
            </p>
          </section>

          <div className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-600">
            <p>
              Consultando anche la nostra{" "}
              <Link
                href="/privacy"
                className="text-black underline hover:no-underline"
              >
                Privacy Policy
              </Link>{" "}
              e{" "}
              <Link
                href="/cookie"
                className="text-black underline hover:no-underline"
              >
                Cookie Policy
              </Link>
              , avrai un quadro completo di come trattiamo i tuoi dati e delle
              condizioni di utilizzo del nostro servizio.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
