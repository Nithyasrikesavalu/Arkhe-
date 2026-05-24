export const ProjectCardSkeleton = () => {
  return (
    <div className="glass-card rounded-3xl overflow-hidden flex flex-col h-full border border-slate-100 dark:border-slate-800">
      {/* Thumbnail placeholder */}
      <div className="aspect-[4/3] skeleton"></div>

      {/* Body placeholder */}
      <div className="p-6 flex flex-col flex-grow space-y-4">
        {/* Name and Location */}
        <div>
          <div className="h-6 w-3/4 skeleton rounded-md"></div>
          <div className="h-4 w-1/2 skeleton rounded-md mt-2"></div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 w-full skeleton rounded-md"></div>
          <div className="h-4 w-5/6 skeleton rounded-md"></div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-100 dark:border-slate-800/60 text-xs">
          <div className="h-5 w-full skeleton rounded-md"></div>
          <div className="h-5 w-full skeleton rounded-md"></div>
          <div className="h-5 w-full skeleton rounded-md"></div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1 w-1/3">
            <div className="h-3 w-full skeleton rounded-md"></div>
            <div className="h-5 w-full skeleton rounded-md"></div>
          </div>
          <div className="w-11 h-11 rounded-full skeleton"></div>
        </div>
      </div>
    </div>
  );
};

export const ProjectDetailsSkeleton = () => {
  return (
    <div className="space-y-12">
      {/* Large Banner */}
      <div className="h-[480px] w-full skeleton rounded-3xl"></div>

      {/* Main Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto px-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-10 w-2/3 skeleton rounded-lg"></div>
          <div className="h-5 w-1/3 skeleton rounded-lg"></div>
          <div className="space-y-3 pt-6">
            <div className="h-4 w-full skeleton rounded-md"></div>
            <div className="h-4 w-full skeleton rounded-md"></div>
            <div className="h-4 w-4/5 skeleton rounded-md"></div>
          </div>
        </div>
        
        {/* Side card */}
        <div className="h-96 rounded-3xl skeleton"></div>
      </div>
    </div>
  );
};
export default ProjectCardSkeleton;
