import React, { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useListingsQuery, useDeleteListingMutation } from "../api/queries";
import { useToast } from "../context/ToastContext";
import { ShieldAlert, Trash2 } from "lucide-react";

const AdminPanel = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const params = useMemo(() => ({}), []);
  const { data: movies = [], isLoading } = useListingsQuery("movies", params);
  const deleteMovieMutation = useDeleteListingMutation("movies");

  const handleDeleteMovie = (movieId) => {
    deleteMovieMutation.mutate(movieId, {
      onSuccess: () => {
        showToast("Movie deleted successfully.", "success");
      },
      onError: (error) => {
        showToast(error.response?.data || "Failed to delete movie.", "error");
      },
    });
  };

  if (user?.role !== "ADMIN") {
    return (
      <div className="glass p-8 rounded-3xl text-slate-100">
        <div className="flex flex-col items-center gap-4 text-center">
          <ShieldAlert className="w-14 h-14 text-yellow-400" />
          <h2 className="text-2xl font-bold">Admin Access Required</h2>
          <p className="text-sm text-slate-400 max-w-xl">
            Only administrators may manage the movie catalog from this page.
            Regular users can still add, like, and comment on listings in the
            community discovery modules.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass p-6 rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-100">Admin Movie Manager</h1>
            <p className="text-sm text-slate-400 mt-2">
              Delete movie recommendations safely. This section is only visible to
              admin users.
            </p>
          </div>
          <div className="rounded-full border border-slate-800 bg-slate-950/80 px-4 py-2 text-sm text-slate-300">
            Signed in as <span className="font-semibold text-slate-100">{user?.role}</span>
          </div>
        </div>
      </div>

      <div className="glass p-6 rounded-3xl">
        {isLoading ? (
          <div className="text-slate-300">Loading movies...</div>
        ) : movies.length === 0 ? (
          <div className="text-slate-400">No movies found in the catalog.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-[0.15em]">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Director</th>
                  <th className="px-4 py-3">Hero / Heroine</th>
                  <th className="px-4 py-3">Platform</th>
                  <th className="px-4 py-3">Uploaded By</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie.id} className="border-b border-slate-800 hover:bg-slate-950/50 transition">
                    <td className="px-4 py-3 font-semibold text-slate-100">{movie.name}</td>
                    <td className="px-4 py-3">{movie.director || "Unknown"}</td>
                    <td className="px-4 py-3">{movie.hero || "N/A"} / {movie.heroine || "N/A"}</td>
                    <td className="px-4 py-3">{movie.ottPlatform || "Unknown"}</td>
                    <td className="px-4 py-3">{movie.uploadedBy?.firstName || "Unknown"}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDeleteMovie(movie.id)}
                        className="inline-flex items-center gap-2 rounded-full bg-red-500/15 px-3 py-2 text-xs font-semibold text-red-300 hover:bg-red-500/25 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
