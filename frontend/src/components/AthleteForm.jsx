import { useState } from "react";
import { searchTutors, createTutor } from "../api/tutorsApi";
import { createAthlete } from "../api/athletesApi";

export default function AthleteForm() {
  const [formData, setFormData] = useState({
    athlete_first_name: "",
    athlete_last_name: "",
    athlete_date_of_birth: "",
    athlete_monthly_payment: "",
    athlete_period: 0,
    athlete_tutor_id: "",
    tutor_first_name: "",
    tutor_last_name: "",
    tutor_date_of_birth: "",
    tutor_phone_number: "",
    tutor_email: ""
  });

  const [isTutorFormDisabled, setIsTutorFormDisabled] = useState(true);
  const [isNewTutor, setIsNewTutor] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [tutorResults, setTutorResults] = useState([]);
  const [selectedTutorName, setSelectedTutorName] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewTutorMode = () => {
    setIsNewTutor(true);
    setIsTutorFormDisabled(false);
    setSearchTerm("");
    setTutorResults([]);
    setFormData({
      ...formData,
      athlete_tutor_id: "",
      tutor_first_name: "",
      tutor_last_name: "",
      tutor_date_of_birth: "",
      tutor_email: "",
      tutor_phone_number: ""
    });
  };

  const handleExistingTutorMode = () => {
    setIsNewTutor(false);
    setIsTutorFormDisabled(true);
    setSearchTerm("");
    setTutorResults([]);
    setFormData({
      ...formData,
      athlete_tutor_id: "",
      tutor_first_name: "",
      tutor_last_name: "",
      tutor_date_of_birth: "",
      tutor_email: "",
      tutor_phone_number: ""
    });
  };

  const handleSearchTutor = async (e) => {
    const text = e.target.value;
    setSearchTerm(text);

    if (text.trim() === "") {
      setTutorResults([]);
      setFormData({ ...formData, athlete_tutor_id: "" });
      return;
    }

    try {
      const data = await searchTutors(text);
      setTutorResults(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSelectTutor = (tutor) => {
    setSelectedTutorName(`${tutor.first_name} ${tutor.last_name}`);

    setFormData({
      ...formData,
      athlete_tutor_id: tutor.id,
      tutor_first_name: tutor.first_name,
      tutor_last_name: tutor.last_name,
      tutor_date_of_birth: tutor.date_of_birth,
      tutor_phone_number: tutor.phone_number,
      tutor_email: tutor.email
    });

    setTutorResults([]);
    setSearchTerm("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let finalTutorId = formData.athlete_tutor_id;

    try {

      if (isNewTutor) {
        const tutorPayload = {
          first_name: formData.tutor_first_name,
          last_name: formData.tutor_last_name,
          date_of_birth: formData.tutor_date_of_birth,
          phone_number: formData.tutor_phone_number,
          email: formData.tutor_email
        };

        
        const newTutorData = await createTutor(tutorPayload);
        finalTutorId = newTutorData.id;
      }

      
      const athletePayload = {
        first_name: formData.athlete_first_name,
        last_name: formData.athlete_last_name,
        date_of_birth: formData.athlete_date_of_birth,
        monthly_payment: parseFloat(formData.athlete_monthly_payment) || 0,
        period: parseInt(formData.athlete_period) || 0,
        tutor_id: finalTutorId
      };

      
      await createAthlete(athletePayload);

      
      alert("¡Atleta y tutor registrados con éxito en el Club Cuervos!");

      setFormData({
        athlete_first_name: "", athlete_last_name: "", athlete_date_of_birth: "",
        athlete_monthly_payment: "", athlete_period: 0, athlete_tutor_id: "",
        tutor_first_name: "", tutor_last_name: "", tutor_date_of_birth: "",
        tutor_phone_number: "", tutor_email: ""
      });

      setIsNewTutor(false);
      setIsTutorFormDisabled(true);
      setSearchTerm("");

    } catch (error) {
      console.error("Error en la operación:", error);
      alert(error.message || "No se pudo conectar con el servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-sm shadow-lg border border-slate-700/50 max-w-2xl w-full">
      <h2 className="text-xl font-medium text-slate-100 mb-6 tracking-wide border-b border-slate-700 pb-3">Registro de Nuevo Atleta</h2>

      <div className="grid grid-cols-2 gap-5 mb-6">
        <div>
          <label className="block text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Nombre(s)</label>
          <input
            type="text"
            name="athlete_first_name"
            value={formData.athlete_first_name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-600 transition-colors"
          />
        </div>
        <div>
          <label className="block text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Apellidos</label>
          <input
            type="text"
            name="athlete_last_name"
            value={formData.athlete_last_name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-600 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-8">
        <div>
          <label className="block text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Nacimiento</label>
          <input
            type="date"
            name="athlete_date_of_birth"
            value={formData.athlete_date_of_birth}
            onChange={handleChange}
            style={{ colorScheme: "dark" }}
            className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Pago Mensual ($)</label>
          <input
            type="number"
            name="athlete_monthly_payment"
            value={formData.athlete_monthly_payment}
            onChange={handleChange}
            placeholder="Ej. 500"
            className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-600 transition-colors"
          />
        </div>

        <div className="col-span-2 flex items-center gap-6 mt-2">
          <label className="block text-slate-400 text-xs uppercase tracking-wider font-semibold">Periodo de Pago</label>

          <label className="flex items-center cursor-pointer text-slate-300 text-sm hover:text-white transition-colors">
            <input
              type="radio"
              name="athlete_period"
              value="1"
              checked={formData.athlete_period === 1} // Compara contra un int
              onChange={(e) => setFormData({ ...formData, athlete_period: parseInt(e.target.value) })} // Convierte a int
              className="mr-2 accent-blue-500 w-4 h-4"
            />
            Días 1 - 5
          </label>

          <label className="flex items-center cursor-pointer text-slate-300 text-sm hover:text-white transition-colors">
            <input
              type="radio"
              name="athlete_period"
              value="2"
              checked={formData.athlete_period === 2} // Compara contra un int
              onChange={(e) => setFormData({ ...formData, athlete_period: parseInt(e.target.value) })} // Convierte a int
              className="mr-2 accent-blue-500 w-4 h-4"
            />
            Días 15 - 20
          </label>
        </div>
      </div>

      <div className="mb-8 p-6 border border-slate-700/50 rounded-sm bg-slate-900/20">
        <h3 className="text-slate-200 text-sm font-medium mb-4 tracking-wide uppercase">Información del Tutor</h3>

        <div className="flex gap-6 mb-5">
          <label className="flex items-center cursor-pointer text-slate-300 text-sm hover:text-white transition-colors">
            <input
              type="radio"
              name="tutor_type"
              checked={!isNewTutor}
              onChange={handleExistingTutorMode}
              className="mr-2 accent-blue-500 w-4 h-4"
            />
            Usar Tutor Existente
          </label>
          <label className="flex items-center cursor-pointer text-slate-300 text-sm hover:text-white transition-colors">
            <input
              type="radio"
              name="tutor_type"
              checked={isNewTutor}
              onChange={handleNewTutorMode}
              className="mr-2 accent-blue-500 w-4 h-4"
            />
            Registrar Nuevo Tutor
          </label>
        </div>

        {!isNewTutor && (
          <div className="relative mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchTutor}
              placeholder="Buscar por nombre o apellido..."
              className="w-full px-4 py-2.5 bg-slate-900/80 border border-blue-500/50 text-slate-200 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-500 transition-colors"
            />

            {tutorResults.length > 0 && (
              <ul className="absolute z-10 w-full bg-slate-800 border border-slate-700 mt-1 rounded-sm shadow-2xl max-h-40 overflow-y-auto">
                {tutorResults.map((tutor) => (
                  <li
                    key={tutor.id}
                    onClick={() => handleSelectTutor(tutor)}
                    className="px-4 py-3 hover:bg-slate-700/80 cursor-pointer border-b border-slate-700/50 last:border-0 text-slate-200 transition-colors"
                  >
                    {tutor.first_name} {tutor.last_name} <span className="text-slate-500 text-xs ml-1">({tutor.email})</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-5 mb-5 mt-2">
          <div>
            <label className="block text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Nombre(s)</label>
            <input
              type="text"
              name="tutor_first_name"
              disabled={isTutorFormDisabled}
              value={formData.tutor_first_name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-40 disabled:bg-slate-900 disabled:cursor-not-allowed transition-colors"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Apellidos</label>
            <input
              type="text"
              name="tutor_last_name"
              value={formData.tutor_last_name}
              disabled={isTutorFormDisabled}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-40 disabled:bg-slate-900 disabled:cursor-not-allowed transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Nacimiento</label>
            <input
              type="date"
              name="tutor_date_of_birth"
              value={formData.tutor_date_of_birth}
              disabled={isTutorFormDisabled}
              onChange={handleChange}
              style={{ colorScheme: "dark" }}
              className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-40 disabled:bg-slate-900 disabled:cursor-not-allowed transition-colors"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Teléfono</label>
            <input
              type="text"
              name="tutor_phone_number"
              value={formData.tutor_phone_number}
              disabled={isTutorFormDisabled}
              onChange={handleChange}
              placeholder="Ej. 961..."
              className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-600 disabled:opacity-40 disabled:bg-slate-900 disabled:cursor-not-allowed transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Correo Electrónico</label>
          <input
            type="email"
            name="tutor_email"
            value={formData.tutor_email}
            disabled={isTutorFormDisabled}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-600 disabled:opacity-40 disabled:bg-slate-900 disabled:cursor-not-allowed transition-colors"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium tracking-wide py-3 px-4 rounded-sm hover:bg-blue-500 transition-colors shadow-lg"
      >
        Procesar Registro
      </button>
    </form>
  );
}