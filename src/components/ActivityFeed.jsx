export default function ActivityFeed({ activities = [] }) {
  if (!activities.length) {
    return (
      <div className="bg-[#2D2825]/60 p-6 rounded-[20px] text-white/60">No recent activity</div>
    );
  }

  return (
    <div className="space-y-2">
      {activities.map((a, i) => (
        <div key={i} className="bg-[#2D2825]/60 p-3 rounded-lg text-white/80">
          <div className="text-sm font-bold">{a.title}</div>
          <div className="text-xs text-white/50">{a.time}</div>
        </div>
      ))}
    </div>
  );
}
