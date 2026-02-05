import { Search, Plus, Filter } from 'lucide-react';

export function FilterBar({
    filter,
    setFilter,
    priorityFilter,
    setPriorityFilter,
    search,
    setSearch,
    onAddFile,
}) {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex bg-[#f5f2eb] p-1 rounded-lg">
                    {['all', 'pending', 'completed', 'changed'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${filter === f
                                ? 'bg-white text-stone-900 shadow-sm'
                                : 'text-stone-600 hover:text-stone-900'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div className="relative">
                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="px-3 py-1.5 h-full rounded-lg border border-stone-200 text-sm font-medium text-stone-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer hover:bg-stone-50 transition-colors pr-8 appearance-none"
                    >
                        <option value="all">All Priorities</option>
                        <option value="high">High Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="low">Low Priority</option>
                    </select>
                    <Filter
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                        size={14}
                    />
                </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search filenames..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    />
                </div>
                <button
                    onClick={onAddFile}
                    className="flex items-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-sm"
                >
                    <Plus size={18} />
                </button>
            </div>
        </div>
    );
}
