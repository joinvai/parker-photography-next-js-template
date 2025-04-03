export default function PressPage() {
  const pressItems = [
    {
      date: '2024',
      publication: 'The Design Gazette',
      title: 'Breaking New Ground in Digital Spaces',
      url: '#'
    },
    {
      date: '2023',
      publication: 'Creative Review',
      title: 'The Future of Interactive Experiences',
      url: '#'  
    },
    {
      date: '2023',
      publication: 'Web Artistry',
      title: 'Pushing Boundaries of Digital Design',
      url: '#'
    }
  ];

  return (
    <main className="min-h-screen p-8 md:p-24 font-geist-mono">
      <h1 className="text-4xl mb-12 font-light tracking-tighter">Press</h1>
      
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="py-4 text-left font-normal text-sm text-neutral-500">Year</th>
              <th className="py-4 text-left font-normal text-sm text-neutral-500">Publication</th>
              <th className="py-4 text-left font-normal text-sm text-neutral-500">Title</th>
            </tr>
          </thead>
          <tbody>
            {pressItems.map((item, i) => (
              <tr 
                key={i}
                className="group border-b border-neutral-200 hover:bg-neutral-50 transition-colors"
              >
                <td className="py-6 pr-8">{item.date}</td>
                <td className="py-6 pr-8 text-neutral-600">{item.publication}</td>
                <td className="py-6">
                  <a 
                    href={item.url}
                    className="group-hover:underline decoration-dotted"
                  >
                    {item.title}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
