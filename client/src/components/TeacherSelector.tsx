import React from "react";
import type { TeacherStats } from "../types";

interface Props {
  teachers: TeacherStats[];
  selected: string;
  onChange: (id: string) => void;
}

const TeacherSelector: React.FC<Props> = ({ teachers, selected, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 tracking-widest uppercase">
        Filter by Teacher
      </label>

      <div className="relative w-64">
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full
            appearance-none
            bg-linear-to-br from-slate-50 to-slate-100
            border border-slate-200
            rounded-lg
            px-4 py-3
            text-sm
            font-medium
            text-slate-900
            focus:outline-none
            focus:ring-2
            focus:ring-blue-400
            focus:border-blue-300
            transition-all duration-200
            hover:border-slate-300
            cursor-pointer
          "
        >
          <option value="">All Teachers</option>
          {teachers.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.teacherName}
            </option>
          ))}
        </select>

        {/* Chevron */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center bg-linear-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TeacherSelector;
