import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";
import { Link, useNavigate ,useParams} from "react-router-dom";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const { portfolioId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/login");
      return;
    }

    const q = query(
      collection(db, "users", user.uid, "projects"),
      orderBy("updatedAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = [];
      snap.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
      setProjects(list);
    });

    return unsub;
  }, [navigate]);

  

  return (
    <div className="min-h-screen bg-slate-50 flex">
     
      <aside className="hidden md:block w-64 bg-white border-r border-slate-200" />

      {/* Main content */}
      <main className="flex-1 px-4 md:px-10 py-6">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
              Your projects
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Open a portfolio to continue editing or create a new one.
            </p>
          </div>
          
        </header>

        {/* Content card */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-4 md:p-6">
          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 text-xs">
            <span className="text-slate-500">
              {projects.length} project{projects.length === 1 ? "" : "s"} total
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Draft . Autosaved
            </span>
          </div>

          {/* Projects list */}
          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500 via-fuchsia-500 to-indigo-500 opacity-80 mb-3" />
              <p className="text-sm font-semibold text-slate-700">
                No projects yet
              </p>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Create your first professor portfolio and it will appear here.
              </p>
              
              
            </div>
          ) : (
            <ul className="space-y-2">
              {projects.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/canvas/${p.id}`}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 border border-slate-200 hover:bg-slate-100 transition"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {p.title || "Untitled professor portfolio"}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {p.description || "Single-page academic portfolio"}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-500">
                        {p.status || "draft"}
                      </span>
                      {p.updatedAt && (
                        <span className="text-[10px] text-slate-400">
                          Updated{" "}
                          {p.updatedAt.toDate
                            ? p.updatedAt.toDate().toLocaleDateString()
                            : ""}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
