const PortfolioSection = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative cursor-pointer"
          >
            {/* Use a link or router navigation here */}
            <Link href={`/portfolio/${project.id}`}>
              <div
                className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200"
                style={{
                  height: '50vh', // Set the height to 50% of the viewport height
                  minHeight: '200px' // Ensure a minimum height if 50vh is too small
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                </div>
              </div>
            </Link>
            <p className="mt-2 text-sm text-gray-500">{project.category}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default PortfolioSection;
  