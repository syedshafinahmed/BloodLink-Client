// DashboardSkeleton.jsx
const SkeletonBox = ({ className }) => (
  <div className={`animate-pulse rounded-lg bg-base-300/60 dark:bg-base-700/50 ${className}`} />
);

const DashboardSkeleton = () => {
  return (
    <section className="px-4 md:px-10 py-10 space-y-10">
      {/* Badge */}
      <div className="flex justify-center">
        <SkeletonBox className="h-6 w-48 rounded-full" />
      </div>

      {/* Heading */}
      <div className="space-y-4 text-center">
        <SkeletonBox className="h-10 w-96 mx-auto" />
        <SkeletonBox className="h-5 w-72 mx-auto" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        {[...Array(3)].map((_, i) => (
          <SkeletonBox key={i} className="h-32 rounded-2xl" />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
        <SkeletonBox className="h-[360px] rounded-2xl" />
        <SkeletonBox className="h-[360px] rounded-2xl" />
      </div>
    </section>
  );
};

export default DashboardSkeleton;
