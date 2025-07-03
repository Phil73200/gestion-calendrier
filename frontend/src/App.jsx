import { useEffect, useState } from 'react';

function App() {
  const [candidatures, setCandidatures] = useState([]);
  const [valides, setValides] = useState([]);

  useEffect(() => {
    fetch('/api/candidatures').then(res => res.json()).then(setCandidatures);
    fetch('/api/courses_validees').then(res => res.json()).then(setValides);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Calendrier FFS - Admin</h1>

      <h2 className="font-semibold">Candidatures</h2>
      <table className="mb-6 border w-full text-sm">
        <thead><tr><th>Club</th><th>Date</th><th>Lieu</th><th>Statut</th></tr></thead>
        <tbody>
          {candidatures.map(c => (
            <tr key={c.id} className="border-t"><td>{c.club}</td><td>{c.date_souhaitee}</td><td>{c.lieu_souhaite}</td><td>{c.statut}</td></tr>
          ))}
        </tbody>
      </table>

      <h2 className="font-semibold">Courses validées</h2>
      <table className="border w-full text-sm">
        <thead><tr><th>Date</th><th>Lieu</th><th>Club</th><th>Comité</th><th>Discipline</th><th>Catégorie</th></tr></thead>
        <tbody>
          {valides.map(v => (
            <tr key={v.date + v.lieu} className="border-t">
              <td>{v.date}</td><td>{v.lieu}</td><td>{v.club}</td><td>{v.comite}</td><td>{v.type_course}</td><td>{v.categorie}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;