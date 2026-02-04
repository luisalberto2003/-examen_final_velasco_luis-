import { useState, useEffect } from 'react';
import { Button } from './components/Buttons.jsx';
import { Input } from './components/Input.jsx';

const API_URL = "http://localhost:3000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ title: '', description: '', status: 'PENDING' });

  // 1. Cargar tareas al iniciar
  useEffect(() => { loadTasks(); }, []);

  const loadTasks = async () => {
    try {
      const res = await fetch(API_URL);
      setTasks(await res.json());
    } catch (err) { setError("Error conectando al servidor"); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message); // Mostrar error de validación del backend
    } else {
      setForm({ title: '', description: '', status: 'PENDING' });
      setEditingId(null);
      loadTasks();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta tarea?")) {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      loadTasks();
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black text-slate-800 mb-8 text-center uppercase tracking-widest">Task Manager</h1>

        {/* Formulario */}
        <section className="bg-white p-6 rounded-xl shadow-md border border-slate-200 mb-10">
          <h2 className="text-xl font-bold mb-4 text-slate-700">{editingId ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
          
          {error && <p className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium border border-red-200">{error}</p>}
          
          <form onSubmit={handleSubmit}>
            <Input label="Título" name="title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} placeholder="Mínimo 3 caracteres" />
            <Input label="Descripción" name="description" type="textarea" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} placeholder="Requerido para marcar como DONE (mín 10 caps)" />
            
            <div className="mb-6">
              <label className="text-sm font-bold text-gray-700 block mb-1">Estado</label>
              <select 
                value={form.status} 
                onChange={(e) => setForm({...form, status: e.target.value})}
                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="PENDING">PENDING</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
            </div>

            <div className="flex gap-3">
              <Button type="submit" variant="success">{editingId ? "Guardar Cambios" : "Crear Tarea"}</Button>
              {editingId && <Button variant="secondary" onClick={() => { setEditingId(null); setForm({title:'', description:'', status:'PENDING'}); }}>Cancelar</Button>}
            </div>
          </form>
        </section>

        {/* Listado */}
        <div className="grid gap-4">
          {tasks.map(task => (
            <article key={task.id} className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-600 flex justify-between items-center transition-hover hover:shadow-md">
              <div className="flex-1">
                <h3 className="font-bold text-slate-800">{task.title}</h3>
                <p className="text-slate-500 text-sm italic">{task.description || "Sin descripción"}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded mt-2 inline-block border ${task.status === 'DONE' ? 'bg-green-100 border-green-200 text-green-700' : 'bg-orange-100 border-orange-200 text-orange-700'}`}>
                  {task.status}
                </span>
              </div>
              <div className="flex gap-2 ml-4">
                <Button variant="primary" onClick={() => { setEditingId(task.id); setForm(task); }}>Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(task.id)}>Eliminar</Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;