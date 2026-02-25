export interface TeacherStats {
  _id: string;
  teacherName: string;
  lessons: number;
  quizzes: number;
  assessments: number;
  totalActivities: number;
}

export interface WeeklyTrend {
  year: number;
  week: number;
  totalActivities: number;
}
