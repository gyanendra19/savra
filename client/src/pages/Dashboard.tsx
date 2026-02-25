import React, { useEffect, useState } from "react";
import StatCard from "../components/statCard";
import WeeklyChart from "../components/WeeklyTrend";
import TeacherSelector from "../components/TeacherSelector";
import type { TeacherStats, WeeklyTrend } from "../types";

const Dashboard: React.FC = () => {
  const [overview, setOverview] = useState<TeacherStats[]>([]);
  const [weekly, setWeekly] = useState<WeeklyTrend[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");

  useEffect(() => {
    fetchOverview();
    fetchWeekly();
  }, []);

  const fetchOverview = async () => {
    const res = await fetch("http://localhost:5000/dashboard/overview");
    const data = await res.json();
    setOverview(data);
  };

  const fetchWeekly = async () => {
    const res = await fetch("http://localhost:5000/dashboard/weekly");
    const data = await res.json();
    setWeekly(data);
  };

  const totalLessons = overview.reduce((acc, t) => acc + t.lessons, 0);
  const totalQuizzes = overview.reduce((acc, t) => acc + t.quizzes, 0);
  const totalAssessments = overview.reduce((acc, t) => acc + t.assessments, 0);

  const filteredOverview = selectedTeacher
    ? overview.filter((t) => t._id === selectedTeacher)
    : overview;

  return (
    <div className="flex min-h-screen bg-linear-to-br from-slate-800 via-slate-800 to-slate-800">
      {/* Sidebar */}
      <aside className="w-60 bg-linear-to-b from-slate-800 to-slate-800 border-r border-slate-800 flex flex-col shadow-2xl">
        <div className="px-6 py-8 text-xl font-bold tracking-tight bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Savra Admin
        </div>

        <nav className="flex flex-col gap-2 px-4 text-sm font-medium">
          <button className="px-4 py-3 rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-blue-500/50 transition-all duration-200 transform hover:scale-105">
            Dashboard
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-10 py-8">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Teacher Insights
            </h1>
            <p className="text-sm text-slate-400 mt-2">
              Overview of content creation activity
            </p>
          </div>

          <TeacherSelector
            teachers={overview}
            selected={selectedTeacher}
            onChange={setSelectedTeacher}
          />
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-indigo-400 rounded-xl blur-xl opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <StatCard title="Total Lessons" value={totalLessons} />
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 rounded-xl blur-xl opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <StatCard title="Total Quizzes" value={totalQuizzes} />
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-indigo-400 to-blue-400 rounded-xl blur-xl opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <StatCard title="Total Assessments" value={totalAssessments} />
          </div>
        </div>

        {/* Per Teacher Breakdown */}
        {selectedTeacher &&
          filteredOverview.map((teacher) => (
            <div key={teacher._id} className="relative group mb-8">
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative border border-slate-700 rounded-2xl px-8 py-7  backdrop-blur-md">
                <h2 className="text-lg font-bold tracking-tight bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-6">
                  {teacher.teacherName}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition duration-300"></div>
                    <StatCard title="Lessons" value={teacher.lessons} />
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition duration-300"></div>
                    <StatCard title="Quizzes" value={teacher.quizzes} />
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-blue-600 rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition duration-300"></div>
                    <StatCard title="Assessments" value={teacher.assessments} />
                  </div>
                </div>
              </div>
            </div>
          ))}

        {/* Weekly Trend Section */}
        <div className="mb-10 relative group">
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative">
            <WeeklyChart data={weekly} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
