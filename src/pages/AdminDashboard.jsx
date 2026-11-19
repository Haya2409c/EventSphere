import React from 'react';

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-textMain mb-2">Dashboard Overview</h1>
      <p className="text-textSecondary mb-8">System performance and recent activities.</p>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm border-l-4 border-l-primary hover:shadow-md transition-all">
          <h3 className="text-textSecondary font-medium text-sm">Total Expos</h3>
          <p className="text-4xl font-bold text-textMain mt-2">12</p>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm border-l-4 border-l-secondary hover:shadow-md transition-all">
          <h3 className="text-textSecondary font-medium text-sm">Active Exhibitors</h3>
          <p className="text-4xl font-bold text-textMain mt-2">48</p>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm border-l-4 border-l-accent hover:shadow-md transition-all">
          <h3 className="text-textSecondary font-medium text-sm">Registered Attendees</h3>
          <p className="text-4xl font-bold text-textMain mt-2">1,250</p>
        </div>

      </div>

      {/* Recent Activity Table */}
      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-background/50">
          <h2 className="text-lg font-bold text-textMain">Recent Exhibitor Applications</h2>
        </div>
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-textSecondary text-sm border-b border-border">
                <th className="pb-3 font-medium">Company Name</th>
                <th className="pb-3 font-medium">Expo Applied For</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-textMain text-sm">
              <tr className="border-b border-border/50">
                <td className="py-4 font-semibold">TechNova Solutions</td>
                <td className="py-4">Global IT Summit 2026</td>
                <td className="py-4"><span className="bg-warning/20 text-warning px-3 py-1 rounded-full font-medium text-xs">Pending</span></td>
                <td className="py-4"><button className="text-primary hover:text-secondary font-medium">Review</button></td>
              </tr>
              <tr>
                <td className="py-4 font-semibold">Gourmet Bites</td>
                <td className="py-4">Food & Hospitality Expo</td>
                <td className="py-4"><span className="bg-success/20 text-success px-3 py-1 rounded-full font-medium text-xs">Approved</span></td>
                <td className="py-4"><button className="text-primary hover:text-secondary font-medium">View</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;