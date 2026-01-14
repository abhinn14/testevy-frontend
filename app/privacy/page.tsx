export default function Privacy() {
 return (
   <main className="bg-black text-white">
     <section className="mx-auto max-w-5xl px-6 pt-32 pb-24 space-y-10">
       <h1 className="text-4xl font-semibold">Privacy Policy</h1>
       <p className="text-white/65">
         This Privacy Policy explains how Testevy collects, uses, and protects
         your information.
       </p>
       <div className="space-y-8 text-white/70 leading-relaxed">
         <section>
           <h2 className="text-xl font-semibold text-white mb-2">
             1. Information We Collect
           </h2>
           <p>
             We collect account information, candidate session data, and system
             interaction data necessary to provide proctoring and integrity
             services.
           </p>
         </section>
         <section>
           <h2 className="text-xl font-semibold text-white mb-2">
             2. How We Use Data
           </h2>
           <p>
             Data is used exclusively to operate Testevy, detect cheating,
             generate risk reports, and provide evidence to hiring teams.
           </p>
         </section>
         <section>
           <h2 className="text-xl font-semibold text-white mb-2">
             3. Data Security
           </h2>
           <p>
             We use encryption, access controls, and monitoring systems to
             protect all stored and transmitted data.
           </p>
         </section>
         <section>
           <h2 className="text-xl font-semibold text-white mb-2">
             4. Data Sharing
           </h2>
           <p>
             Candidate data is shared only with the hiring organization that
             conducted the assessment. We do not sell personal data.
           </p>
         </section>
         <section>
           <h2 className="text-xl font-semibold text-white mb-2">
             5. Your Rights
           </h2>
           <p>
             You may request access, correction, or deletion of your data by
             contacting us.
           </p>
         </section>
       </div>
     </section>
   </main>
 );
}
