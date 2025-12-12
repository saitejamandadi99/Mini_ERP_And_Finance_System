// src/pages/finance/project-health/ProjectHealth.jsx
import React, { useEffect, useState } from "react";
import { getProjectHealth } from "../../../services/projectService";
import Loader from "../../../components/Loader";

const ProjectHealth = () => {
  const url = new URL(window.location.href);
  const parts = window.location.pathname.split("/");
  const project_id = parts[parts.length - 1];

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProjectHealth(project_id);
        setProject(res.data.project);
      } catch (err) { console.error(err); }
      setLoading(false);
    })();
  }, [project_id]);

  if (loading) return <Loader />;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Project Health — {project.name}</h2>
      <div className="bg-white p-4 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Budget Used</strong>: ₹{project.budgetUsed} / ₹{project.budgetTotal}</p>
            <p><strong>Budget Usage</strong>: {project.budgetUsage}</p>
            <p><strong>Time Usage</strong>: {project.timeUsage}</p>
          </div>
          <div>
            <p><strong>Expected Progress</strong>: {project.expectedProgress}%</p>
            <p><strong>Actual Progress</strong>: {project.actualProgress}%</p>
            <p><strong>Score</strong>: {project.score}</p>
            <p><strong>Status</strong>: {project.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHealth;
